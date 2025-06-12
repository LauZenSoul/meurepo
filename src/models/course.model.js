// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/course.model.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Course = sequelize.define("Course", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_curso: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duracao_estimada: { // Em horas ou meses, a definir
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  Course.associate = (models) => {
    // Um curso pode ter várias matrículas
    Course.hasMany(models.Enrollment, {
      foreignKey: "curso_id",
    });
    // Um curso pode ter vários módulos
    Course.hasMany(models.CourseModule, {
      foreignKey: "curso_id",
    });
    // Um curso pode ter várias avaliações
    Course.hasMany(models.Assessment, {
      foreignKey: "curso_id",
    });
  };

  return Course;
};

