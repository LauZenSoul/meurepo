// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/services/courseModule.service.js

const { Course, CourseModule, ModuleContent, sequelize } = require("../models");
const { Op } = require("sequelize");

class CourseModuleService {
  async addModuleToCourse(courseId, moduleData, adminUserId) {
    const t = await sequelize.transaction();
    try {
      // TODO: Verificar se adminUserId tem permissão (admin ou tutor do curso)
      const course = await Course.findByPk(courseId, { transaction: t });
      if (!course) {
        await t.rollback();
        throw new Error("Curso não encontrado.");
      }

      // Verificar se já existe um módulo com a mesma ordem ou nome neste curso
      const existingModule = await CourseModule.findOne({
        where: {
          curso_id: courseId,
          [Op.or]: [
            { nome_modulo: moduleData.nome_modulo },
            { ordem: moduleData.ordem },
          ],
        },
        transaction: t,
      });

      if (existingModule) {
        await t.rollback();
        let errorMessage = "Já existe um módulo com ";
        if (existingModule.nome_modulo === moduleData.nome_modulo) {
          errorMessage += `o nome "${moduleData.nome_modulo}"`;
        }
        if (existingModule.ordem === moduleData.ordem) {
          errorMessage += `${existingModule.nome_modulo === moduleData.nome_modulo ? " e" : ""} a ordem ${moduleData.ordem}`;
        }
        errorMessage += " neste curso.";
        throw new Error(errorMessage);
      }

      const newModule = await CourseModule.create(
        { ...moduleData, curso_id: courseId },
        { transaction: t }
      );
      await t.commit();
      return newModule.toJSON();
    } catch (error) {
      await t.rollback();
      throw new Error(`Erro ao adicionar módulo ao curso: ${error.message}`);
    }
  }

  async getModulesByCourse(courseId) {
    try {
      const modules = await CourseModule.findAll({
        where: { curso_id: courseId },
        include: [{ model: ModuleContent, attributes: ["id", "titulo", "tipo_conteudo", "ordem"] }], // Incluir conteúdos do módulo
        order: [["ordem", "ASC"]],
      });
      return modules.map(mod => mod.toJSON());
    } catch (error) {
      throw new Error(`Erro ao obter módulos do curso: ${error.message}`);
    }
  }

  async getModuleById(moduleId) {
    try {
      const module = await CourseModule.findByPk(moduleId, {
        include: [{ model: ModuleContent, order: [["ordem", "ASC"]] }],
      });
      if (!module) {
        return null;
      }
      return module.toJSON();
    } catch (error) {
      throw new Error(`Erro ao obter módulo por ID: ${error.message}`);
    }
  }

  async updateModuleInCourse(moduleId, moduleData, adminUserId) {
    const t = await sequelize.transaction();
    try {
      // TODO: Verificar permissão
      const module = await CourseModule.findByPk(moduleId, { transaction: t });
      if (!module) {
        await t.rollback();
        throw new Error("Módulo não encontrado.");
      }

      // Verificar unicidade de nome e ordem (excluindo o próprio módulo)
      if (moduleData.nome_modulo || moduleData.ordem) {
        const orConditions = [];
        if (moduleData.nome_modulo && moduleData.nome_modulo !== module.nome_modulo) {
            orConditions.push({ nome_modulo: moduleData.nome_modulo });
        }
        if (moduleData.ordem && moduleData.ordem !== module.ordem) {
            orConditions.push({ ordem: moduleData.ordem });
        }

        if (orConditions.length > 0) {
            const existingModule = await CourseModule.findOne({
                where: {
                    curso_id: module.curso_id,
                    id: { [Op.ne]: moduleId },
                    [Op.or]: orConditions,
                },
                transaction: t,
            });
            if (existingModule) {
                await t.rollback();
                throw new Error("Já existe outro módulo com este nome ou ordem no curso.");
            }
        }
      }

      await module.update(moduleData, { transaction: t });
      await t.commit();
      return module.toJSON();
    } catch (error) {
      await t.rollback();
      throw new Error(`Erro ao atualizar módulo: ${error.message}`);
    }
  }

  async removeModuleFromCourse(moduleId, adminUserId) {
    const t = await sequelize.transaction();
    try {
      // TODO: Verificar permissão
      const module = await CourseModule.findByPk(moduleId, { transaction: t });
      if (!module) {
        await t.rollback();
        throw new Error("Módulo não encontrado.");
      }
      // Considerar o que acontece com ModuleContent (onDelete: CASCADE no modelo)
      await module.destroy({ transaction: t });
      await t.commit();
      return { message: "Módulo removido com sucesso." };
    } catch (error) {
      await t.rollback();
      throw new Error(`Erro ao remover módulo: ${error.message}`);
    }
  }

  // --- Métodos para Conteúdo do Módulo (ModuleContent) ---
  async addContentToModule(moduleId, contentData, adminUserId) {
    // ... implementação similar ...
  }
  async updateContentInModule(contentId, contentData, adminUserId) {
    // ... implementação similar ...
  }
  async removeContentFromModule(contentId, adminUserId) {
    // ... implementação similar ...
  }
}

module.exports = new CourseModuleService();

