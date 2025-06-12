// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/telbandaCenter.model.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TelbandaCenter = sequelize.define("TelbandaCenter", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_centro: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    localizacao_texto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: -180,
        max: 180,
      },
    },
    contacto_centro: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    horario_funcionamento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  // TelbandaCenter.associate = (models) => {
  //   // Exemplo: Se um centro tivesse um responsável (utilizador)
  //   // TelbandaCenter.belongsTo(models.User, {
  //   //   foreignKey: "responsavel_id",
  //   //   allowNull: true,
  //   // });
  // };

  return TelbandaCenter;
};

