// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/biometric.controller.js

const biometricService = require("../../services/biometric.service");

class BiometricController {
  async registerBiometricData(req, res, next) {
    try {
      const adminUserId = req.user.id; // Utilizador que está a fazer o registo (tutor/admin)
      const targetUserId = parseInt(req.params.userId); // Utilizador para quem os dados estão a ser registados
      const biometricDetails = req.body; // { tipo_biometria, dados_biometricos, centro_registo_id }

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem registar dados biométricos." });
      }
      if (isNaN(targetUserId)) {
        return res.status(400).json({ message: "ID do utilizador alvo inválido." });
      }
      if (!biometricDetails.tipo_biometria || !biometricDetails.dados_biometricos) {
        return res.status(400).json({ message: "Tipo de biometria e dados biométricos são obrigatórios." });
      }
      // Validação adicional do tipo_biometria pode ser feita aqui ou no serviço

      const registeredData = await biometricService.registerBiometricData(targetUserId, biometricDetails, adminUserId);
      res.status(201).json({ message: "Dados biométricos registados/atualizados com sucesso!", data: registeredData });
    } catch (error) {
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Apenas administradores ou tutores")) {
        return res.status(403).json({ message: error.message });
      }
      next(error);
    }
  }

  async getBiometricData(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      // Apenas o próprio utilizador ou um admin/tutor pode ver os dados biométricos
      if (req.user.id !== userId && req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Acesso negado aos dados biométricos." });
      }
      if (isNaN(userId)) {
        return res.status(400).json({ message: "ID do utilizador inválido." });
      }

      const biometricData = await biometricService.getBiometricDataByUserId(userId);
      if (!biometricData) {
        return res.status(404).json({ message: "Dados biométricos não encontrados para este utilizador." });
      }
      res.status(200).json(biometricData);
    } catch (error) {
      next(error);
    }
  }

  async verifyBiometricData(req, res, next) {
    try {
      // Esta rota seria tipicamente usada por um sistema (ex: leitor biométrico no centro)
      // ou por um admin/tutor a verificar um aluno presencialmente.
      // A autenticação desta rota precisa ser cuidadosamente considerada.
      // Por agora, vamos assumir que é um admin/tutor a iniciar a verificação.
      const adminUserId = req.user.id;
      const targetUserId = parseInt(req.params.userId);
      const { biometricSample } = req.body; // Amostra biométrica fornecida para verificação

      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Apenas administradores ou tutores podem iniciar a verificação biométrica." });
      }
      if (isNaN(targetUserId)) {
        return res.status(400).json({ message: "ID do utilizador alvo inválido." });
      }
      if (!biometricSample) {
        return res.status(400).json({ message: "Amostra biométrica para verificação é obrigatória." });
      }

      const verificationResult = await biometricService.verifyBiometricData(targetUserId, biometricSample);
      res.status(200).json(verificationResult);
    } catch (error) {
      if (error.message.includes("Dados biométricos não encontrados")) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }
  
  async deleteBiometricData(req, res, next) {
    try {
        const adminUserId = req.user.id;
        const targetUserId = parseInt(req.params.userId);

        if (req.user.tipo_utilizador !== "admin") {
            return res.status(403).json({ message: "Apenas administradores podem remover dados biométricos." });
        }
        if (isNaN(targetUserId)) {
            return res.status(400).json({ message: "ID do utilizador alvo inválido." });
        }

        const result = await biometricService.deleteBiometricData(targetUserId, adminUserId);
        res.status(200).json(result);
    } catch (error) {
        if (error.message.includes("não encontrado")) {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.includes("Apenas administradores podem remover")) {
            return res.status(403).json({ message: error.message });
        }
        next(error);
    }
  }
}

module.exports = new BiometricController();

