// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/grade.controller.js

const gradeService = require("../../services/grade.service");

class GradeController {
  async submitStudentGrade(req, res, next) {
    try {
      const tutorUserId = req.user.id; // ID do tutor autenticado
      const { studentUserId, assessmentId, nota, observacoes } = req.body;

      if (req.user.tipo_utilizador !== "tutor" && req.user.tipo_utilizador !== "admin") {
        return res.status(403).json({ message: "Apenas tutores ou administradores podem lançar notas." });
      }
      if (!studentUserId || !assessmentId || typeof nota === "undefined") {
        return res.status(400).json({ message: "ID do estudante, ID da avaliação e nota são obrigatórios." });
      }
      if (typeof nota !== "number" || nota < 0 || nota > 20) { // Exemplo de escala 0-20
        return res.status(400).json({ message: "Nota inválida. Deve ser um número entre 0 e 20." });
      }

      const gradeData = { nota, observacoes };
      const newGrade = await gradeService.submitGrade(parseInt(assessmentId), parseInt(studentUserId), gradeData, tutorUserId);
      res.status(201).json({ message: "Nota lançada/atualizada com sucesso!", grade: newGrade });
    } catch (error) {
      if (error.message.includes("Estudante não encontrado") || error.message.includes("Avaliação não encontrada") || error.message.includes("Módulo da avaliação não encontrado") || error.message.includes("Matrícula ativa do estudante não encontrada")) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  async getMyGrades(req, res, next) {
    try {
      const studentUserId = req.user.id;
      const courseId = req.query.courseId ? parseInt(req.query.courseId) : null;

      if (req.user.tipo_utilizador !== "aluno") {
        // Tutores/Admins podem precisar de outra rota para ver notas de um aluno específico
        return res.status(403).json({ message: "Esta rota é para estudantes visualizarem as suas próprias notas." });
      }

      const grades = await gradeService.getGradesForStudent(studentUserId, courseId);
      res.status(200).json(grades);
    } catch (error) {
      if (error.message.includes("Estudante não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  async getGradesForAssessmentByTutor(req, res, next) {
    try {
      const assessmentId = parseInt(req.params.assessmentId);
      if (req.user.tipo_utilizador !== "tutor" && req.user.tipo_utilizador !== "admin") {
        return res.status(403).json({ message: "Apenas tutores ou administradores podem ver todas as notas de uma avaliação." });
      }
      if (isNaN(assessmentId)) {
        return res.status(400).json({ message: "ID da avaliação inválido." });
      }

      const grades = await gradeService.getGradesForAssessment(assessmentId);
      res.status(200).json(grades);
    } catch (error) {
      next(error);
    }
  }
  
  // Rota para admin/tutor verem as notas de um aluno específico (diferente de getMyGrades)
  async getStudentGradesByAdmin(req, res, next) {
    try {
        const studentUserId = parseInt(req.params.studentUserId);
        const courseId = req.query.courseId ? parseInt(req.query.courseId) : null;

        if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
            return res.status(403).json({ message: "Acesso negado." });
        }
        if (isNaN(studentUserId)) {
            return res.status(400).json({ message: "ID do estudante inválido." });
        }

        const grades = await gradeService.getGradesForStudent(studentUserId, courseId);
        res.status(200).json(grades);
    } catch (error) {
        if (error.message.includes("Estudante não encontrado")) {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
  }
}

module.exports = new GradeController();

