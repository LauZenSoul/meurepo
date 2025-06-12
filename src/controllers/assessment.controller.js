// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/assessment.controller.js

const assessmentService = require("../../services/assessment.service");

class AssessmentController {
  async createAssessmentForModule(req, res, next) {
    try {
      const moduleId = parseInt(req.params.moduleId);
      const assessmentData = req.body;
      // const adminUserId = req.user.id; // Para verificar permissão

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem criar avaliações." });
      }
      if (!moduleId || isNaN(moduleId)) {
        return res.status(400).json({ message: "ID do módulo inválido." });
      }
      if (!assessmentData.titulo || !assessmentData.tipo_avaliacao || !assessmentData.data_disponibilizacao) {
        return res.status(400).json({ message: "Título, tipo de avaliação e data de disponibilização são obrigatórios." });
      }

      const newAssessment = await assessmentService.createAssessment(moduleId, assessmentData, req.user.id);
      res.status(201).json({ message: "Avaliação criada com sucesso!", assessment: newAssessment });
    } catch (error) {
      if (error.message.includes("Módulo não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Já existe uma avaliação com o título")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      next(error);
    }
  }

  async getAssessmentsByModule(req, res, next) {
    try {
      const moduleId = parseInt(req.params.moduleId);
      if (!moduleId || isNaN(moduleId)) {
        return res.status(400).json({ message: "ID do módulo inválido." });
      }
      const assessments = await assessmentService.getAssessmentsByModule(moduleId);
      res.status(200).json(assessments);
    } catch (error) {
      next(error);
    }
  }

  async getAssessmentById(req, res, next) {
    try {
      const assessmentId = parseInt(req.params.assessmentId);
      if (!assessmentId || isNaN(assessmentId)) {
        return res.status(400).json({ message: "ID da avaliação inválido." });
      }
      const assessment = await assessmentService.getAssessmentById(assessmentId);
      if (!assessment) {
        return res.status(404).json({ message: "Avaliação não encontrada." });
      }
      res.status(200).json(assessment);
    } catch (error) {
      next(error);
    }
  }

  async updateAssessment(req, res, next) {
    try {
      const assessmentId = parseInt(req.params.assessmentId);
      const assessmentData = req.body;
      // const adminUserId = req.user.id;

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem atualizar avaliações." });
      }
      if (!assessmentId || isNaN(assessmentId)) {
        return res.status(400).json({ message: "ID da avaliação inválido." });
      }

      const updatedAssessment = await assessmentService.updateAssessment(assessmentId, assessmentData, req.user.id);
      res.status(200).json({ message: "Avaliação atualizada com sucesso!", assessment: updatedAssessment });
    } catch (error) {
      if (error.message.includes("Avaliação não encontrada")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Já existe outra avaliação com este título")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      next(error);
    }
  }

  async deleteAssessment(req, res, next) {
    try {
      const assessmentId = parseInt(req.params.assessmentId);
      // const adminUserId = req.user.id;

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem remover avaliações." });
      }
      if (!assessmentId || isNaN(assessmentId)) {
        return res.status(400).json({ message: "ID da avaliação inválido." });
      }

      const result = await assessmentService.deleteAssessment(assessmentId, req.user.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes("Avaliação não encontrada")) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  // TODO: Adicionar controladores para submissão de avaliações e notas
}

module.exports = new AssessmentController();

