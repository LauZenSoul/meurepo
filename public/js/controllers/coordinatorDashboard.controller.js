class CoordinatorDashboardController {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.loadDashboardData();
    }

    initializeElements() {
        // Elementos do cabeçalho
        this.coordinatorNameElement = document.getElementById('coordinator-name');
        this.lastAccessElement = document.getElementById('last-access');

        // Elementos de gestão de alunos
        this.addStudentBtn = document.getElementById('btn-add-student');
        this.importStudentsBtn = document.getElementById('btn-import-students');
        this.studentSearch = document.getElementById('student-search');
        this.classFilter = document.getElementById('class-filter');
        this.courseFilter = document.getElementById('course-filter');
        this.studentsList = document.querySelector('.students-list');

        // Elementos de gestão de notas
        this.subjectFilter = document.getElementById('subject-filter');
        this.periodFilter = document.getElementById('period-filter');
        this.gradesTable = document.querySelector('.grades-table');

        // Elementos de relatórios
        this.reportButtons = document.querySelectorAll('.report-item .btn-view');

        // Elementos de avisos
        this.newAnnouncementBtn = document.getElementById('btn-new-announcement');
        this.announcementsList = document.querySelector('.announcements-list');

        // Elementos do calendário
        this.addEventBtn = document.getElementById('btn-add-event');
        this.calendarView = document.querySelector('.calendar-view');
    }

    setupEventListeners() {
        // Gestão de alunos
        this.addStudentBtn?.addEventListener('click', () => this.handleAddStudent());
        this.importStudentsBtn?.addEventListener('click', () => this.handleImportStudents());
        this.studentSearch?.addEventListener('input', (e) => this.handleStudentSearch(e));
        this.classFilter?.addEventListener('change', () => this.filterStudents());
        this.courseFilter?.addEventListener('change', () => this.filterStudents());

        // Gestão de notas
        this.subjectFilter?.addEventListener('change', () => this.filterGrades());
        this.periodFilter?.addEventListener('change', () => this.filterGrades());

        // Relatórios
        this.reportButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleViewReport(e));
        });

        // Avisos
        this.newAnnouncementBtn?.addEventListener('click', () => this.handleNewAnnouncement());

        // Calendário
        this.addEventBtn?.addEventListener('click', () => this.handleAddEvent());
    }

    async loadDashboardData() {
        try {
            // Carregar dados do coordenador
            const userData = JSON.parse(localStorage.getItem('currentUser'));
            if (userData) {
                this.coordinatorNameElement.textContent = userData.name;
                this.lastAccessElement.textContent = new Date().toLocaleString();
            }

            // Carregar estatísticas gerais
            await this.loadGeneralStats();

            // Carregar lista de alunos
            await this.loadStudents();

            // Carregar notas
            await this.loadGrades();

            // Carregar avisos
            await this.loadAnnouncements();

            // Carregar calendário
            await this.loadCalendar();

        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
            // Implementar tratamento de erro adequado
        }
    }

    async loadGeneralStats() {
        // Simulação de dados estatísticos
        const stats = {
            totalStudents: 150,
            averageGrade: 14.5,
            approvalRate: 85
        };

        // Atualizar elementos na interface
        document.querySelector('.stat-circle .number:nth-child(1)').textContent = stats.totalStudents;
        document.querySelector('.stat-circle .number:nth-child(2)').textContent = stats.averageGrade;
        document.querySelector('.stat-circle .percentage').textContent = stats.approvalRate + '%';
    }

    async loadStudents() {
        // Simulação de lista de alunos
        const students = [
            { id: 1, name: 'João Silva', matricula: 'itdrural1', turma: 'Turma A', curso: 'Agricultura Sustentável' },
            { id: 2, name: 'Maria Santos', matricula: 'itdrural2', turma: 'Turma A', curso: 'Agricultura Sustentável' },
            { id: 3, name: 'Pedro Oliveira', matricula: 'itdrural3', turma: 'Turma B', curso: 'Pecuária Digital' }
        ];

        // Limpar lista atual
        this.studentsList.innerHTML = '';

        // Criar elementos da lista
        students.forEach(student => {
            const studentElement = document.createElement('div');
            studentElement.className = 'student-item';
            studentElement.innerHTML = `
                <h3>${student.name}</h3>
                <p>Matrícula: ${student.matricula}</p>
                <p>Turma: ${student.turma}</p>
                <p>Curso: ${student.curso}</p>
                <div class="actions">
                    <button class="btn-view" onclick="handleViewStudent(${student.id})">
                        <i class="fas fa-eye"></i> Ver Detalhes
                    </button>
                    <button class="btn-edit" onclick="handleEditStudent(${student.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                </div>
            `;
            this.studentsList.appendChild(studentElement);
        });
    }

    async loadGrades() {
        // Simulação de notas
        const grades = [
            { student: 'João Silva', subject: 'Agricultura Sustentável', p1: 15, p2: 16, media: 15.5 },
            { student: 'Maria Santos', subject: 'Agricultura Sustentável', p1: 14, p2: 15, media: 14.5 },
            { student: 'Pedro Oliveira', subject: 'Pecuária Digital', p1: 16, p2: 17, media: 16.5 }
        ];

        // Criar tabela de notas
        this.gradesTable.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Aluno</th>
                        <th>Disciplina</th>
                        <th>P1</th>
                        <th>P2</th>
                        <th>Média</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${grades.map(grade => `
                        <tr>
                            <td>${grade.student}</td>
                            <td>${grade.subject}</td>
                            <td>${grade.p1}</td>
                            <td>${grade.p2}</td>
                            <td>${grade.media}</td>
                            <td>
                                <button class="btn-edit" onclick="handleEditGrade('${grade.student}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    async loadAnnouncements() {
        // Simulação de avisos
        const announcements = [
            { id: 1, title: 'Início do Semestre', date: '2024-03-01', content: 'Bem-vindos ao novo semestre!' },
            { id: 2, title: 'Avaliações P1', date: '2024-03-15', content: 'Calendário de avaliações disponível.' }
        ];

        // Criar lista de avisos
        this.announcementsList.innerHTML = announcements.map(announcement => `
            <div class="announcement-item">
                <h3>${announcement.title}</h3>
                <p class="date">${new Date(announcement.date).toLocaleDateString()}</p>
                <p>${announcement.content}</p>
                <div class="actions">
                    <button class="btn-edit" onclick="handleEditAnnouncement(${announcement.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="handleDeleteAnnouncement(${announcement.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    async loadCalendar() {
        // Implementar integração com biblioteca de calendário
        this.calendarView.innerHTML = '<p>Calendário em desenvolvimento...</p>';
    }

    // Handlers de eventos
    handleAddStudent() {
        // Implementar modal ou navegação para formulário de adição de aluno
        console.log('Adicionar novo aluno');
    }

    handleImportStudents() {
        // Implementar importação de lista de alunos
        console.log('Importar lista de alunos');
    }

    handleStudentSearch(event) {
        // Implementar busca de alunos
        console.log('Buscar:', event.target.value);
    }

    filterStudents() {
        // Implementar filtros de alunos
        console.log('Filtrar alunos');
    }

    filterGrades() {
        // Implementar filtros de notas
        console.log('Filtrar notas');
    }

    handleViewReport(event) {
        // Implementar visualização de relatórios
        const reportType = event.target.closest('.report-item').querySelector('h3').textContent;
        console.log('Ver relatório:', reportType);
    }

    handleNewAnnouncement() {
        // Implementar criação de novo aviso
        console.log('Criar novo aviso');
    }

    handleAddEvent() {
        // Implementar adição de evento no calendário
        console.log('Adicionar evento ao calendário');
    }
}

// Inicializar o controller quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new CoordinatorDashboardController();
}); 