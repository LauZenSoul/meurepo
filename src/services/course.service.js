// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/services/course.service.js

const { Course, CourseModule, Enrollment } = require("../models");
const { Op } = require("sequelize");

class CourseService {
  async createCourse(courseData, adminUserId) {
    try {
      // TODO: Verificar se adminUserId tem permissão para criar cursos

      // Verificar se já existe um curso com o mesmo nome
      const existingCourse = await Course.findOne({ where: { nome_curso: courseData.nome_curso } });
      if (existingCourse) {
        throw new Error("Já existe um curso registado com este nome.");
      }

      const newCourse = await Course.create(courseData);
      return newCourse.toJSON();
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error("Erro de constraint: O nome do curso deve ser único.");
      }
      throw new Error(`Erro ao criar curso: ${error.message}`);
    }
  }

  async getAllCourses(queryParams) {
    try {
      // TODO: Adicionar paginação, filtros (ex: por nome, duração)
      const courses = await Course.findAll({
        include: [
          { model: CourseModule, attributes: ["id", "nome_modulo", "ordem"] }, // Incluir módulos do curso
        ],
        order: [["nome_curso", "ASC"]],
      });
      return courses.map(course => course.toJSON());
    } catch (error) {
      throw new Error(`Erro ao obter todos os cursos: ${error.message}`);
    }
  }

  async getCourseById(courseId) {
    try {
      const course = await Course.findByPk(courseId, {
        include: [
          { 
            model: CourseModule, 
            attributes: ["id", "nome_modulo", "descricao", "ordem"],
            // TODO: Adicionar include para ModuleContent se necessário aqui
          },
          // Poderia incluir contagem de alunos matriculados, etc.
        ]
      });
      if (!course) {
        return null; // Ou throw new Error("Curso não encontrado.");
      }
      return course.toJSON();
    } catch (error) {
      throw new Error(`Erro ao obter curso por ID: ${error.message}`);
    }
  }

  async updateCourse(courseId, courseData, adminUserId) {
    try {
      // TODO: Verificar se adminUserId tem permissão para atualizar cursos
      const course = await Course.findByPk(courseId);
      if (!course) {
        throw new Error("Curso não encontrado.");
      }

      // Se estiver a atualizar o nome do curso, verificar a unicidade (excluindo o próprio curso)
      if (courseData.nome_curso && courseData.nome_curso !== course.nome_curso) {
        const courseByName = await Course.findOne({
          where: {
            nome_curso: courseData.nome_curso,
            id: { [Op.ne]: course.id } // Excluir o próprio curso da verificação
          }
        });
        if (courseByName) {
          throw new Error("Já existe outro curso registado com este nome.");
        }
      }

      await course.update(courseData);
      return course.toJSON();
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error("Erro de constraint ao atualizar: O nome do curso deve ser único.");
      }
      throw new Error(`Erro ao atualizar curso: ${error.message}`);
    }
  }

  async deleteCourse(courseId, adminUserId) {
    try {
      // TODO: Verificar se adminUserId tem permissão para apagar cursos
      // TODO: Considerar o que acontece com matrículas e outros dados associados (onDelete: CASCADE nos modelos ajuda)
      const course = await Course.findByPk(courseId);
      if (!course) {
        throw new Error("Curso não encontrado.");
      }

      // Verificar se existem matrículas ativas no curso antes de apagar
      const activeEnrollments = await Enrollment.count({ 
        where: { curso_id: courseId, estado_matricula: "Ativa" } 
      });
      if (activeEnrollments > 0) {
        throw new Error("Não é possível apagar o curso pois existem alunos com matrículas ativas.");
      }

      await course.destroy();
      return { message: "Curso apagado com sucesso." };
    } catch (error) {
      throw new Error(`Erro ao apagar curso: ${error.message}`);
    }
  }

  // --- Métodos para Módulos do Curso (CourseModule) ---
  async addModuleToCourse(courseId, moduleData, adminUserId) {
    // ... implementação ...
  }
  async updateModuleInCourse(courseId, moduleId, moduleData, adminUserId) {
    // ... implementação ...
  }
  async removeModuleFromCourse(courseId, moduleId, adminUserId) {
    // ... implementação ...
  }

}

module.exports = new CourseService();

