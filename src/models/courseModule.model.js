// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/courseModule.model.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CourseModule = sequelize.define("CourseModule", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // curso_id será adicionado automaticamente pela associação com Course
    nome_modulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ordem: { // Ordem do módulo dentro do curso
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  CourseModule.associate = (models) => {
    // Um módulo pertence a um curso
    CourseModule.belongsTo(models.Course, {
      foreignKey: {
        name: "curso_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    // Um módulo pode ter vários conteúdos
    CourseModule.hasMany(models.ModuleContent, {
      foreignKey: "modulo_id",
    });
  };

  return CourseModule;
};

