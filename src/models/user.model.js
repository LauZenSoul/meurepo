// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/user.model.js

const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_utilizador: {
      type: DataTypes.ENUM("aluno", "tutor", "admin"),
      allowNull: false,
      defaultValue: "aluno",
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  // Hook para hashear a senha antes de salvar o utilizador
  User.beforeCreate(async (user) => {
    if (user.senha_hash) {
      const salt = await bcrypt.genSalt(10);
      user.senha_hash = await bcrypt.hash(user.senha_hash, salt);
    }
  });

  // Método para verificar a senha
  User.prototype.validarSenha = async function (senha) {
    return bcrypt.compare(senha, this.senha_hash);
  };

  return User;
};

