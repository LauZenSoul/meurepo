class StudentProgressController {
    constructor() {
        this.service = new StudentProgressService();
        this.initializeElements();
        this.loadData();
        this.setupEventListeners();
    }

    initializeElements() {
        this.progressTable = document.querySelector('.progress-table tbody');
        this.semesterTabs = document.querySelector('.semester-tabs');
        this.semesterContent = document.querySelector('.semester-content');
        this.progressBar = document.querySelector('.progress');
        this.completedSubjects = document.querySelector('.stat-item .number');
        this.averageGrade = document.querySelector('.grade .number');
    }

    async loadData() {
        try {
            // Carregar dados do semestre atual
            const currentSemesterData = await this.service.getCurrentSemesterProgress();
            this.updateCurrentSemester(currentSemesterData);

            // Carregar histórico completo
            const historicalData = await this.service.getHistoricalProgress();
            this.updateHistoricalData(historicalData);

            // Atualizar estatísticas gerais
            const overallStats = await this.service.getOverallProgress();
            this.updateOverallStats(overallStats);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            // Implementar tratamento de erro adequado
        }
    }

    updateCurrentSemester(data) {
        this.progressTable.innerHTML = data.subjects.map(subject => `
            <tr>
                <td>${subject.name}</td>
                <td>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${subject.progress}%">${subject.progress}%</div>
                    </div>
                </td>
                <td>${subject.average}</td>
                <td>
                    <span class="status ${subject.status.toLowerCase()}">${subject.status}</span>
                </td>
            </tr>
        `).join('');
    }

    updateHistoricalData(data) {
        // Criar tabs para cada semestre
        this.semesterTabs.innerHTML = data.map((semester, index) => `
            <button class="semester-tab ${index === 0 ? 'active' : ''}" 
                    data-semester="${semester.number}">
                ${semester.number}º Semestre
            </button>
        `).join('');

        // Mostrar dados do primeiro semestre por padrão
        this.showSemesterData(data[0]);
    }

    showSemesterData(semesterData) {
        this.semesterContent.innerHTML = `
            <div class="semester-details">
                <table class="progress-table">
                    <thead>
                        <tr>
                            <th>Disciplina</th>
                            <th>Nota Final</th>
                            <th>Status</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${semesterData.subjects.map(subject => `
                            <tr>
                                <td>${subject.name}</td>
                                <td>${subject.finalGrade}</td>
                                <td>
                                    <span class="status ${subject.status.toLowerCase()}">
                                        ${subject.status}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn-details" data-subject="${subject.id}">
                                        Ver Detalhes
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    updateOverallStats(stats) {
        this.progressBar.style.width = `${stats.overallProgress}%`;
        this.progressBar.textContent = `${stats.overallProgress}%`;
        this.completedSubjects.textContent = stats.completedSubjects;
        this.averageGrade.textContent = stats.averageGrade.toFixed(1);
    }

    setupEventListeners() {
        // Listener para as tabs de semestre
        this.semesterTabs.addEventListener('click', async (e) => {
            if (e.target.classList.contains('semester-tab')) {
                const semesterNumber = e.target.dataset.semester;
                const semesterData = await this.service.getSemesterData(semesterNumber);
                
                // Atualizar UI
                document.querySelectorAll('.semester-tab').forEach(tab => 
                    tab.classList.remove('active')
                );
                e.target.classList.add('active');
                this.showSemesterData(semesterData);
            }
        });

        // Listener para botões de detalhes
        this.semesterContent.addEventListener('click', async (e) => {
            if (e.target.classList.contains('btn-details')) {
                const subjectId = e.target.dataset.subject;
                const details = await this.service.getSubjectDetails(subjectId);
                this.showSubjectDetails(details);
            }
        });
    }

    showSubjectDetails(details) {
        // Implementar modal ou expandir linha para mostrar detalhes
        console.log('Detalhes da disciplina:', details);
    }
}

// Inicializar o controller quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new StudentProgressController();
}); 