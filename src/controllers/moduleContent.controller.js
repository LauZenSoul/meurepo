// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/moduleContent.controller.js

const moduleContentService = require("../../services/moduleContent.service");

class ModuleContentController {
  async addContentToModule(req, res, next) {
    try {
      const moduleId = parseInt(req.params.moduleId);
      const contentData = req.body;
      // const adminUserId = req.user.id; // Para verificar permissão

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem adicionar conteúdo a módulos." });
      }
      if (!moduleId || isNaN(moduleId)) {
        return res.status(400).json({ message: "ID do módulo inválido." });
      }
      if (!contentData.titulo || typeof contentData.ordem !== "number" || !contentData.tipo_conteudo || !contentData.conteudo_url_ou_texto) {
        return res.status(400).json({ message: "Título, ordem, tipo de conteúdo e o conteúdo (URL/texto) são obrigatórios." });
      }

      const newContent = await moduleContentService.addContentToModule(moduleId, contentData, req.user.id);
      res.status(201).json({ message: "Conteúdo adicionado ao módulo com sucesso!", content: newContent });
    } catch (error) {
      if (error.message.includes("Módulo não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Já existe um conteúdo com")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      next(error);
    }
  }

  async getContentsByModule(req, res, next) {
    try {
      const moduleId = parseInt(req.params.moduleId);
      if (!moduleId || isNaN(moduleId)) {
        return res.status(400).json({ message: "ID do módulo inválido." });
      }
      const contents = await moduleContentService.getContentsByModule(moduleId);
      res.status(200).json(contents);
    } catch (error) {
      next(error);
    }
  }

  async getContentById(req, res, next) {
    try {
      const contentId = parseInt(req.params.contentId);
      if (!contentId || isNaN(contentId)) {
        return res.status(400).json({ message: "ID do conteúdo inválido." });
      }
      const content = await moduleContentService.getContentById(contentId);
      if (!content) {
        return res.status(404).json({ message: "Conteúdo não encontrado." });
      }
      res.status(200).json(content);
    } catch (error) {
      next(error);
    }
  }

  async updateContentInModule(req, res, next) {
    try {
      const contentId = parseInt(req.params.contentId);
      const contentData = req.body;
      // const adminUserId = req.user.id;

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem atualizar conteúdo de módulos." });
      }
      if (!contentId || isNaN(contentId)) {
        return res.status(400).json({ message: "ID do conteúdo inválido." });
      }

      const updatedContent = await moduleContentService.updateContentInModule(contentId, contentData, req.user.id);
      res.status(200).json({ message: "Conteúdo atualizado com sucesso!", content: updatedContent });
    } catch (error) {
      if (error.message.includes("Conteúdo não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Já existe outro conteúdo com este título ou ordem")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      next(error);
    }
  }

  async removeContentFromModule(req, res, next) {
    try {
      const contentId = parseInt(req.params.contentId);
      // const adminUserId = req.user.id;

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem remover conteúdo de módulos." });
      }
      if (!contentId || isNaN(contentId)) {
        return res.status(400).json({ message: "ID do conteúdo inválido." });
      }

      const result = await moduleContentService.removeContentFromModule(contentId, req.user.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes("Conteúdo não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new ModuleContentController();

