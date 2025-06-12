// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/student.controller.js

const studentService = require("../../services/student.service");

class StudentController {
  async createStudentProfile(req, res, next) {
    try {
      const userId = req.user.id; // Obtido do token JWT (após autenticação)
      // Validação de entrada (studentData) deve ser feita por um middleware
      const studentData = req.body;

      if (req.user.tipo_utilizador !== "aluno") {
        return res.status(403).json({ message: "Apenas utilizadores do tipo \"aluno\" podem criar um perfil de estudante." });
      }

      const newStudent = await studentService.createStudent(studentData, userId);
      res.status(201).json({ message: "Perfil de estudante criado com sucesso!", student: newStudent });
    } catch (error) {
      if (error.message.includes("Este utilizador já possui um perfil de estudante")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      if (error.message.includes("Número de estudante já registado")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      if (error.message.includes("Erro de constraint")) {
        return res.status(400).json({ message: error.message }); // Bad Request
      }
      next(error);
    }
  }

  async getMyStudentProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const studentProfile = await studentService.getStudentByUserId(userId);
      if (!studentProfile) {
        return res.status(404).json({ message: "Perfil de estudante não encontrado." });
      }
      res.status(200).json(studentProfile);
    } catch (error) {
      next(error);
    }
  }

  async updateMyStudentProfile(req, res, next) {
    try {
      const userId = req.user.id;
      // Validação de entrada (studentData) deve ser feita por um middleware
      const studentData = req.body;

      const updatedStudent = await studentService.updateStudent(userId, studentData);
      res.status(200).json({ message: "Perfil de estudante atualizado com sucesso!", student: updatedStudent });
    } catch (error) {
      if (error.message.includes("Estudante não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Número de estudante já registado por outro utilizador") || error.message.includes("ID Biométrico já associado a outro estudante")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      if (error.message.includes("Erro de constraint")) {
        return res.status(400).json({ message: error.message }); // Bad Request
      }
      next(error);
    }
  }

  // TODO: Adicionar controladores para admin gerir estudantes (listar, ver detalhes, etc.)
}

module.exports = new StudentController();

