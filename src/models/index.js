const { Sequelize } = require("sequelize");
const config = require("../config/config.json");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false, // Desativar logs SQL em produção
  }
);

// Importar modelos
const User = require("./user.model")(sequelize);
const Student = require("./student.model")(sequelize);
const Document = require("./document.model")(sequelize);
const Course = require("./course.model")(sequelize);
const Enrollment = require("./enrollment.model")(sequelize);
const CourseModule = require("./courseModule.model")(sequelize);
const ModuleContent = require("./moduleContent.model")(sequelize);
const StudentProgress = require("./studentProgress.model")(sequelize);
const Assessment = require("./assessment.model")(sequelize);
const Grade = require("./grade.model")(sequelize);
const TelbandaCenter = require("./telbandaCenter.model")(sequelize);
const BiometricData = require("./biometricData.model")(sequelize);

// Definir associações entre modelos
// ... (adicionar associações conforme necessário)

// Exportar modelos e instância do Sequelize
module.exports = {
  sequelize,
  User,
  Student,
  Document,
  Course,
  Enrollment,
  CourseModule,
  ModuleContent,
  StudentProgress,
  Assessment,
  Grade,
  TelbandaCenter,
  BiometricData,
}; 