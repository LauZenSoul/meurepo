// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/services/biometric.service.js

const { BiometricData, User, TelbandaCenter, sequelize } = require("../models");

class BiometricService {
  async registerBiometricData(userId, biometricDetails, adminUserId) {
    const t = await sequelize.transaction();
    try {
      // Verificar se o utilizador que está a registar (adminUserId) tem permissão
      const adminUser = await User.findByPk(adminUserId, { transaction: t });
      if (!adminUser || (adminUser.tipo_utilizador !== "admin" && adminUser.tipo_utilizador !== "tutor")) {
        await t.rollback();
        throw new Error("Apenas administradores ou tutores podem registar dados biométricos.");
      }

      const targetUser = await User.findByPk(userId, { transaction: t });
      if (!targetUser) {
        await t.rollback();
        throw new Error("Utilizador alvo para registo biométrico não encontrado.");
      }

      // Verificar se o centro de registo existe, se fornecido
      if (biometricDetails.centro_registo_id) {
        const center = await TelbandaCenter.findByPk(biometricDetails.centro_registo_id, { transaction: t });
        if (!center) {
          await t.rollback();
          throw new Error("Centro de registo biométrico não encontrado.");
        }
      }

      // Verificar se já existem dados biométricos para este utilizador
      let existingBiometricData = await BiometricData.findOne({
        where: { user_id: userId },
        transaction: t,
      });

      if (existingBiometricData) {
        // Atualizar dados existentes
        existingBiometricData.tipo_biometria = biometricDetails.tipo_biometria;
        existingBiometricData.dados_biometricos = biometricDetails.dados_biometricos;
        existingBiometricData.data_registo = new Date();
        existingBiometricData.registado_por_id = adminUserId;
        existingBiometricData.centro_registo_id = biometricDetails.centro_registo_id || null;
        await existingBiometricData.save({ transaction: t });
        await t.commit();
        return existingBiometricData.toJSON();
      } else {
        // Criar novos dados biométricos
        const newBiometricData = await BiometricData.create({
          user_id: userId,
          tipo_biometria: biometricDetails.tipo_biometria,
          dados_biometricos: biometricDetails.dados_biometricos,
          registado_por_id: adminUserId,
          centro_registo_id: biometricDetails.centro_registo_id || null,
          data_registo: new Date(),
        }, { transaction: t });
        await t.commit();
        return newBiometricData.toJSON();
      }
    } catch (error) {
      await t.rollback();
      throw new Error(`Erro ao registar dados biométricos: ${error.message}`);
    }
  }

  async getBiometricDataByUserId(userId) {
    try {
      const biometricData = await BiometricData.findOne({
        where: { user_id: userId },
        include: [
          { model: User, as: "user", attributes: ["id", "nome", "email"] },
          { model: User, as: "registadoPor", attributes: ["id", "nome"] },
          { model: TelbandaCenter, as: "centroRegisto", attributes: ["id", "nome_centro"] }
        ]
      });
      if (!biometricData) {
        return null; // Ou lançar erro se preferir que sempre exista
      }
      return biometricData.toJSON();
    } catch (error) {
      throw new Error(`Erro ao obter dados biométricos: ${error.message}`);
    }
  }

  async verifyBiometricData(userId, providedBiometricSample) {
    try {
      const storedBiometricData = await BiometricData.findOne({ where: { user_id: userId } });
      if (!storedBiometricData) {
        throw new Error("Dados biométricos não encontrados para este utilizador.");
      }

      // Lógica de verificação biométrica real seria complexa e dependeria de SDKs/APIs externas.
      // Esta é uma simulação.
      // Exemplo: comparar um hash do `providedBiometricSample` com `storedBiometricData.dados_biometricos`
      // ou chamar uma API de um fornecedor de biometria.
      console.log(`Simulando verificação biométrica para user_id: ${userId}`);
      console.log(`Dados armazenados (representação): ${storedBiometricData.dados_biometricos.substring(0, 30)}...`);
      console.log(`Amostra fornecida (representação): ${providedBiometricSample.substring(0, 30)}...`);
      
      // SIMULAÇÃO DE SUCESSO
      // Numa implementação real, a comparação seria feita aqui.
      // Por exemplo, se `dados_biometricos` fosse um template e `providedBiometricSample` outro,
      // uma biblioteca de correspondência biométrica retornaria um score de similaridade.
      const isMatch = storedBiometricData.dados_biometricos === providedBiometricSample; // Simples comparação para exemplo

      if (isMatch) {
        return { verified: true, message: "Verificação biométrica bem-sucedida (simulação)." };
      } else {
        return { verified: false, message: "Falha na verificação biométrica (simulação)." };
      }
    } catch (error) {
      throw new Error(`Erro durante a verificação biométrica: ${error.message}`);
    }
  }
  
  async deleteBiometricData(userId, adminUserId) {
    const t = await sequelize.transaction();
    try {
        const adminUser = await User.findByPk(adminUserId, { transaction: t });
        if (!adminUser || adminUser.tipo_utilizador !== "admin") {
            await t.rollback();
            throw new Error("Apenas administradores podem remover dados biométricos.");
        }

        const biometricRecord = await BiometricData.findOne({ where: { user_id: userId }, transaction: t });
        if (!biometricRecord) {
            await t.rollback();
            throw new Error("Dados biométricos não encontrados para este utilizador.");
        }

        await biometricRecord.destroy({ transaction: t });
        await t.commit();
        return { message: "Dados biométricos removidos com sucesso." };

    } catch (error) {
        await t.rollback();
        throw new Error(`Erro ao remover dados biométricos: ${error.message}`);
    }
  }
}

module.exports = new BiometricService();

