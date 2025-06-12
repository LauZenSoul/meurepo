// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/models/index.js

const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");

// Carregar configuração do banco de dados do config.json
// Certifique-se de que o NODE_ENV está definido (development, test, or production)
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Ler todos os ficheiros de modelo no diretório atual e importá-los
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && // Não é ficheiro oculto
      file !== path.basename(__filename) && // Não é este próprio ficheiro (index.js)
      file.slice(-9) === ".model.js" && // Termina com .model.js
      file.indexOf(".test.js") === -1 // Não é um ficheiro de teste
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associar modelos se o método associate existir
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Instância do Sequelize
db.Sequelize = Sequelize; // Classe Sequelize

module.exports = db;

