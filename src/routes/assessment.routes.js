// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/assessment.routes.js

const express = require("express");
const assessmentController = require("../controllers/assessment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router({ mergeParams: true }); // Para aninhar sob módulos, se necessário

// Aplicar middleware de autenticação para a maioria das rotas de avaliações
router.use(authMiddleware.authenticateToken);

// Rota para criar uma nova avaliação para um módulo específico
// POST /api/modules/:moduleId/assessments (se aninhado)
// POST /api/assessments/module/:moduleId (se rota de avaliação separada)
router.post("/module/:moduleId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    assessmentController.createAssessmentForModule
);

// Rota para listar todas as avaliações de um módulo específico
// GET /api/modules/:moduleId/assessments (se aninhado)
// GET /api/assessments/module/:moduleId
router.get("/module/:moduleId",
    // Geralmente para utilizadores autenticados (alunos do curso, tutores, admin)
    assessmentController.getAssessmentsByModule
);

// Rota para obter detalhes de uma avaliação específica pelo seu ID
// GET /api/assessments/:assessmentId
router.get("/:assessmentId",
    // Geralmente para utilizadores autenticados
    assessmentController.getAssessmentById
);

// Rota para atualizar uma avaliação específica
// PUT /api/assessments/:assessmentId
router.put("/:assessmentId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    assessmentController.updateAssessment
);

// Rota para remover uma avaliação específica
// DELETE /api/assessments/:assessmentId
router.delete("/:assessmentId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    assessmentController.deleteAssessment
);

// TODO: Adicionar rotas para submissão de avaliações por alunos e atribuição de notas por tutores
// Ex: POST /api/assessments/:assessmentId/submit (aluno)
// Ex: GET /api/assessments/:assessmentId/submissions (tutor/admin)
// Ex: POST /api/submissions/:submissionId/grade (tutor)

module.exports = router;

