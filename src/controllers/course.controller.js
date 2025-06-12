// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/course.controller.js

const courseService = require("../../services/course.service");

class CourseController {
  async createCourse(req, res, next) {
    try {
      // const adminUserId = req.user.id; // Verificar permissão de admin
      // Validação de entrada (courseData) deve ser feita por um middleware
      const courseData = req.body;

      // Exemplo de verificação de permissão (simplificado)
      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem criar cursos." });
      }

      const newCourse = await courseService.createCourse(courseData, req.user.id);
      res.status(201).json({ message: "Curso criado com sucesso!", course: newCourse });
    } catch (error) {
      if (error.message.includes("Já existe um curso registado com este nome")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      if (error.message.includes("Erro de constraint")) {
        return res.status(400).json({ message: error.message }); // Bad Request
      }
      next(error);
    }
  }

  async getAllCourses(req, res, next) {
    try {
      // TODO: Passar queryParams para o serviço para filtros e paginação
      const courses = await courseService.getAllCourses(req.query);
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req, res, next) {
    try {
      const courseId = req.params.courseId;
      const course = await courseService.getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Curso não encontrado." });
      }
      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  }

  async updateCourse(req, res, next) {
    try {
      // const adminUserId = req.user.id; // Verificar permissão de admin
      const courseId = req.params.courseId;
      const courseData = req.body;

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem atualizar cursos." });
      }

      const updatedCourse = await courseService.updateCourse(courseId, courseData, req.user.id);
      res.status(200).json({ message: "Curso atualizado com sucesso!", course: updatedCourse });
    } catch (error) {
      if (error.message.includes("Curso não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Já existe outro curso registado com este nome")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      if (error.message.includes("Erro de constraint")) {
        return res.status(400).json({ message: error.message }); // Bad Request
      }
      next(error);
    }
  }

  async deleteCourse(req, res, next) {
    try {
      // const adminUserId = req.user.id; // Verificar permissão de admin
      const courseId = req.params.courseId;

      if (req.user.tipo_utilizador !== "admin") {
        return res.status(403).json({ message: "Apenas administradores podem apagar cursos." });
      }

      const result = await courseService.deleteCourse(courseId, req.user.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes("Curso não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("existem alunos com matrículas ativas")) {
        return res.status(400).json({ message: error.message });
      }
      next(error);
    }
  }

  // TODO: Adicionar controladores para Módulos do Curso
}

module.exports = new CourseController();

