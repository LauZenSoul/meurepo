// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/student.routes.js

const express = require("express");
const studentController = require("../controllers/student.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// TODO: Adicionar middleware de validação de dados (ex: Joi ou express-validator)

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas de estudantes
router.use(authMiddleware.authenticateToken);

// Rota para um utilizador (aluno) criar o seu perfil de estudante
// Apenas utilizadores autenticados como "aluno" podem aceder
router.post("/profile", 
    authMiddleware.authorizeRole(["aluno"]), 
    studentController.createStudentProfile
);

// Rota para um utilizador (aluno) obter o seu perfil de estudante
router.get("/profile", 
    authMiddleware.authorizeRole(["aluno", "tutor", "admin"]), // Permitir que tutores e admins também vejam perfis
    studentController.getMyStudentProfile
);

// Rota para um utilizador (aluno) atualizar o seu perfil de estudante
router.put("/profile", 
    authMiddleware.authorizeRole(["aluno"]), 
    studentController.updateMyStudentProfile
);

// TODO: Adicionar rotas para administradores gerirem estudantes (ex: /admin/students)
// Exemplo:
// router.get("/admin/students", 
//     authMiddleware.authorizeRole(["admin", "tutor"]), 
//     studentController.listAllStudents
// );
// router.get("/admin/students/:studentId", 
//     authMiddleware.authorizeRole(["admin", "tutor"]), 
//     studentController.getStudentDetailsById
// );

module.exports = router;

