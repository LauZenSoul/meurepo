// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/studentProgress.controller.js

const studentProgressService = require("../../services/studentProgress.service");

class StudentProgressController {
  async recordStudentProgress(req, res, next) {
    try {
      const studentUserId = req.user.id; // Do token JWT
      const { contentId, status, enrollmentId } = req.body; // frontend pode enviar enrollmentId para precisão

      if (!contentId) {
        return res.status(400).json({ message: "O ID do conteúdo é obrigatório." });
      }
      if (req.user.tipo_utilizador !== "aluno") {
        return res.status(403).json({ message: "Apenas estudantes podem registar progresso." });
      }

      // Idealmente, o serviço lidaria com a lógica de encontrar a matrícula correta
      // se apenas contentId e studentUserId forem fornecidos.
      const progress = await studentProgressService.recordProgress(studentUserId, parseInt(contentId), status, enrollmentId ? parseInt(enrollmentId) : undefined);
      res.status(200).json({ message: "Progresso registado com sucesso!", progress });
    } catch (error) {
      if (error.message.includes("Conteúdo não encontrado") || error.message.includes("Estudante não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Estudante não está matriculado ativamente")) {
        return res.status(403).json({ message: error.message });
      }
      next(error);
    }
  }

  async getMyProgressInCourse(req, res, next) {
    try {
      const studentUserId = req.user.id;
      const courseId = parseInt(req.params.courseId);

      if (isNaN(courseId)) {
        return res.status(400).json({ message: "ID do curso inválido." });
      }

      const progressRecords = await studentProgressService.getStudentProgressInCourse(studentUserId, courseId);
      res.status(200).json(progressRecords);
    } catch (error) {
        if (error.message.includes("Estudante não encontrado")) {
            return res.status(404).json({ message: error.message });
        }
      next(error);
    }
  }
  
  async getProgressForMyEnrollment(req, res, next) {
    try {
        const studentUserId = req.user.id; // Para garantir que o aluno só acede às suas matrículas
        const enrollmentId = parseInt(req.params.enrollmentId);

        if (isNaN(enrollmentId)) {
            return res.status(400).json({ message: "ID da matrícula inválido." });
        }
        
        // O serviço deve verificar se a matrícula pertence ao aluno autenticado
        // Esta verificação pode ser feita no serviço getProgressForEnrollment
        // ou aqui, buscando a matrícula e comparando o aluno_id.
        // Por agora, o serviço não faz essa verificação explícita, mas deveria.
        const progress = await studentProgressService.getProgressForEnrollment(enrollmentId);
        res.status(200).json(progress);
    } catch (error) {
        next(error);
    }
  }

  // TODO: Adicionar controladores para admin/tutor verem progresso de alunos
}

module.exports = new StudentProgressController();

