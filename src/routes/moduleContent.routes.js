// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/moduleContent.routes.js

const express = require("express");
const moduleContentController = require("../controllers/moduleContent.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router({ mergeParams: true }); // mergeParams permite aceder a req.params.moduleId se aninhado

// Aplicar middleware de autenticação para a maioria das rotas de conteúdo de módulo
router.use(authMiddleware.authenticateToken);

// Rota para adicionar um novo conteúdo a um módulo específico
// POST /api/modules/:moduleId/contents (se aninhado)
// POST /api/contents/module/:moduleId (se rota de conteúdo separada)
// Vamos usar a segunda abordagem para este ficheiro de rotas dedicado a conteúdos
router.post("/module/:moduleId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    moduleContentController.addContentToModule
);

// Rota para listar todos os conteúdos de um módulo específico
// GET /api/modules/:moduleId/contents (se aninhado)
// GET /api/contents/module/:moduleId
router.get("/module/:moduleId",
    // Geralmente público ou para utilizadores autenticados (alunos do curso)
    moduleContentController.getContentsByModule
);

// Rota para obter detalhes de um conteúdo específico pelo seu ID
// GET /api/contents/:contentId
router.get("/:contentId",
    // Geralmente público ou para utilizadores autenticados
    moduleContentController.getContentById
);

// Rota para atualizar um conteúdo específico
// PUT /api/contents/:contentId
router.put("/:contentId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    moduleContentController.updateContentInModule
);

// Rota para remover um conteúdo específico
// DELETE /api/contents/:contentId
router.delete("/:contentId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    moduleContentController.removeContentFromModule
);

module.exports = router;

