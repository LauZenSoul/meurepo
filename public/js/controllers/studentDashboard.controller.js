class StudentDashboardController {
    constructor() {
        this.service = new StudentDashboardService();
        this.initializeElements();
        this.loadDashboardData();
        this.setupEventListeners();
    }

    initializeElements() {
        // Elementos do cabeçalho
        this.studentNameElement = document.getElementById('student-name');
        this.lastAccessElement = document.getElementById('last-access');

        // Elementos de progresso
        this.gradeElement = document.querySelector('.grade');
        this.attendanceElement = document.querySelector('.percentage');

        // Listas
        this.videoList = document.querySelector('.video-list');
        this.scheduleList = document.querySelector('.schedule');
        this.gradesList = document.querySelector('.grades-list');
        this.noticesList = document.querySelector('.notices-list');
        this.tasksList = document.querySelector('.tasks-list');
        this.subjectsGrid = document.querySelector('.subjects-grid');

        // Filtros
        this.subjectFilter = document.getElementById('subject-filter');
        this.dateFilter = document.getElementById('date-filter');
    }

    async loadDashboardData() {
        try {
            // Carregar dados do estudante
            const studentData = await this.service.getStudentData();
            this.updateStudentInfo(studentData);

            // Carregar progresso acadêmico
            const progressData = await this.service.getAcademicProgress();
            this.updateProgressInfo(progressData);

            // Carregar aulas recentes
            const recentClasses = await this.service.getRecentClasses();
            this.updateRecentClasses(recentClasses);

            // Carregar próximas aulas
            const upcomingClasses = await this.service.getUpcomingClasses();
            this.updateUpcomingClasses(upcomingClasses);

            // Carregar notas recentes
            const recentGrades = await this.service.getRecentGrades();
            this.updateRecentGrades(recentGrades);

            // Carregar avisos
            const notices = await this.service.getImportantNotices();
            this.updateNotices(notices);

            // Carregar tarefas pendentes
            const tasks = await this.service.getPendingTasks();
            this.updateTasks(tasks);

            // Carregar progresso por disciplina
            const subjectsProgress = await this.service.getSubjectsProgress();
            this.updateSubjectsProgress(subjectsProgress);

        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
            // Implementar tratamento de erro adequado
        }
    }

    updateStudentInfo(data) {
        this.studentNameElement.textContent = data.name;
        this.lastAccessElement.textContent = data.lastAccess;
    }

    updateProgressInfo(data) {
        this.gradeElement.textContent = data.averageGrade.toFixed(1);
        this.attendanceElement.textContent = `${data.attendance}%`;
    }

    updateRecentClasses(classes) {
        this.videoList.innerHTML = classes.map(video => `
            <div class="video-item">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <p>${video.subject}</p>
                    <span class="duration">${video.duration}</span>
                </div>
            </div>
        `).join('');
    }

    updateUpcomingClasses(classes) {
        this.scheduleList.innerHTML = classes.map(aula => `
            <div class="schedule-item">
                <div class="schedule-time">${aula.time}</div>
                <div class="schedule-info">
                    <h4>${aula.subject}</h4>
                    <p>${aula.teacher}</p>
                    ${aula.isLive ? '<span class="live-badge">Ao Vivo</span>' : ''}
                </div>
            </div>
        `).join('');
    }

    updateRecentGrades(grades) {
        this.gradesList.innerHTML = grades.map(grade => `
            <div class="grade-item">
                <div class="grade-info">
                    <h4>${grade.subject}</h4>
                    <p>${grade.evaluation}</p>
                </div>
                <div class="grade-value">${grade.value}</div>
            </div>
        `).join('');
    }

    updateNotices(notices) {
        this.noticesList.innerHTML = notices.map(notice => `
            <div class="notice-item ${notice.priority}">
                <div class="notice-icon">
                    <i class="fas ${this.getNoticeIcon(notice.type)}"></i>
                </div>
                <div class="notice-content">
                    <h4>${notice.title}</h4>
                    <p>${notice.message}</p>
                    <span class="notice-date">${notice.date}</span>
                </div>
            </div>
        `).join('');
    }

    updateTasks(tasks) {
        this.tasksList.innerHTML = tasks.map(task => `
            <div class="task-item">
                <div class="task-status">
                    <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-clock'}"></i>
                </div>
                <div class="task-content">
                    <h4>${task.title}</h4>
                    <p>${task.subject}</p>
                    <span class="task-deadline">Prazo: ${task.deadline}</span>
                </div>
            </div>
        `).join('');
    }

    updateSubjectsProgress(subjects) {
        this.subjectsGrid.innerHTML = subjects.map(subject => `
            <div class="subject-card">
                <h3>${subject.name}</h3>
                <div class="subject-progress">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${subject.progress}%">
                            ${subject.progress}%
                        </div>
                    </div>
                </div>
                <div class="subject-stats">
                    <div class="stat">
                        <span class="label">Média</span>
                        <span class="value">${subject.average}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Presença</span>
                        <span class="value">${subject.attendance}%</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getNoticeIcon(type) {
        const icons = {
            'info': 'fa-info-circle',
            'warning': 'fa-exclamation-triangle',
            'success': 'fa-check-circle',
            'deadline': 'fa-calendar-alt'
        };
        return icons[type] || 'fa-bell';
    }

    setupEventListeners() {
        // Filtros de tarefas
        this.subjectFilter.addEventListener('change', () => this.filterTasks());
        this.dateFilter.addEventListener('change', () => this.filterTasks());

        // Botão continuar assistindo
        const btnContinue = document.querySelector('.btn-continue');
        if (btnContinue) {
            btnContinue.addEventListener('click', () => this.continueLastClass());
        }
    }

    async filterTasks() {
        const subject = this.subjectFilter.value;
        const date = this.dateFilter.value;
        const filteredTasks = await this.service.getFilteredTasks(subject, date);
        this.updateTasks(filteredTasks);
    }

    async continueLastClass() {
        const lastClass = await this.service.getLastWatchedClass();
        if (lastClass && lastClass.videoUrl) {
            window.location.href = lastClass.videoUrl;
        }
    }
}

// Inicializar o controller quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new StudentDashboardController();
}); 