// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/services/assessment.service.js

const { Assessment, CourseModule, Enrollment, sequelize } = require("../models");
const { Op } = require("sequelize");

class AssessmentService {
  async createAssessment(moduleId, assessmentData, adminUserId) {
    const t = await sequelize.transaction();
    try {
      // TODO: Verificar se adminUserId tem permissão (admin ou tutor do curso/módulo)
      const module = await CourseModule.findByPk(moduleId, { transaction: t });
      if (!module) {
        await t.rollback();
        throw new Error("Módulo não encontrado.");
      }

      // Verificar se já existe uma avaliação com o mesmo título neste módulo
      const existingAssessment = await Assessment.findOne({
        where: {
          modulo_id: moduleId,
          titulo: assessmentData.titulo,
        },
        transaction: t,
      });

      if (existingAssessment) {
        await t.rollback();
        throw new Error(`Já existe uma avaliação com o título "${assessmentData.titulo}" neste módulo.`);
      }

      const newAssessment = await Assessment.create(
        { ...assessmentData, modulo_id: moduleId },
        { transaction: t }
      );
      await t.commit();
      return newAssessment.toJSON();
    } catch (error) {
      await t.rollback();
      throw new Error(`Erro ao criar avaliação: ${error.message}`);
    }
  }

  async getAssessmentsByModule(moduleId) {
    try {
      const assessments = await Assessment.findAll({
        where: { modulo_id: moduleId },
        order: [["data_disponibilizacao", "ASC"]],
      });
      return assessments.map(asm => asm.toJSON());
    } catch (error) {
      throw new Error(`Erro ao obter avaliações do módulo: ${error.message}`);
    }
  }

  async getAssessmentById(assessmentId) {
    try {
      const assessment = await Assessment.findByPk(assessmentId);
      if (!assessment) {
        return null;
      }
      return assessment.toJSON();
    } catch (error) {
      throw new Error(`Erro ao obter avaliação por ID: ${error.message}`);
    }
  }

  async updateAssessment(assessmentId, assessmentData, adminUserId) {
    const t = await sequelize.transaction();
    try {
      // TODO: Verificar permissão
      const assessment = await Assessment.findByPk(assessmentId, { transaction: t });
      if (!assessment) {
        await t.rollback();
        throw new Error("Avaliação não encontrada.");
      }

      if (assessmentData.titulo && assessmentData.titulo !== assessment.titulo) {
        const existingAssessment = await Assessment.findOne({
            where: {
                modulo_id: assessment.modulo_id,
                id: { [Op.ne]: assessmentId },
                titulo: assessmentData.titulo,
            },
            transaction: t,
        });
        if (existingAssessment) {
            await t.rollback();
            throw new Error("Já existe outra avaliação com este título no módulo.");
        }
      }

      await assessment.update(assessmentData, { transaction: t });
      await t.commit();
      return assessment.toJSON();
    } catch (error) {
      await t.rollback();
      throw new Error(`Erro ao atualizar avaliação: ${error.message}`);
    }
  }

  async deleteAssessment(assessmentId, adminUserId) {
    const t = await sequelize.transaction();
    try {
      // TODO: Verificar permissão
      const assessment = await Assessment.findByPk(assessmentId, { transaction: t });
      if (!assessment) {
        await t.rollback();
        throw new Error("Avaliação não encontrada.");
      }
      // Considerar o que acontece com Grades (onDelete: CASCADE no modelo)
      await assessment.destroy({ transaction: t });
      await t.commit();
      return { message: "Avaliação removida com sucesso." };
    } catch (error) {
      await t.rollback();
      throw new Error(`Erro ao remover avaliação: ${error.message}`);
    }
  }

  // TODO: Métodos para submissão de avaliações por alunos e atribuição de notas por tutores
}

module.exports = new AssessmentService();

