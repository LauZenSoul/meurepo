// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/studentProgress.routes.js

const express = require("express");
const studentProgressController = require("../controllers/studentProgress.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Aplicar middleware de autenticação para todas as rotas de progresso
router.use(authMiddleware.authenticateToken);

// Rota para um estudante registar/atualizar o seu progresso num conteúdo
router.post("/record",
    authMiddleware.authorizeRole(["aluno"]),
    studentProgressController.recordStudentProgress
);

// Rota para um estudante obter o seu progresso num curso específico
router.get("/my-progress/course/:courseId",
    authMiddleware.authorizeRole(["aluno"]),
    studentProgressController.getMyProgressInCourse
);

// Rota para um estudante obter o seu progresso numa matrícula específica
router.get("/my-progress/enrollment/:enrollmentId",
    authMiddleware.authorizeRole(["aluno"]),
    studentProgressController.getProgressForMyEnrollment
);

// TODO: Adicionar rotas para admin/tutor verem progresso de alunos
// Ex: GET /api/progress/student/:studentId/course/:courseId
// Ex: GET /api/progress/enrollment/:enrollmentId (para admin/tutor ver qualquer matrícula)

module.exports = router;

