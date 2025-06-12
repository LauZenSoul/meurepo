// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/enrollment.controller.js

const enrollmentService = require("../../services/enrollment.service");

class EnrollmentController {
  async enrollStudentInCourse(req, res, next) {
    try {
      const studentUserId = req.user.id; // Do token JWT
      const { courseId } = req.body; // ID do curso a matricular

      if (!courseId) {
        return res.status(400).json({ message: "O ID do curso é obrigatório." });
      }

      // Verificar se o utilizador é um aluno
      if (req.user.tipo_utilizador !== "aluno") {
        return res.status(403).json({ message: "Apenas estudantes podem matricular-se em cursos." });
      }

      const newEnrollment = await enrollmentService.enrollStudentInCourse(studentUserId, parseInt(courseId));
      res.status(201).json({ message: "Matrícula no curso realizada com sucesso! Aguarda aprovação.", enrollment: newEnrollment });
    } catch (error) {
      if (error.message.includes("Perfil de estudante não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Curso não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Estudante já está matriculado")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      next(error);
    }
  }

  async getMyEnrollments(req, res, next) {
    try {
      const studentUserId = req.user.id;
      const enrollments = await enrollmentService.getStudentEnrollments(studentUserId);
      res.status(200).json(enrollments);
    } catch (error) {
      next(error);
    }
  }

  async getMyEnrollmentDetails(req, res, next) {
    try {
        const studentUserId = req.user.id;
        const enrollmentId = req.params.enrollmentId;
        const enrollmentDetails = await enrollmentService.getEnrollmentDetails(parseInt(enrollmentId), studentUserId);
        if (!enrollmentDetails) {
            return res.status(404).json({ message: "Matrícula não encontrada." });
        }
        res.status(200).json(enrollmentDetails);
    } catch (error) {
        next(error);
    }
  }

  // Para Admin/Tutor
  async updateStudentEnrollmentStatus(req, res, next) {
    try {
      // const adminUserId = req.user.id; // Verificar permissões de admin/tutor
      const enrollmentId = req.params.enrollmentId;
      const { newStatus } = req.body;

      if (!newStatus) {
        return res.status(400).json({ message: "O novo estado da matrícula é obrigatório." });
      }
      
      // Simplificação da verificação de permissão
      if (!["admin", "tutor"].includes(req.user.tipo_utilizador)) {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem atualizar o estado de matrículas." });
      }

      const updatedEnrollment = await enrollmentService.updateEnrollmentStatus(parseInt(enrollmentId), newStatus, req.user.id);
      res.status(200).json({ message: "Estado da matrícula atualizado com sucesso!", enrollment: updatedEnrollment });
    } catch (error) {
      if (error.message.includes("Matrícula não encontrada")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Estado de matrícula inválido")) {
        return res.status(400).json({ message: error.message });
      }
      next(error);
    }
  }
  
  async getAllSystemEnrollments(req, res, next) {
    try {
        if (!["admin", "tutor"].includes(req.user.tipo_utilizador)) {
            return res.status(403).json({ message: "Acesso negado." });
        }
        // TODO: Passar queryParams para filtros e paginação
        const enrollments = await enrollmentService.getAllSystemEnrollments(req.query);
        res.status(200).json(enrollments);
    } catch (error) {
        next(error);
    }
  }
}

module.exports = new EnrollmentController();

