// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/course.routes.js

const express = require("express");
const courseController = require("../controllers/course.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// TODO: Adicionar middleware de validação de dados (ex: Joi ou express-validator)

const router = express.Router();

// --- Rotas Públicas (sem necessidade de autenticação para listar/ver detalhes) ---
router.get("/", courseController.getAllCourses);
router.get("/:courseId", courseController.getCourseById);

// --- Rotas Protegidas (requerem autenticação e permissões específicas) ---

// Aplicar middleware de autenticação para as rotas abaixo
router.use(authMiddleware.authenticateToken);

// Rota para criar um novo curso (apenas admin/tutor)
router.post("/", 
    authMiddleware.authorizeRole(["admin", "tutor"]), 
    courseController.createCourse
);

// Rota para atualizar um curso existente (apenas admin/tutor)
router.put("/:courseId", 
    authMiddleware.authorizeRole(["admin", "tutor"]), 
    courseController.updateCourse
);

// Rota para apagar um curso (apenas admin)
router.delete("/:courseId", 
    authMiddleware.authorizeRole(["admin"]), 
    courseController.deleteCourse
);

// TODO: Adicionar rotas para gestão de módulos de curso (CourseModules)
// Exemplo:
// router.post("/:courseId/modules", 
//     authMiddleware.authorizeRole(["admin", "tutor"]), 
//     courseController.addModuleToCourseController
// );
// router.put("/:courseId/modules/:moduleId", 
//     authMiddleware.authorizeRole(["admin", "tutor"]), 
//     courseController.updateModuleInCourseController
// );
// router.delete("/:courseId/modules/:moduleId", 
//     authMiddleware.authorizeRole(["admin", "tutor"]), 
//     courseController.removeModuleFromCourseController
// );

module.exports = router;

