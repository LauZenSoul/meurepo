// Integração com APIs reais do backend do ITDRA

// Configuração base para requisições API
const API_BASE_URL = 'https://api.itdra.ao'; // URL base da API do backend
const API_VERSION = 'v1';
const API_ENDPOINTS = {
    auth: '/auth',
    students: '/students',
    courses: '/courses',
    centers: '/centers',
    documents: '/documents',
    enrollments: '/enrollments',
    modules: '/modules',
    contents: '/contents',
    progress: '/progress',
    assessments: '/assessments',
    grades: '/grades',
    biometric: '/biometric',
    reports: '/reports'
};

// Classe para gerenciar tokens de autenticação
class AuthManager {
    constructor() {
        this.token = localStorage.getItem('itdra_token');
        this.refreshToken = localStorage.getItem('itdra_refresh_token');
        this.tokenExpiry = localStorage.getItem('itdra_token_expiry');
    }

    isAuthenticated() {
        if (!this.token) return false;
        
        // Verificar se o token expirou
        if (this.tokenExpiry && new Date(this.tokenExpiry) < new Date()) {
            return this.refreshAuthToken();
        }
        
        return true;
    }

    async login(credentials) {
        try {
            const response = await fetch(`${API_BASE_URL}/${API_VERSION}${API_ENDPOINTS.auth}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Falha na autenticação');
            }

            const data = await response.json();
            this.setTokens(data.token, data.refreshToken, data.expiresIn);
            return true;
        } catch (error) {
            console.error('Erro de login:', error);
            return false;
        }
    }

    async refreshAuthToken() {
        if (!this.refreshToken) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/${API_VERSION}${API_ENDPOINTS.auth}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken: this.refreshToken })
            });

            if (!response.ok) {
                this.logout();
                return false;
            }

            const data = await response.json();
            this.setTokens(data.token, data.refreshToken, data.expiresIn);
            return true;
        } catch (error) {
            console.error('Erro ao renovar token:', error);
            this.logout();
            return false;
        }
    }

    setTokens(token, refreshToken, expiresIn) {
        this.token = token;
        this.refreshToken = refreshToken;
        
        // Calcular data de expiração
        const expiryDate = new Date();
        expiryDate.setSeconds(expiryDate.getSeconds() + expiresIn);
        this.tokenExpiry = expiryDate.toISOString();
        
        // Salvar no localStorage
        localStorage.setItem('itdra_token', token);
        localStorage.setItem('itdra_refresh_token', refreshToken);
        localStorage.setItem('itdra_token_expiry', this.tokenExpiry);
    }

    getAuthHeader() {
        return {
            'Authorization': `Bearer ${this.token}`
        };
    }

    logout() {
        this.token = null;
        this.refreshToken = null;
        this.tokenExpiry = null;
        
        localStorage.removeItem('itdra_token');
        localStorage.removeItem('itdra_refresh_token');
        localStorage.removeItem('itdra_token_expiry');
        
        // Redirecionar para página de login
        window.location.href = 'login.html';
    }
}

// Classe base para requisições API
class ApiService {
    constructor() {
        this.authManager = new AuthManager();
    }

    async request(endpoint, method = 'GET', data = null, requiresAuth = true) {
        // Verificar autenticação se necessário
        if (requiresAuth && !this.authManager.isAuthenticated()) {
            throw new Error('Autenticação necessária');
        }

        // Configurar headers
        const headers = {
            'Content-Type': 'application/json'
        };

        // Adicionar token de autenticação se necessário
        if (requiresAuth) {
            Object.assign(headers, this.authManager.getAuthHeader());
        }

        // Configurar opções da requisição
        const options = {
            method,
            headers
        };

        // Adicionar corpo da requisição se necessário
        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            options.body = JSON.stringify(data);
        }

        try {
            // Fazer requisição
            const response = await fetch(`${API_BASE_URL}/${API_VERSION}${endpoint}`, options);

            // Verificar se a resposta foi bem-sucedida
            if (!response.ok) {
                // Verificar se é erro de autenticação
                if (response.status === 401 && requiresAuth) {
                    const refreshed = await this.authManager.refreshAuthToken();
                    if (refreshed) {
                        // Tentar novamente com o novo token
                        return this.request(endpoint, method, data, requiresAuth);
                    } else {
                        this.authManager.logout();
                        throw new Error('Sessão expirada. Por favor, faça login novamente.');
                    }
                }
                
                // Outros erros
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro na requisição');
            }

            // Retornar dados da resposta
            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição ${method} ${endpoint}:`, error);
            throw error;
        }
    }

    // Métodos auxiliares para diferentes tipos de requisições
    async get(endpoint, params = {}, requiresAuth = true) {
        // Adicionar parâmetros à URL
        const url = new URL(`${API_BASE_URL}/${API_VERSION}${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
        return this.request(url.pathname + url.search, 'GET', null, requiresAuth);
    }

    async post(endpoint, data, requiresAuth = true) {
        return this.request(endpoint, 'POST', data, requiresAuth);
    }

    async put(endpoint, data, requiresAuth = true) {
        return this.request(endpoint, 'PUT', data, requiresAuth);
    }

    async patch(endpoint, data, requiresAuth = true) {
        return this.request(endpoint, 'PATCH', data, requiresAuth);
    }

    async delete(endpoint, requiresAuth = true) {
        return this.request(endpoint, 'DELETE', null, requiresAuth);
    }
}

// Serviços específicos para cada entidade
class StudentService extends ApiService {
    async getAll(params = {}) {
        return this.get(API_ENDPOINTS.students, params);
    }
    
    async getById(id) {
        return this.get(`${API_ENDPOINTS.students}/${id}`);
    }
    
    async create(data) {
        return this.post(API_ENDPOINTS.students, data);
    }
    
    async update(id, data) {
        return this.put(`${API_ENDPOINTS.students}/${id}`, data);
    }
    
    async delete(id) {
        return this.delete(`${API_ENDPOINTS.students}/${id}`);
    }
    
    async getProgress(id) {
        return this.get(`${API_ENDPOINTS.students}/${id}/progress`);
    }
    
    async getEnrollments(id) {
        return this.get(`${API_ENDPOINTS.students}/${id}/enrollments`);
    }
    
    async getDocuments(id) {
        return this.get(`${API_ENDPOINTS.students}/${id}/documents`);
    }
}

class CourseService extends ApiService {
    async getAll(params = {}) {
        return this.get(API_ENDPOINTS.courses, params);
    }
    
    async getById(id) {
        return this.get(`${API_ENDPOINTS.courses}/${id}`);
    }
    
    async create(data) {
        return this.post(API_ENDPOINTS.courses, data);
    }
    
    async update(id, data) {
        return this.put(`${API_ENDPOINTS.courses}/${id}`, data);
    }
    
    async delete(id) {
        return this.delete(`${API_ENDPOINTS.courses}/${id}`);
    }
    
    async getModules(id) {
        return this.get(`${API_ENDPOINTS.courses}/${id}/modules`);
    }
    
    async getEnrollments(id, params = {}) {
        return this.get(`${API_ENDPOINTS.courses}/${id}/enrollments`, params);
    }
    
    async getStatistics(id) {
        return this.get(`${API_ENDPOINTS.courses}/${id}/statistics`);
    }
}

class CenterService extends ApiService {
    async getAll(params = {}) {
        return this.get(API_ENDPOINTS.centers, params);
    }
    
    async getById(id) {
        return this.get(`${API_ENDPOINTS.centers}/${id}`);
    }
    
    async create(data) {
        return this.post(API_ENDPOINTS.centers, data);
    }
    
    async update(id, data) {
        return this.put(`${API_ENDPOINTS.centers}/${id}`, data);
    }
    
    async delete(id) {
        return this.delete(`${API_ENDPOINTS.centers}/${id}`);
    }
    
    async getStudents(id, params = {}) {
        return this.get(`${API_ENDPOINTS.centers}/${id}/students`, params);
    }
    
    async getStatistics(id) {
        return this.get(`${API_ENDPOINTS.centers}/${id}/statistics`);
    }
}

class DocumentService extends ApiService {
    async getAll(params = {}) {
        return this.get(API_ENDPOINTS.documents, params);
    }
    
    async getById(id) {
        return this.get(`${API_ENDPOINTS.documents}/${id}`);
    }
    
    async validate(id, validationData) {
        return this.post(`${API_ENDPOINTS.documents}/${id}/validate`, validationData);
    }
    
    async reject(id, rejectionData) {
        return this.post(`${API_ENDPOINTS.documents}/${id}/reject`, rejectionData);
    }
    
    async getPending(params = {}) {
        return this.get(`${API_ENDPOINTS.documents}/pending`, params);
    }
}

class ReportService extends ApiService {
    async getStudentDistribution(params = {}) {
        return this.get(`${API_ENDPOINTS.reports}/student-distribution`, params);
    }
    
    async getCoursePopularity(params = {}) {
        return this.get(`${API_ENDPOINTS.reports}/course-popularity`, params);
    }
    
    async getAcademicPerformance(params = {}) {
        return this.get(`${API_ENDPOINTS.reports}/academic-performance`, params);
    }
    
    async getCenterActivity(params = {}) {
        return this.get(`${API_ENDPOINTS.reports}/center-activity`, params);
    }
    
    async getCompletionRates(params = {}) {
        return this.get(`${API_ENDPOINTS.reports}/completion-rates`, params);
    }
    
    async getCustomReport(reportType, params = {}) {
        return this.get(`${API_ENDPOINTS.reports}/custom/${reportType}`, params);
    }
    
    async exportReport(reportType, format, params = {}) {
        return this.get(`${API_ENDPOINTS.reports}/export/${reportType}/${format}`, params);
    }
}

// Inicializar serviços
const studentService = new StudentService();
const courseService = new CourseService();
const centerService = new CenterService();
const documentService = new DocumentService();
const reportService = new ReportService();

// Função para atualizar o dashboard com dados reais do backend
async function updateDashboardWithRealData() {
    try {
        // Mostrar indicador de carregamento
        document.getElementById('loading-indicator').style.display = 'block';
        
        // Carregar dados de estudantes
        const studentDistribution = await reportService.getStudentDistribution();
        updateStudentStats(studentDistribution);
        
        // Carregar dados de cursos
        const courseData = await courseService.getAll();
        updateCourseStats(courseData);
        
        // Carregar dados de centros
        const centerData = await centerService.getAll();
        updateCenterStats(centerData);
        
        // Carregar dados de desempenho acadêmico
        const academicPerformance = await reportService.getAcademicPerformance();
        updateAcademicPerformanceChart(academicPerformance);
        
        // Carregar dados de popularidade dos cursos
        const coursePopularity = await reportService.getCoursePopularity();
        updateCoursePopularityChart(coursePopularity);
        
        // Carregar atividades recentes
        const recentActivities = await getRecentActivities();
        updateRecentActivities(recentActivities);
        
        // Carregar documentos pendentes
        const pendingDocuments = await documentService.getPending();
        updatePendingDocuments(pendingDocuments);
        
        // Ocultar indicador de carregamento
        document.getElementById('loading-indicator').style.display = 'none';
        
        console.log('Dashboard atualizado com dados reais do backend');
    } catch (error) {
        console.error('Erro ao atualizar dashboard com dados reais:', error);
        
        // Ocultar indicador de carregamento
        document.getElementById('loading-indicator').style.display = 'none';
        
        // Mostrar mensagem de erro
        showErrorMessage('Não foi possível carregar os dados do dashboard. Por favor, tente novamente mais tarde.');
    }
}

// Funções auxiliares para atualizar elementos do dashboard
function updateStudentStats(data) {
    // Atualizar card de estatísticas de estudantes
    document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = data.total.toLocaleString();
    document.querySelector('.stat-card:nth-child(1) .stat-change').innerHTML = 
        `<i class="bi bi-arrow-${data.growth > 0 ? 'up' : 'down'}"></i> ${Math.abs(data.growth)}% <span>desde o mês passado</span>`;
    
    // Atualizar gráfico de distribuição de estudantes
    updateStudentDistributionChart(data.monthlyDistribution);
}

function updateCourseStats(data) {
    // Atualizar card de estatísticas de cursos
    document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = data.total.toLocaleString();
    
    // Atualizar taxa de conclusão se disponível
    if (data.completionRate) {
        document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = `${data.completionRate}%`;
        document.querySelector('.stat-card:nth-child(4) .stat-change').innerHTML = 
            `<i class="bi bi-arrow-${data.completionRateGrowth > 0 ? 'up' : 'down'}"></i> ${Math.abs(data.completionRateGrowth)}% <span>desde o mês passado</span>`;
    }
}

function updateCenterStats(data) {
    // Atualizar card de estatísticas de centros
    document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = data.total.toLocaleString();
    document.querySelector('.stat-card:nth-child(3) .stat-change').innerHTML = 
        `<i class="bi bi-arrow-${data.growth > 0 ? 'up' : 'down'}"></i> ${Math.abs(data.growth)}% <span>desde o mês passado</span>`;
    
    // Atualizar mapa de distribuição geográfica
    updateGeographicDistributionMap(data.geographicDistribution);
}

function updateStudentDistributionChart(data) {
    const chart = Chart.getChart('studentDistributionChart');
    if (chart) {
        // Atualizar dados do gráfico existente
        chart.data.labels = data.labels;
        chart.data.datasets = data.datasets;
        chart.update();
    }
}

function updateCoursePopularityChart(data) {
    const chart = Chart.getChart('coursePopularityChart');
    if (chart) {
        // Atualizar dados do gráfico existente
        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.values;
        chart.update();
    }
}

function updateAcademicPerformanceChart(data) {
    const chart = Chart.getChart('academicPerformanceChart');
    if (chart) {
        // Atualizar dados do gráfico existente
        chart.data.labels = data.labels;
  
(Content truncated due to size limit. Use line ranges to read in chunks)