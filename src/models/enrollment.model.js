// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/enrollment.model.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Enrollment = sequelize.define("Enrollment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // aluno_id e curso_id serão adicionados automaticamente pelas associações
    data_matricula: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estado_matricula: {
      type: DataTypes.ENUM("Ativa", "Concluída", "Cancelada", "Pendente"),
      allowNull: false,
      defaultValue: "Pendente",
    },
    data_conclusao: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  Enrollment.associate = (models) => {
    // Uma matrícula pertence a um estudante
    Enrollment.belongsTo(models.Student, {
      foreignKey: {
        name: "aluno_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    // Uma matrícula pertence a um curso
    Enrollment.belongsTo(models.Course, {
      foreignKey: {
        name: "curso_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    // Uma matrícula pode ter vários progressos de aluno
    Enrollment.hasMany(models.StudentProgress, {
        foreignKey: "matricula_id",
    });
    // Uma matrícula pode ter várias notas
    Enrollment.hasMany(models.Grade, {
        foreignKey: "matricula_id",
    });
  };

  return Enrollment;
};

