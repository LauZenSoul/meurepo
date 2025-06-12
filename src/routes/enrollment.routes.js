// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/enrollment.routes.js

const express = require("express");
const enrollmentController = require("../controllers/enrollment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// TODO: Adicionar middleware de validação de dados (ex: Joi ou express-validator)

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas de matrículas
router.use(authMiddleware.authenticateToken);

// Rota para um estudante se matricular num curso
router.post("/enroll", 
    authMiddleware.authorizeRole(["aluno"]), 
    enrollmentController.enrollStudentInCourse
);

// Rota para um estudante listar as suas matrículas
router.get("/my-enrollments", 
    authMiddleware.authorizeRole(["aluno", "tutor", "admin"]), // Permitir que tutores/admins vejam as matrículas do aluno autenticado
    enrollmentController.getMyEnrollments
);

// Rota para um estudante obter detalhes de uma das suas matrículas
router.get("/my-enrollments/:enrollmentId", 
    authMiddleware.authorizeRole(["aluno", "tutor", "admin"]), 
    enrollmentController.getMyEnrollmentDetails
);

// --- Rotas para Admin/Tutor ---

// Rota para admin/tutor listar todas as matrículas do sistema (com filtros)
router.get("/system/all",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    enrollmentController.getAllSystemEnrollments
);

// Rota para admin/tutor atualizar o estado de uma matrícula
router.put("/system/update-status/:enrollmentId", 
    authMiddleware.authorizeRole(["admin", "tutor"]), 
    enrollmentController.updateStudentEnrollmentStatus
);

// TODO: Adicionar mais rotas administrativas se necessário (ex: ver detalhes de qualquer matrícula pelo ID)

module.exports = router;

