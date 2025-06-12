// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/controllers/telbandaCenter.controller.js

const telbandaCenterService = require("../../services/telbandaCenter.service");

class TelbandaCenterController {
  async createCenter(req, res, next) {
    try {
      // const adminUserId = req.user.id; // Para verificar permissão
      const centerData = req.body;

      if (req.user.tipo_utilizador !== "admin") {
        return res.status(403).json({ message: "Apenas administradores podem criar centros Telbanda." });
      }
      if (!centerData.nome_centro || !centerData.provincia || !centerData.municipio || !centerData.comuna) {
        return res.status(400).json({ message: "Nome do centro, província, município e comuna são obrigatórios." });
      }
      // Validação opcional de latitude/longitude
      if ((centerData.latitude && typeof centerData.latitude !== 'number') || (centerData.longitude && typeof centerData.longitude !== 'number')) {
        return res.status(400).json({ message: "Latitude e longitude devem ser números, se fornecidos." });
      }

      const newCenter = await telbandaCenterService.createCenter(centerData, req.user.id);
      res.status(201).json({ message: "Centro Telbanda criado com sucesso!", center: newCenter });
    } catch (error) {
      if (error.message.includes("Já existe um centro com o nome")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      next(error);
    }
  }

  async getAllCenters(req, res, next) {
    try {
      // TODO: Passar req.query para filtros no serviço
      const centers = await telbandaCenterService.getAllCenters(req.query);
      res.status(200).json(centers);
    } catch (error) {
      next(error);
    }
  }

  async getCenterById(req, res, next) {
    try {
      const centerId = parseInt(req.params.centerId);
      if (!centerId || isNaN(centerId)) {
        return res.status(400).json({ message: "ID do centro inválido." });
      }
      const center = await telbandaCenterService.getCenterById(centerId);
      if (!center) {
        return res.status(404).json({ message: "Centro Telbanda não encontrado." });
      }
      res.status(200).json(center);
    } catch (error) {
      next(error);
    }
  }

  async updateCenter(req, res, next) {
    try {
      const centerId = parseInt(req.params.centerId);
      const centerData = req.body;
      // const adminUserId = req.user.id;

      if (req.user.tipo_utilizador !== "admin") {
        return res.status(403).json({ message: "Apenas administradores podem atualizar centros Telbanda." });
      }
      if (!centerId || isNaN(centerId)) {
        return res.status(400).json({ message: "ID do centro inválido." });
      }

      const updatedCenter = await telbandaCenterService.updateCenter(centerId, centerData, req.user.id);
      res.status(200).json({ message: "Centro Telbanda atualizado com sucesso!", center: updatedCenter });
    } catch (error) {
      if (error.message.includes("Centro Telbanda não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("Já existe outro centro com este nome")) {
        return res.status(409).json({ message: error.message }); // Conflict
      }
      next(error);
    }
  }

  async deleteCenter(req, res, next) {
    try {
      const centerId = parseInt(req.params.centerId);
      // const adminUserId = req.user.id;

      if (req.user.tipo_utilizador !== "admin") {
        return res.status(403).json({ message: "Apenas administradores podem remover centros Telbanda." });
      }
      if (!centerId || isNaN(centerId)) {
        return res.status(400).json({ message: "ID do centro inválido." });
      }

      const result = await telbandaCenterService.deleteCenter(centerId, req.user.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes("Centro Telbanda não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }
  
  async findNearestCenters(req, res, next) {
    try {
        const { latitude, longitude, raio } = req.query;
        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Latitude e longitude são obrigatórias." });
        }
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        const radiusKm = raio ? parseFloat(raio) : 50; // Raio padrão de 50km se não fornecido

        if (isNaN(lat) || isNaN(lon) || isNaN(radiusKm)) {
            return res.status(400).json({ message: "Latitude, longitude e raio devem ser números válidos." });
        }

        const centers = await telbandaCenterService.findNearestCenters(lat, lon, radiusKm);
        res.status(200).json(centers);
    } catch (error) {
        next(error);
    }
  }
}

module.exports = new TelbandaCenterController();

