// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/courseModule.routes.js

const express = require("express");
const courseModuleController = require("../controllers/courseModule.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// As rotas de módulos são geralmente aninhadas sob cursos, ex: /api/courses/:courseId/modules
// Ou podem ser rotas de nível superior se os módulos forem geridos independentemente dos cursos em alguns contextos.
// Para este exemplo, vamos criar rotas de módulos que podem ser acedidas diretamente ou aninhadas.

const router = express.Router({ mergeParams: true }); // mergeParams permite aceder a req.params.courseId se aninhado

// Aplicar middleware de autenticação para a maioria das rotas de módulos
router.use(authMiddleware.authenticateToken);

// Rota para adicionar um novo módulo a um curso específico
// POST /api/courses/:courseId/modules  (se aninhado)
// POST /api/modules/course/:courseId (se rota de módulo separada)
// Vamos usar a segunda abordagem para este ficheiro de rotas dedicado a módulos
router.post("/course/:courseId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    courseModuleController.addModuleToCourse
);

// Rota para listar todos os módulos de um curso específico
// GET /api/courses/:courseId/modules (se aninhado)
// GET /api/modules/course/:courseId
router.get("/course/:courseId",
    // Geralmente público ou para utilizadores autenticados
    courseModuleController.getModulesByCourse
);

// Rota para obter detalhes de um módulo específico pelo seu ID
// GET /api/modules/:moduleId
router.get("/:moduleId",
    // Geralmente público ou para utilizadores autenticados
    courseModuleController.getModuleById
);

// Rota para atualizar um módulo específico
// PUT /api/modules/:moduleId
router.put("/:moduleId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    courseModuleController.updateModuleInCourse // O serviço já trata a lógica de curso
);

// Rota para remover um módulo específico
// DELETE /api/modules/:moduleId
router.delete("/:moduleId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    courseModuleController.removeModuleFromCourse
);

// TODO: Adicionar rotas para gestão de Conteúdo do Módulo (ModuleContent)
// Exemplo: POST /api/modules/:moduleId/contents
// GET /api/modules/:moduleId/contents
// GET /api/contents/:contentId
// PUT /api/contents/:contentId
// DELETE /api/contents/:contentId

module.exports = router;

