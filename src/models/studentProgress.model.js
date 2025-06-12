// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/studentProgress.model.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentProgress = sequelize.define("StudentProgress", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // matricula_id e conteudo_id serão adicionados automaticamente pelas associações
    estado: {
      type: DataTypes.ENUM("Não Iniciado", "Em Progresso", "Concluído"),
      allowNull: false,
      defaultValue: "Não Iniciado",
    },
    data_ultima_visualizacao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data_conclusao_conteudo: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  StudentProgress.associate = (models) => {
    // O progresso de um aluno numa matrícula específica
    StudentProgress.belongsTo(models.Enrollment, {
      foreignKey: {
        name: "matricula_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    // O progresso de um aluno num conteúdo específico
    StudentProgress.belongsTo(models.ModuleContent, {
      foreignKey: {
        name: "conteudo_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return StudentProgress;
};

