// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/document.model.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Document = sequelize.define("Document", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // aluno_id será adicionado automaticamente pela associação com Student
    tipo_documento: {
      type: DataTypes.ENUM("BI", "CertificadoEnsinoBase", "Outro"),
      allowNull: false,
    },
    caminho_ficheiro: {
      type: DataTypes.STRING,
      allowNull: false, // O caminho onde o ficheiro está armazenado no servidor
    },
    nome_original_ficheiro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_mime_ficheiro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tamanho_ficheiro_bytes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado_validacao: {
      type: DataTypes.ENUM("Pendente", "Validado", "Rejeitado"),
      allowNull: false,
      defaultValue: "Pendente",
    },
    observacoes_validacao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    data_upload: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    data_validacao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // Adicionar campos de timestamp (createdAt, updatedAt) automaticamente pelo Sequelize
  });

  Document.associate = (models) => {
    // Um documento pertence a um estudante
    Document.belongsTo(models.Student, {
      foreignKey: {
        name: "aluno_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Document;
};

