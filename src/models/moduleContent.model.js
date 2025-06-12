// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/moduleContent.model.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ModuleContent = sequelize.define("ModuleContent", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // modulo_id será adicionado automaticamente pela associação com CourseModule
    tipo_conteudo: {
      type: DataTypes.ENUM("Texto", "Video", "PDF", "LinkExterno", "Quiz"),
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao_curta: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    conteudo_texto: { // Para tipo "Texto"
        type: DataTypes.TEXT('long'), // Usar TEXT longo para HTML ou Markdown
        allowNull: true,
    },
    url_recurso: { // Para tipo "Video", "PDF", "LinkExterno"
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    ordem: { // Ordem do conteúdo dentro do módulo
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  ModuleContent.associate = (models) => {
    // Um conteúdo pertence a um módulo de curso
    ModuleContent.belongsTo(models.CourseModule, {
      foreignKey: {
        name: "modulo_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    // Um conteúdo pode ter vários progressos de aluno
    ModuleContent.hasMany(models.StudentProgress, {
        foreignKey: "conteudo_id",
    });
  };

  return ModuleContent;
};

