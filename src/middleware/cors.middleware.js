// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/api/middlewares/cors.middleware.js

/**
 * Middleware para configuração avançada de CORS para integração frontend-backend
 */
const corsMiddleware = (req, res, next) => {
  // Configurar origens permitidas
  // Em produção, substituir por domínios específicos do frontend
  const allowedOrigins = [
    'https://itdra.ao',                // Domínio principal de produção
    'https://www.itdra.ao',            // Subdomínio www
    'https://admin.itdra.ao',          // Subdomínio para administração
    'http://localhost:3000',           // Desenvolvimento local
    'http://localhost:8080',           // Desenvolvimento local alternativo
    'https://jgvghrbh.manus.space'     // URL temporária atual
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // Métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Cabeçalhos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  // Permitir credenciais (cookies, etc.)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Tempo de cache para preflight requests
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 horas
  
  // Lidar com preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  next();
};

module.exports = corsMiddleware;
