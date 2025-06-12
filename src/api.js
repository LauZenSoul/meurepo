// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/frontend-integration/api.js

/**
 * Arquivo de exemplo para integração do frontend com o backend
 * Este arquivo deve ser incluído no frontend para facilitar a comunicação com a API
 */

class ITDRAApi {
  constructor(baseUrl = 'https://api.itdra.ao/api') {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('itdra_token') || null;
  }

  // Método para definir o token de autenticação
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('itdra_token', token);
    } else {
      localStorage.removeItem('itdra_token');
    }
  }

  // Método genérico para fazer chamadas à API
  async fetchApi(endpoint, method = 'GET', data = null, contentType = 'application/json') {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers = {
      'Accept': 'application/json',
    };
    
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    const options = {
      method,
      headers,
      credentials: 'include',
    };
    
    if (data) {
      if (contentType === 'application/json') {
        options.body = JSON.stringify(data);
      } else if (data instanceof FormData) {
        options.body = data;
        // Não definir Content-Type para FormData, o navegador define automaticamente com boundary
        delete headers['Content-Type'];
      }
    }
    
    try {
      const response = await fetch(url, options);
      
      // Para respostas não-JSON (como download de arquivos)
      const contentTypeHeader = response.headers.get('content-type');
      if (contentTypeHeader && !contentTypeHeader.includes('application/json')) {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response; // Retorna a resposta bruta para processamento específico
      }
      
      // Para respostas JSON padrão
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || `Erro ${response.status}: ${response.statusText}`);
      }
      
      return responseData;
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }

  // Métodos de autenticação
  async login(email, password) {
    const data = await this.fetchApi('/auth/login', 'POST', { email, password });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }
  
  async register(userData) {
    return await this.fetchApi('/auth/register', 'POST', userData);
  }
  
  async logout() {
    this.setToken(null);
    return { success: true };
  }
  
  async getProfile() {
    return await this.fetchApi('/auth/profile');
  }
  
  async updateProfile(profileData) {
    return await this.fetchApi('/auth/profile', 'PUT', profileData);
  }

  // Métodos para estudantes
  async getStudents(page = 1, limit = 10) {
    return await this.fetchApi(`/students?page=${page}&limit=${limit}`);
  }
  
  async getStudentById(id) {
    return await this.fetchApi(`/students/${id}`);
  }
  
  async createStudent(studentData) {
    return await this.fetchApi('/students', 'POST', studentData);
  }
  
  async updateStudent(id, studentData) {
    return await this.fetchApi(`/students/${id}`, 'PUT', studentData);
  }
  
  async deleteStudent(id) {
    return await this.fetchApi(`/students/${id}`, 'DELETE');
  }

  // Métodos para documentos
  async uploadDocument(formData) {
    return await this.fetchApi('/documents/upload', 'POST', formData, null);
  }
  
  async getDocumentById(id) {
    return await this.fetchApi(`/documents/${id}`);
  }
  
  async deleteDocument(id) {
    return await this.fetchApi(`/documents/${id}`, 'DELETE');
  }

  // Métodos para cursos
  async getCourses() {
    return await this.fetchApi('/courses');
  }
  
  async getCourseById(id) {
    return await this.fetchApi(`/courses/${id}`);
  }
  
  async createCourse(courseData) {
    return await this.fetchApi('/courses', 'POST', courseData);
  }
  
  async updateCourse(id, courseData) {
    return await this.fetchApi(`/courses/${id}`, 'PUT', courseData);
  }
  
  async deleteCourse(id) {
    return await this.fetchApi(`/courses/${id}`, 'DELETE');
  }

  // Métodos para matrículas
  async getEnrollments() {
    return await this.fetchApi('/enrollments');
  }
  
  async createEnrollment(enrollmentData) {
    return await this.fetchApi('/enrollments', 'POST', enrollmentData);
  }
  
  async updateEnrollment(id, enrollmentData) {
    return await this.fetchApi(`/enrollments/${id}`, 'PUT', enrollmentData);
  }
  
  async cancelEnrollment(id) {
    return await this.fetchApi(`/enrollments/${id}`, 'DELETE');
  }

  // Métodos para módulos e conteúdos
  async getModules() {
    return await this.fetchApi('/modules');
  }
  
  async getModulesByCourse(courseId) {
    return await this.fetchApi(`/modules/course/${courseId}`);
  }
  
  async getContents() {
    return await this.fetchApi('/contents');
  }
  
  async getContentsByModule(moduleId) {
    return await this.fetchApi(`/contents/module/${moduleId}`);
  }

  // Métodos para progresso do estudante
  async getMyProgress(courseId) {
    return await this.fetchApi(`/progress/my-progress/course/${courseId}`);
  }
  
  async updateProgress(progressData) {
    return await this.fetchApi('/progress', 'POST', progressData);
  }

  // Métodos para avaliações e notas
  async getAssessmentsByModule(moduleId) {
    return await this.fetchApi(`/assessments/module/${moduleId}`);
  }
  
  async getMyGrades() {
    return await this.fetchApi('/grades/my-grades');
  }

  // Métodos para centros Telbanda
  async getCenters() {
    return await this.fetchApi('/centers');
  }
  
  async getNearestCenters(latitude, longitude) {
    return await this.fetchApi(`/centers/nearby?lat=${latitude}&lng=${longitude}`);
  }

  // Métodos para biometria
  async registerBiometricData(userId, biometricData) {
    return await this.fetchApi(`/biometrics/register/${userId}`, 'POST', biometricData);
  }
  
  async verifyBiometricData(userId, biometricSample) {
    return await this.fetchApi(`/biometrics/verify/${userId}`, 'POST', { biometricSample });
  }

  // Métodos para relatórios
  async getDashboardReport() {
    return await this.fetchApi('/reports/dashboard');
  }
  
  async getStudentDistributionReport() {
    return await this.fetchApi('/reports/student-distribution');
  }
  
  async getAcademicPerformanceReport(courseId = null) {
    const endpoint = courseId ? `/reports/academic-performance?courseId=${courseId}` : '/reports/academic-performance';
    return await this.fetchApi(endpoint);
  }
  
  async getCoursePopularityReport() {
    return await this.fetchApi('/reports/course-popularity');
  }
  
  async getCenterActivityReport(centerId = null) {
    const endpoint = centerId ? `/reports/center-activity?centerId=${centerId}` : '/reports/center-activity';
    return await this.fetchApi(endpoint);
  }
}

// Exportar a classe para uso no frontend
// Em um ambiente de módulos ES6: export default ITDRAApi;
// Em um ambiente CommonJS: module.exports = ITDRAApi;
// Para uso direto no navegador: window.ITDRAApi = ITDRAApi;

// Exemplo de uso:
/*
const api = new ITDRAApi('http://localhost:3000/api'); // URL de desenvolvimento

// Login
async function login() {
  try {
    const result = await api.login('admin@itdra.ao', 'senha123');
    console.log('Login bem-sucedido:', result);
  } catch (error) {
    console.error('Erro no login:', error.message);
  }
}

// Obter lista de cursos
async function getCourses() {
  try {
    const courses = await api.getCourses();
    console.log('Cursos:', courses);
  } catch (error) {
    console.error('Erro ao obter cursos:', error.message);
  }
}
*/
