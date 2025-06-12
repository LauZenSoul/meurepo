// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/report.controller.js

const reportService = require("../../services/report.service");

class ReportController {
  // 1. Relatório de distribuição de estudantes por curso e centro
  async getStudentDistributionReport(req, res, next) {
    try {
      // Verificar permissões - apenas admin e tutores podem aceder a relatórios
      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Acesso negado. Apenas administradores e tutores podem aceder a relatórios." });
      }

      const report = await reportService.getStudentDistributionReport();
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  // 2. Relatório de desempenho académico
  async getAcademicPerformanceReport(req, res, next) {
    try {
      // Verificar permissões
      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Acesso negado. Apenas administradores e tutores podem aceder a relatórios." });
      }

      const courseId = req.query.courseId ? parseInt(req.query.courseId) : null;
      if (req.query.courseId && isNaN(courseId)) {
        return res.status(400).json({ message: "ID do curso inválido." });
      }

      const report = await reportService.getAcademicPerformanceReport(courseId);
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  // 3. Relatório de popularidade de cursos
  async getCoursePopularityReport(req, res, next) {
    try {
      // Verificar permissões
      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Acesso negado. Apenas administradores e tutores podem aceder a relatórios." });
      }

      const report = await reportService.getCoursePopularityReport();
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  // 4. Relatório de atividade dos centros Telbanda
  async getCenterActivityReport(req, res, next) {
    try {
      // Verificar permissões
      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Acesso negado. Apenas administradores e tutores podem aceder a relatórios." });
      }

      const centerId = req.query.centerId ? parseInt(req.query.centerId) : null;
      if (req.query.centerId && isNaN(centerId)) {
        return res.status(400).json({ message: "ID do centro inválido." });
      }

      const report = await reportService.getCenterActivityReport(centerId);
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  // Relatório geral que combina todos os relatórios para dashboard
  async getDashboardReport(req, res, next) {
    try {
      // Verificar permissões
      if (req.user.tipo_utilizador !== "admin" && req.user.tipo_utilizador !== "tutor") {
        return res.status(403).json({ message: "Acesso negado. Apenas administradores e tutores podem aceder a relatórios." });
      }

      // Obter dados resumidos de todos os relatórios
      const [studentDistribution, academicPerformance, coursePopularity, centerActivity] = await Promise.all([
        reportService.getStudentDistributionReport(),
        reportService.getAcademicPerformanceReport(),
        reportService.getCoursePopularityReport(),
        reportService.getCenterActivityReport()
      ]);

      // Construir um relatório de dashboard com os dados mais relevantes
      const dashboardReport = {
        total_alunos: studentDistribution.total_alunos,
        distribuicao_resumida: {
          cursos_populares: studentDistribution.distribuicao_por_curso.slice(0, 5), // Top 5 cursos
          centros_populares: studentDistribution.distribuicao_por_centro.slice(0, 5) // Top 5 centros
        },
        desempenho_resumido: {
          medias_por_curso: academicPerformance.medias_por_curso,
          taxas_aprovacao_destacadas: academicPerformance.taxas_aprovacao.slice(0, 5) // Top 5 avaliações
        },
        popularidade_cursos: coursePopularity.popularidade_cursos.slice(0, 5), // Top 5 cursos populares
        atividade_centros: centerActivity.atividade_centros.slice(0, 5) // Top 5 centros ativos
      };

      res.status(200).json(dashboardReport);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReportController();
