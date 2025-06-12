// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/routes/auth.routes.js

const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Rota para registar um novo utilizador (pode ser protegida para apenas admins no futuro)
router.post("/register", authController.register);

// Rota para login de utilizador
router.post("/login", authController.login);

// Rota de exemplo para aceder a um perfil protegido
// O middleware authenticateToken irá verificar o JWT
// O middleware authorizeRole irá verificar se o utilizador tem a permissão "aluno" ou "admin"
router.get("/profile", 
    authMiddleware.authenticateToken, 
    authMiddleware.authorizeRole(["aluno", "admin", "tutor"]), // Permitir acesso a alunos, admins e tutores
    authController.getProfile
);

module.exports = router;

