// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/courseModule.controller.js

const courseModuleService = require("../../services/courseModule.service");

class CourseModuleController {
  async addModuleToCourse(req, res, next) {
    try {
      const courseId = parseInt(req.params.courseId);
      const moduleData = req.body;
      // const adminUserId = req.user.id; // Para verificar permissão

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem adicionar módulos a cursos." });
      }
      if (!courseId || isNaN(courseId)) {
        return res.status(400).json({ message: "ID do curso inválido." });
      }
      if (!moduleData.nome_modulo || typeof moduleData.ordem !== "number") {
        return res.status(400).json({ message: "Nome do módulo e ordem são obrigatórios." });
      }

      const newModule = await courseModuleService.addModuleToCourse(courseId, moduleData, req.user.id);
      res.status(201).json({ message: "Módulo adicionado ao curso com sucesso!", module: newModule });
    } catch (error) {
      if (error.message.includes("Curso não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Já existe um módulo com")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      next(error);
    }
  }

  async getModulesByCourse(req, res, next) {
    try {
      const courseId = parseInt(req.params.courseId);
      if (!courseId || isNaN(courseId)) {
        return res.status(400).json({ message: "ID do curso inválido." });
      }
      const modules = await courseModuleService.getModulesByCourse(courseId);
      res.status(200).json(modules);
    } catch (error) {
      next(error);
    }
  }

  async getModuleById(req, res, next) {
    try {
      const moduleId = parseInt(req.params.moduleId);
      if (!moduleId || isNaN(moduleId)) {
        return res.status(400).json({ message: "ID do módulo inválido." });
      }
      const module = await courseModuleService.getModuleById(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Módulo não encontrado." });
      }
      res.status(200).json(module);
    } catch (error) {
      next(error);
    }
  }

  async updateModuleInCourse(req, res, next) {
    try {
      const moduleId = parseInt(req.params.moduleId);
      // const courseId = parseInt(req.params.courseId); // Opcional, o módulo já tem curso_id
      const moduleData = req.body;
      // const adminUserId = req.user.id;

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem atualizar módulos." });
      }
      if (!moduleId || isNaN(moduleId)) {
        return res.status(400).json({ message: "ID do módulo inválido." });
      }

      const updatedModule = await courseModuleService.updateModuleInCourse(moduleId, moduleData, req.user.id);
      res.status(200).json({ message: "Módulo atualizado com sucesso!", module: updatedModule });
    } catch (error) {
      if (error.message.includes("Módulo não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Já existe outro módulo com este nome ou ordem")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      next(error);
    }
  }

  async removeModuleFromCourse(req, res, next) {
    try {
      const moduleId = parseInt(req.params.moduleId);
      // const courseId = parseInt(req.params.courseId);
      // const adminUserId = req.user.id;

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem remover módulos." });
      }
      if (!moduleId || isNaN(moduleId)) {
        return res.status(400).json({ message: "ID do módulo inválido." });
      }

      const result = await courseModuleService.removeModuleFromCourse(moduleId, req.user.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes("Módulo não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  // TODO: Adicionar controladores para Conteúdo do Módulo (ModuleContent)
}

module.exports = new CourseModuleController();

