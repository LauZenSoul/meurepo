// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/app.js

const express = require("express");
const dotenv = require("dotenv");
const corsMiddleware = require("./middleware/cors.middleware");

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(corsMiddleware); // Usar middleware CORS personalizado
app.use(express.json()); // Para parsing de application/json
app.use(express.urlencoded({ extended: true })); // Para parsing de application/x-www-form-urlencoded

// Rota de teste inicial
app.get("/api", (req, res) => {
  res.json({ message: "Bem-vindo à API do ITDRA!" });
});

// Importar e usar rotas da API
const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");
const documentRoutes = require("./routes/document.routes");
const courseRoutes = require("./routes/course.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const courseModuleRoutes = require("./routes/courseModule.routes");
const moduleContentRoutes = require("./routes/moduleContent.routes");
const studentProgressRoutes = require("./routes/studentProgress.routes");
const assessmentRoutes = require("./routes/assessment.routes");
const gradeRoutes = require("./routes/grade.routes");
const telbandaCenterRoutes = require("./routes/telbandaCenter.routes");
const biometricRoutes = require("./routes/biometric.routes");
const reportRoutes = require("./routes/report.routes");

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/modules", courseModuleRoutes);
app.use("/api/contents", moduleContentRoutes);
app.use("/api/progress", studentProgressRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/centers", telbandaCenterRoutes);
app.use("/api/biometrics", biometricRoutes);
app.use("/api/reports", reportRoutes);

// Tratamento de erros global (middleware de erro)
app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err.message, err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Ocorreu um erro interno no servidor.";
  res.status(statusCode).json({ message });
});

module.exports = app;
