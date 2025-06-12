// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/middlewares/auth.middleware.js

const authService = require("../../services/auth.service");

class AuthMiddleware {
  // Middleware para verificar se o utilizador está autenticado
  authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (token == null) {
      return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
      const decodedUser = authService.verifyToken(token);
      req.user = decodedUser; // Adiciona os dados do utilizador decodificado ao objeto req
      next(); // Passa para o próximo middleware ou rota
    } catch (error) {
      // Tratar erros específicos de token (expirado, inválido)
      if (error.message === "Token expirado.") {
        return res.status(403).json({ message: "Token expirado." });
      }
      if (error.message === "Token inválido.") {
        return res.status(403).json({ message: "Token inválido." });
      }
      // Outros erros de verificação de token
      return res.status(403).json({ message: `Erro de autenticação: ${error.message}` });
    }
  }

  // Middleware para verificar se o utilizador tem uma permissão específica (role)
  authorizeRole(rolesPermitidas) {
    return (req, res, next) => {
      if (!req.user || !req.user.tipo_utilizador) {
        return res.status(403).json({ message: "Acesso negado. Utilizador não autenticado ou tipo não definido." });
      }

      const { tipo_utilizador } = req.user;
      if (rolesPermitidas.includes(tipo_utilizador)) {
        next(); // Utilizador tem a permissão necessária
      } else {
        res.status(403).json({ message: "Acesso negado. Não tem permissão para aceder a este recurso." });
      }
    };
  }
}

module.exports = new AuthMiddleware();

