// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/services/auth.service.js

const jwt = require("jsonwebtoken");
const { User } = require("../models"); // O index.js em models exporta todos os modelos

const JWT_SECRET = process.env.JWT_SECRET || "your-very-strong-secret-key"; // Usar variável de ambiente em produção
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

class AuthService {
  async registerUser(userData) {
    try {
      // A senha já será hasheada pelo hook beforeCreate no modelo User
      const newUser = await User.create(userData);
      // Não retornar a senha_hash
      const userJson = newUser.toJSON();
      delete userJson.senha_hash;
      return userJson;
    } catch (error) {
      // Tratar erros de validação do Sequelize (ex: email duplicado)
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error("Email já registado.");
      }
      throw new Error(`Erro ao registar utilizador: ${error.message}`);
    }
  }

  async loginUser(email, senha) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Utilizador não encontrado.");
      }

      const isSenhaValida = await user.validarSenha(senha);
      if (!isSenhaValida) {
        throw new Error("Senha inválida.");
      }

      if (!user.ativo) {
        throw new Error("Conta de utilizador inativa.");
      }

      // Gerar token JWT
      const payload = {
        id: user.id,
        email: user.email,
        tipo_utilizador: user.tipo_utilizador,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      const userJson = user.toJSON();
      delete userJson.senha_hash; // Não retornar a senha_hash

      return { user: userJson, token, expiresIn: JWT_EXPIRES_IN };
    } catch (error) {
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      // Tratar erros de token (expirado, inválido)
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expirado.");
      }
      if (error.name === "JsonWebTokenError") {
        throw new Error("Token inválido.");
      }
      throw new Error(`Erro ao verificar token: ${error.message}`);
    }
  }
}

module.exports = new AuthService();

