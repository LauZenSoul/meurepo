// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/biometric.routes.js

const express = require("express");
const biometricController = require("../controllers/biometric.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Aplicar middleware de autenticação para todas as rotas biométricas
router.use(authMiddleware.authenticateToken);

// Rota para um admin/tutor registar/atualizar dados biométricos de um utilizador
router.post("/register/:userId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    biometricController.registerBiometricData
);

// Rota para obter dados biométricos de um utilizador (próprio utilizador ou admin/tutor)
router.get("/:userId",
    // A lógica de autorização está no controlador para este caso específico
    biometricController.getBiometricData
);

// Rota para um admin/tutor iniciar uma verificação biométrica para um utilizador
router.post("/verify/:userId",
    authMiddleware.authorizeRole(["admin", "tutor"]),
    biometricController.verifyBiometricData
);

// Rota para um admin remover dados biométricos de um utilizador
router.delete("/:userId",
    authMiddleware.authorizeRole(["admin"]),
    biometricController.deleteBiometricData
);

module.exports = router;

