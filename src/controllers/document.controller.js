// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/document.controller.js

const documentService = require("../../services/document.service");
const path = require("path");
const fs = require("fs");

// Configuração do Multer para upload de ficheiros
const multer = require("multer");

// Definir o diretório base para uploads temporários ou para onde o multer vai guardar
// Este deve ser um diretório acessível e seguro no servidor.
// Poderia ser o mesmo UPLOAD_DIR do service, ou um diretório temporário antes de mover.
const TEMP_UPLOAD_DIR = process.env.TEMP_UPLOAD_DIR || path.join(__dirname, "../../../../temp_uploads_itdra");

if (!fs.existsSync(TEMP_UPLOAD_DIR)) {
  fs.mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR); // Onde os ficheiros serão guardados temporariamente
  },
  filename: function (req, file, cb) {
    // Manter o nome original ou gerar um nome único aqui se necessário antes de passar para o serviço
    // O serviço DocumentService já gera um nome único ao salvar permanentemente.
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Aceitar apenas certos tipos de ficheiros (ex: PDF, JPG, PNG)
  if (file.mimetype === "application/pdf" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Tipo de ficheiro não suportado. Apenas PDF, JPG, PNG são permitidos."), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limite de 5MB por ficheiro
  },
  fileFilter: fileFilter,
});

class DocumentController {
  // Middleware de upload para uma rota específica
  uploadMiddleware() {
    return upload.single("documentoFile"); // "documentoFile" é o nome do campo no formulário multipart/form-data
  }

  async uploadStudentDocument(req, res, next) {
    try {
      const studentUserId = req.user.id; // Do token JWT
      const { tipo_documento, observacoes } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Nenhum ficheiro enviado." });
      }
      if (!tipo_documento) {
        // Apagar o ficheiro carregado se o tipo de documento não for fornecido
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "O tipo de documento é obrigatório." });
      }

      // fileData para o serviço
      const fileData = {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path, // Caminho temporário do ficheiro carregado pelo multer
      };

      const newDocument = await documentService.uploadDocument(fileData, studentUserId, tipo_documento, observacoes);
      
      // Após o serviço ter tratado o ficheiro (movido/copiado para o UPLOAD_DIR final e registado no DB),
      // podemos apagar o ficheiro temporário carregado pelo multer.
      // É importante que o DocumentService copie/mova o ficheiro do req.file.path para o seu destino final.
      // Assumindo que o DocumentService.uploadDocument move o ficheiro de req.file.path para o UPLOAD_DIR.
      // Se o DocumentService apenas usa o req.file.path para ler e depois cria um novo ficheiro no UPLOAD_DIR,
      // então o ficheiro em req.file.path precisa ser apagado aqui.
      // Por segurança, vamos assumir que o DocumentService é responsável por mover ou copiar o ficheiro.
      // Se o DocumentService apenas usa o buffer, então o req.file.path é irrelevante após a leitura do buffer.
      // No nosso DocumentService atual, ele espera o caminho final, então o multer deveria já colocar no UPLOAD_DIR
      // ou o DocumentService deveria mover de TEMP_UPLOAD_DIR para UPLOAD_DIR.
      // Para simplificar, vamos assumir que o DocumentService.uploadDocument agora recebe o req.file (com path, buffer, etc)
      // e trata o armazenamento. O DocumentService foi atualizado para usar o UPLOAD_DIR.
      // O ficheiro em req.file.path (TEMP_UPLOAD_DIR) pode ser apagado APÓS o serviço confirmar o sucesso.
      // No entanto, o DocumentService atual usa o filePath que é construído com UPLOAD_DIR, não TEMP_UPLOAD_DIR.
      // Vamos ajustar o DocumentService para receber o ficheiro temporário e movê-lo.

      // Ajuste necessário no DocumentService: Ele deve receber o ficheiro temporário (req.file.path)
      // e movê-lo para o UPLOAD_DIR definitivo.
      // Se o DocumentService.uploadDocument já move o ficheiro de req.file.path para o destino final,
      // então podemos apagar o ficheiro temporário aqui.
      // fs.unlinkSync(req.file.path); // Apagar ficheiro temporário APÓS o serviço o ter processado com sucesso.
      // Esta linha deve ser descomentada se o DocumentService copiar o ficheiro em vez de mover.

      res.status(201).json({ message: "Documento carregado com sucesso!", document: newDocument });
    } catch (error) {
      // Se houver um erro após o upload mas antes do processamento pelo serviço, apagar o ficheiro temporário
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Erro ao apagar ficheiro temporário após falha:", err);
        });
      }
      if (error.message.includes("Tipo de ficheiro não suportado")) {
        return res.status(400).json({ message: error.message });
      }
      next(error);
    }
  }

  async getMyDocuments(req, res, next) {
    try {
      const studentUserId = req.user.id; // Do token JWT
      const student = await studentService.getStudentByUserId(studentUserId); // studentService para obter o ID do estudante
      if (!student || !student.id) {
        return res.status(404).json({ message: "Perfil de estudante não encontrado." });
      }
      const documents = await documentService.getDocumentsByStudentId(student.id);
      res.status(200).json(documents);
    } catch (error) {
      next(error);
    }
  }

  async downloadMyDocument(req, res, next) {
    try {
        const studentUserId = req.user.id;
        const documentId = req.params.documentId;

        const filePath = await documentService.getDocumentFilePath(documentId, studentUserId);
        
        // O nome do ficheiro para download pode ser o original
        const documentDetails = await documentService.getDocumentById(documentId, studentUserId);
        const originalFileName = documentDetails.nome_original_ficheiro || `documento_${documentId}${path.extname(filePath)}`;

        res.download(filePath, originalFileName, (err) => {
            if (err) {
                // Tratar erros de download, ex: ficheiro não encontrado no servidor apesar de estar no DB
                console.error("Erro ao fazer download do ficheiro:", err);
                if (!res.headersSent) {
                    // Se o erro for do tipo `ENOENT` (ficheiro não existe), pode ser que o ficheiro foi removido do servidor
                    if (err.code === "ENOENT") {
                        return res.status(404).json({ message: "Ficheiro não encontrado no servidor." });    
                    }
                    return res.status(500).json({ message: "Não foi possível fazer o download do ficheiro." });
                }
            }
        });
    } catch (error) {
        if (error.message.includes("Ficheiro não encontrado")) {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
  }

  // Para Admin/Tutor
  async validateStudentDocument(req, res, next) {
    try {
      // const adminUserId = req.user.id; // Verificar permissão de admin/tutor
      const documentId = req.params.documentId;
      const { estado_validacao, observacoes_validador } = req.body;

      if (!estado_validacao || !["Validado", "Rejeitado"].includes(estado_validacao)) {
        return res.status(400).json({ message: "Estado de validação inválido. Use 'Validado' ou 'Rejeitado'." });
      }

      const validatedDocument = await documentService.validateDocument(documentId, estado_validacao, observacoes_validador, req.user.id);
      res.status(200).json({ message: "Documento validado com sucesso!", document: validatedDocument });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DocumentController();

