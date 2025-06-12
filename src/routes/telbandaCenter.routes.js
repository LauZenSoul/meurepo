// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/telbandaCenter.routes.js

const express = require("express");
const telbandaCenterController = require("../controllers/telbandaCenter.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Rota pública para encontrar centros próximos (geolocalização)
router.get("/nearby", telbandaCenterController.findNearestCenters);

// Aplicar middleware de autenticação para as rotas administrativas abaixo
router.use(authMiddleware.authenticateToken);

// Rota para criar um novo centro Telbanda (apenas admin)
router.post("/",
    authMiddleware.authorizeRole(["admin"]),
    telbandaCenterController.createCenter
);

// Rota para listar todos os centros Telbanda (admin/tutor)
router.get("/",
    authMiddleware.authorizeRole(["admin", "tutor"]), // Tutores podem precisar ver os centros disponíveis
    telbandaCenterController.getAllCenters
);

// Rota para obter detalhes de um centro Telbanda específico (admin/tutor)
router.get("/:centerId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    telbandaCenterController.getCenterById
);

// Rota para atualizar um centro Telbanda (apenas admin)
router.put("/:centerId",
    authMiddleware.authorizeRole(["admin"]),
    telbandaCenterController.updateCenter
);

// Rota para remover um centro Telbanda (apenas admin)
router.delete("/:centerId",
    authMiddleware.authorizeRole(["admin"]),
    telbandaCenterController.deleteCenter
);

module.exports = router;

