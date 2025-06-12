// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/assessment.model.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Assessment = sequelize.define("Assessment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // curso_id será adicionado automaticamente pela associação com Course
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    tipo_avaliacao: {
      type: DataTypes.ENUM("TesteOnline", "TrabalhoPratico", "Participacao", "ExameFinal"),
      allowNull: false,
    },
    data_limite_entrega: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  Assessment.associate = (models) => {
    // Uma avaliação pertence a um curso
    Assessment.belongsTo(models.Course, {
      foreignKey: {
        name: "curso_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    // Uma avaliação pode ter várias notas
    Assessment.hasMany(models.Grade, {
      foreignKey: "avaliacao_id",
    });
  };

  return Assessment;
};

