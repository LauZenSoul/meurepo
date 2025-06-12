// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/report.routes.js

const express = require("express");
const reportController = require("../controllers/report.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Aplicar middleware de autenticação para todas as rotas de relatórios
router.use(authMiddleware.authenticateToken);

// Rota para obter relatório de distribuição de estudantes
router.get("/student-distribution",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    reportController.getStudentDistributionReport
);

// Rota para obter relatório de desempenho académico
router.get("/academic-performance",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    reportController.getAcademicPerformanceReport
);

// Rota para obter relatório de popularidade de cursos
router.get("/course-popularity",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    reportController.getCoursePopularityReport
);

// Rota para obter relatório de atividade dos centros
router.get("/center-activity",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    reportController.getCenterActivityReport
);

// Rota para obter relatório de dashboard (resumo geral)
router.get("/dashboard",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    reportController.getDashboardReport
);

module.exports = router;
