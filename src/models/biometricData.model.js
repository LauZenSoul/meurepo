// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/biometricData.model.js

const { DataTypes } = require("sequelize");
const sequelize = require("./index").sequelize; // Ajuste para o seu ficheiro de configuração do Sequelize
const User = require("./user.model");

const BiometricData = sequelize.define("BiometricData", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    unique: true, // Geralmente um utilizador tem um conjunto de dados biométricos
  },
  tipo_biometria: {
    type: DataTypes.ENUM("impressao_digital", "reconhecimento_facial", "outra"),
    allowNull: false,
  },
  dados_biometricos: {
    type: DataTypes.TEXT, // Ou BLOB se for armazenar dados binários diretamente (não recomendado para dados brutos)
    allowNull: false,
    comment: "Representação dos dados biométricos, ex: template, hash ou referência a um sistema externo."
  },
  data_registo: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  registado_por_id: { // ID do utilizador (admin/tutor) que registou os dados no centro
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: User,
        key: "id"
    }
  },
  centro_registo_id: { // ID do centro Telbanda onde foi feito o registo
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: "TelbandaCenters", // Nome da tabela dos centros
        key: "id"
    }
  }
}, {
  tableName: "dados_biometricos",
  timestamps: true,
  paranoid: true, // Se quiser soft delete
  createdAt: "criado_em",
  updatedAt: "atualizado_em",
  deletedAt: "removido_em"
});

User.hasOne(BiometricData, { foreignKey: "user_id", as: "biometricData" });
BiometricData.belongsTo(User, { foreignKey: "user_id", as: "user" });

BiometricData.belongsTo(User, { foreignKey: "registado_por_id", as: "registadoPor" });
// A relação com TelbandaCenter já foi definida no modelo TelbandaCenter, mas podemos adicionar aqui também se necessário
// BiometricData.belongsTo(TelbandaCenter, { foreignKey: "centro_registo_id", as: "centroRegisto" });


module.exports = BiometricData;

