// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/grade.model.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Grade = sequelize.define("Grade", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // matricula_id e avaliacao_id serão adicionados automaticamente pelas associações
    nota: {
      type: DataTypes.DECIMAL(5, 2), // Ex: 10.00, 15.50
      allowNull: false,
      validate: {
        min: 0,
        max: 20, // Assumindo uma escala de 0 a 20, ajustar se necessário
      },
    },
    data_atribuicao_nota: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  Grade.associate = (models) => {
    // Uma nota pertence a uma matrícula específica
    Grade.belongsTo(models.Enrollment, {
      foreignKey: {
        name: "matricula_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    // Uma nota pertence a uma avaliação específica
    Grade.belongsTo(models.Assessment, {
      foreignKey: {
        name: "avaliacao_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Grade;
};

