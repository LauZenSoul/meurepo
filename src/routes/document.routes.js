// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/document.routes.js

const express = require("express");
const documentController = require("../controllers/document.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas de documentos
router.use(authMiddleware.authenticateToken);

// Rota para um estudante carregar um documento
// O middleware uploadMiddleware() do controlador tratará o upload do ficheiro (multer)
router.post("/upload", 
    authMiddleware.authorizeRole(["aluno"]), 
    documentController.uploadMiddleware(), // Middleware para processar o upload do ficheiro
    documentController.uploadStudentDocument
);

// Rota para um estudante listar os seus documentos
router.get("/my-documents",
    authMiddleware.authorizeRole(["aluno"]), 
    documentController.getMyDocuments
);

// Rota para um estudante fazer download de um dos seus documentos
router.get("/my-documents/:documentId/download",
    authMiddleware.authorizeRole(["aluno"]), 
    documentController.downloadMyDocument
);

// Rota para um admin/tutor validar um documento de um estudante
// :documentId refere-se ao ID do documento, não do estudante
router.put("/validate/:documentId",
    authMiddleware.authorizeRole(["admin", "tutor"]), 
    documentController.validateStudentDocument
);

// TODO: Adicionar rotas para admin/tutor listar documentos pendentes de validação, ou todos os documentos de um estudante específico.

module.exports = router;

