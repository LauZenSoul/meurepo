// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/student.model.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Student = sequelize.define("Student", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // user_id será adicionado automaticamente pela associação com User
    numero_estudante: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Pode ser preenchido depois
    },
    genero: {
      type: DataTypes.ENUM("masculino", "feminino", "outro"),
      allowNull: true,
    },
    morada: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contacto_telefonico: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coordenadas_gps_latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    coordenadas_gps_longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
    id_biometrico: { // Referência ao ID no sistema biométrico externo
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  Student.associate = (models) => {
    // Um estudante pertence a um utilizador
    Student.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      onDelete: "CASCADE", // Se o utilizador for apagado, o estudante também é
    });
    // Um estudante pode ter vários documentos
    Student.hasMany(models.Document, {
      foreignKey: "aluno_id",
    });
    // Um estudante pode ter várias matrículas
    Student.hasMany(models.Enrollment, {
      foreignKey: "aluno_id",
    });
  };

  return Student;
};

