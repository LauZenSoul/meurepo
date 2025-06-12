// Scripts para o Dashboard Administrativo do ITDRA

document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('collapsed');
    });

    // Page navigation
    const navLinks = document.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Hide all pages
            document.querySelectorAll('.content-page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show target page
            document.getElementById(`${targetPage}-page`).classList.add('active');
            
            // Update active state in sidebar
            document.querySelectorAll('.sidebar .list-unstyled li').forEach(item => {
                item.classList.remove('active');
            });
            this.closest('li').classList.add('active');
        });
    });

    // Initialize charts
    initializeCharts();
});

function initializeCharts() {
    // Student Distribution Chart
    const studentDistributionCtx = document.getElementById('studentDistributionChart').getContext('2d');
    const studentDistributionChart = new Chart(studentDistributionCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [
                {
                    label: 'Enfermagem Rural',
                    data: [120, 150, 180, 220, 250, 280, 310, 340, 370, 400, 430, 450],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Agronomia Rural',
                    data: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Administração Rural',
                    data: [80, 95, 110, 125, 140, 155, 170, 185, 200, 215, 230, 245],
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Veterinária Rural',
                    data: [60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Estudantes'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Mês'
                    }
                }
            }
        }
    });

    // Course Popularity Chart
    const coursePopularityCtx = document.getElementById('coursePopularityChart').getContext('2d');
    const coursePopularityChart = new Chart(coursePopularityCtx, {
        type: 'doughnut',
        data: {
            labels: ['Enfermagem Rural', 'Agronomia Rural', 'Administração Rural', 'Veterinária Rural'],
            datasets: [{
                data: [450, 320, 245, 225],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f39c12',
                    '#e74c3c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });

    // Academic Performance Chart
    const academicPerformanceCtx = document.getElementById('academicPerformanceChart').getContext('2d');
    const academicPerformanceChart = new Chart(academicPerformanceCtx, {
        type: 'bar',
        data: {
            labels: ['Enfermagem', 'Agronomia', 'Administração', 'Veterinária'],
            datasets: [{
                label: 'Nota Média',
                data: [78, 82, 75, 80],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(243, 156, 18, 0.7)',
                    'rgba(231, 76, 60, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(243, 156, 18, 1)',
                    'rgba(231, 76, 60, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Nota Média (%)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Simulação de dados para integração com backend
const apiEndpoints = {
    students: '/api/students',
    courses: '/api/courses',
    centers: '/api/centers',
    documents: '/api/documents',
    enrollments: '/api/enrollments',
    reports: '/api/reports'
};

// Função para carregar dados do backend (simulação)
async function fetchData(endpoint, params = {}) {
    // Em um ambiente real, isso seria uma chamada fetch() para o backend
    console.log(`Fetching data from ${endpoint} with params:`, params);
    
    // Simulação de resposta
    return new Promise(resolve => {
        setTimeout(() => {
            // Dados simulados baseados no endpoint
            let data;
            
            switch(endpoint) {
                case apiEndpoints.students:
                    data = {
                        total: 2845,
                        active: 2700,
                        pending: 145,
                        growth: 12,
                        distribution: {
                            'Enfermagem Rural': 850,
                            'Agronomia Rural': 720,
                            'Administração Rural': 650,
                            'Veterinária Rural': 625
                        }
                    };
                    break;
                    
                case apiEndpoints.courses:
                    data = {
                        total: 4,
                        active: 4,
                        popularity: {
                            'Enfermagem Rural': 30,
                            'Agronomia Rural': 25,
                            'Administração Rural': 23,
                            'Veterinária Rural': 22
                        },
                        performance: {
                            'Enfermagem Rural': 78,
                            'Agronomia Rural': 82,
                            'Administração Rural': 75,
                            'Veterinária Rural': 80
                        }
                    };
                    break;
                    
                case apiEndpoints.centers:
                    data = {
                        total: 100,
                        active: 100,
                        distribution: {
                            'Bengo': 25,
                            'Luanda - Cacuaco': 30,
                            'Luanda - Funda': 25,
                            'Malanje': 20
                        }
                    };
                    break;
                    
                case apiEndpoints.documents:
                    data = {
                        total: 3200,
                        pending: 145,
                        validated: 3055,
                        types: {
                            'Bilhete de Identidade': 1600,
                            'Certificado de Ensino de Base': 1600
                        }
                    };
                    break;
                    
                default:
                    data = { message: 'Endpoint não encontrado' };
            }
            
            resolve(data);
        }, 500); // Simula um atraso de rede
    });
}

// Função para atualizar o dashboard com dados do backend
async function updateDashboard() {
    try {
        // Carregar dados de estudantes
        const studentData = await fetchData(apiEndpoints.students);
        document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = studentData.total.toLocaleString();
        document.querySelector('.stat-card:nth-child(1) .stat-change').innerHTML = 
            `<i class="bi bi-arrow-up"></i> ${studentData.growth}% <span>desde o mês passado</span>`;
            
        // Carregar dados de cursos
        const courseData = await fetchData(apiEndpoints.courses);
        document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = courseData.active.toLocaleString();
        
        // Carregar dados de centros
        const centerData = await fetchData(apiEndpoints.centers);
        document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = centerData.active.toLocaleString();
        
        // Atualizar gráficos com dados reais
        // Isso seria implementado em um ambiente real
        
        console.log('Dashboard atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar dashboard:', error);
    }
}

// Funções para gestão de estudantes
const studentManagement = {
    getAll: async function(filters = {}) {
        return await fetchData(apiEndpoints.students, filters);
    },
    
    getById: async function(id) {
        return await fetchData(`${apiEndpoints.students}/${id}`);
    },
    
    create: async function(studentData) {
        console.log('Criando novo estudante:', studentData);
        // Simulação de criação bem-sucedida
        return { success: true, message: 'Estudante criado com sucesso', id: Date.now() };
    },
    
    update: async function(id, studentData) {
        console.log(`Atualizando estudante ${id}:`, studentData);
        // Simulação de atualização bem-sucedida
        return { success: true, message: 'Estudante atualizado com sucesso' };
    },
    
    delete: async function(id) {
        console.log(`Excluindo estudante ${id}`);
        // Simulação de exclusão bem-sucedida
        return { success: true, message: 'Estudante excluído com sucesso' };
    }
};

// Funções para gestão de cursos
const courseManagement = {
    getAll: async function(filters = {}) {
        return await fetchData(apiEndpoints.courses, filters);
    },
    
    getById: async function(id) {
        return await fetchData(`${apiEndpoints.courses}/${id}`);
    },
    
    create: async function(courseData) {
        console.log('Criando novo curso:', courseData);
        // Simulação de criação bem-sucedida
        return { success: true, message: 'Curso criado com sucesso', id: Date.now() };
    },
    
    update: async function(id, courseData) {
        console.log(`Atualizando curso ${id}:`, courseData);
        // Simulação de atualização bem-sucedida
        return { success: true, message: 'Curso atualizado com sucesso' };
    },
    
    delete: async function(id) {
        console.log(`Excluindo curso ${id}`);
        // Simulação de exclusão bem-sucedida
        return { success: true, message: 'Curso excluído com sucesso' };
    }
};

// Funções para gestão de documentos
const documentManagement = {
    getAll: async function(filters = {}) {
        return await fetchData(apiEndpoints.documents, filters);
    },
    
    getById: async function(id) {
        return await fetchData(`${apiEndpoints.documents}/${id}`);
    },
    
    validate: async function(id) {
        console.log(`Validando documento ${id}`);
        // Simulação de validação bem-sucedida
        return { success: true, message: 'Documento validado com sucesso' };
    },
    
    reject: async function(id, reason) {
        console.log(`Rejeitando documento ${id}. Motivo: ${reason}`);
        // Simulação de rejeição bem-sucedida
        return { success: true, message: 'Documento rejeitado com sucesso' };
    }
};

// Inicializar dashboard quando a página carregar completamente
window.addEventListener('load', function() {
    // Atualizar dashboard com dados do backend
    updateDashboard();
    
    // Configurar atualizações periódicas (a cada 5 minutos)
    setInterval(updateDashboard, 5 * 60 * 1000);
});
