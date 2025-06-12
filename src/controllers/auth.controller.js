// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/auth.controller.js

const authService = require("../services/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      // Em um cenário real, o registo de novos utilizadores pode ser restrito (ex: apenas admins criam contas)
      // Aqui, vamos assumir um registo mais aberto para fins de desenvolvimento inicial
      // Validação de entrada deve ser feita por um middleware antes de chegar aqui (ex: Joi, express-validator)
      const { nome, email, senha, tipo_utilizador } = req.body;
      if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
      }

      const newUser = await authService.registerUser({ nome, email, senha_hash: senha, tipo_utilizador });
      res.status(201).json({ message: "Utilizador registado com sucesso!", user: newUser });
    } catch (error) {
      // Enviar para o middleware de tratamento de erros
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." });
      }

      const result = await authService.loginUser(email, senha);
      res.status(200).json(result);
    } catch (error) {
      // Personalizar mensagens de erro para login
      if (error.message.includes("Utilizador não encontrado") || error.message.includes("Senha inválida")) {
        return res.status(401).json({ message: "Credenciais inválidas." });
      }
      if (error.message.includes("Conta de utilizador inativa")){
        return res.status(403).json({ message: "Conta de utilizador inativa." });
      }
      next(error);
    }
  }

  // Exemplo de uma rota protegida que verificaria o token
  async getProfile(req, res, next) {
    try {
      // O token já teria sido verificado por um middleware de autenticação
      // req.user conteria os dados do utilizador decodificados do token
      const userId = req.user.id;
      // Aqui, você buscaria os dados completos do perfil do utilizador no banco de dados
      // Por agora, apenas retornamos o que está no token
      res.status(200).json({ message: "Perfil acedido com sucesso", user: req.user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();

