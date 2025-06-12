// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/grade.routes.js

const express = require("express");
const gradeController = require("../controllers/grade.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Aplicar middleware de autenticação para todas as rotas de notas
router.use(authMiddleware.authenticateToken);

// Rota para um tutor/admin lançar/atualizar uma nota para um aluno numa avaliação
router.post("/submit",
    authMiddleware.authorizeRole(["tutor", "admin"]),
    gradeController.submitStudentGrade
);

// Rota para um estudante obter as suas próprias notas (opcionalmente filtrado por curso)
router.get("/my-grades",
    authMiddleware.authorizeRole(["aluno"]),
    gradeController.getMyGrades
);

// Rota para um tutor/admin obter todas as notas de uma avaliação específica
router.get("/assessment/:assessmentId",
    authMiddleware.authorizeRole(["tutor", "admin"]),
    gradeController.getGradesForAssessmentByTutor
);

// Rota para um tutor/admin obter as notas de um estudante específico (opcionalmente por curso)
router.get("/student/:studentUserId",
    authMiddleware.authorizeRole(["tutor", "admin"]),
    gradeController.getStudentGradesByAdmin
);

// TODO: Adicionar rotas para tutor/admin atualizar ou remover uma nota específica, se necessário.
// Ex: PUT /api/grades/:gradeId
// Ex: DELETE /api/grades/:gradeId

module.exports = router;

