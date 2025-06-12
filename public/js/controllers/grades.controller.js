class GradesController {
    constructor() {
        // Verificar autenticação antes de inicializar
        if (!Auth.isUserAuthenticated()) {
            return;
        }

        this.service = new StudentDashboardService();
        this.initializeElements();
        this.loadData();
        this.setupEventListeners();
    }

    initializeElements() {
        // Mostrar container de notas imediatamente
        const gradesContainer = document.querySelector('.grades-container');
        if (gradesContainer) {
            gradesContainer.style.display = 'block';
        }

        // Elementos de informação do aluno
        this.studentNameElement = document.getElementById('student-name');
        this.studentCourseElement = document.getElementById('student-course');
        this.studentYearElement = document.getElementById('student-year');

        // Elementos de filtro
        this.academicYearSelect = document.getElementById('academic-year');
        this.semesterSelect = document.getElementById('semester');

        // Elementos da tabela
        this.gradesTableBody = document.getElementById('grades-body');

        // Elementos de resumo
        this.averageGradeElement = document.getElementById('average-grade');
        this.approvedSubjectsElement = document.getElementById('approved-subjects');
        this.pendingSubjectsElement = document.getElementById('pending-subjects');
    }

    async loadData() {
        try {
            // Carregar dados do aluno
            const studentData = await this.service.getStudentData();
            this.updateStudentInfo(studentData);

            // Carregar anos acadêmicos disponíveis
            const gradesData = await this.service.getGradesData();
            this.populateAcademicYears(gradesData.academicYears);

            // Carregar notas do semestre atual
            await this.loadGrades();
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            // Implementar tratamento de erro adequado
        }
    }

    updateStudentInfo(data) {
        this.studentNameElement.textContent = data.name;
        this.studentCourseElement.textContent = data.course;
        this.studentYearElement.textContent = data.year;
    }

    populateAcademicYears(years) {
        this.academicYearSelect.innerHTML = years.map(year => `
            <option value="${year}">${year}</option>
        `).join('');
    }

    async loadGrades() {
        const year = this.academicYearSelect.value;
        const semester = this.semesterSelect.value;
        
        try {
            const grades = await this.service.getGradesBySemester(year, semester);
            this.updateGradesTable(grades);
            this.updateSummary(grades);
        } catch (error) {
            console.error('Erro ao carregar notas:', error);
            // Implementar tratamento de erro adequado
        }
    }

    updateGradesTable(grades) {
        this.gradesTableBody.innerHTML = grades.map(grade => `
            <tr class="${this.getRowClass(grade.estado)}">
                <td>${new Date().getFullYear()}</td>
                <td>${grade.name}</td>
                <td>${grade.regime}</td>
                <td>${this.formatGrade(grade.p1)}</td>
                <td>${this.formatGrade(grade.p2)}</td>
                <td>${this.formatGrade(grade.p3)}</td>
                <td>${this.formatGrade(grade.media)}</td>
                <td>${grade.obs}</td>
                <td>${grade.resultado}</td>
                <td>${this.formatGrade(grade.esp)}</td>
                <td>${this.formatGrade(grade.rec)}</td>
                <td>${this.formatGrade(grade.nf)}</td>
                <td class="estado ${grade.estado.toLowerCase().replace(' ', '-')}">${grade.estado}</td>
            </tr>
        `).join('');
    }

    updateSummary(grades) {
        // Calcular média geral
        const validGrades = grades.filter(grade => grade.nf !== null);
        const averageGrade = validGrades.reduce((acc, grade) => acc + grade.nf, 0) / validGrades.length;
        
        // Contar aprovações e pendências
        const approved = grades.filter(grade => grade.estado === 'APTO').length;
        const pending = grades.filter(grade => grade.estado === 'NÃO APTO').length;

        // Atualizar elementos
        this.averageGradeElement.textContent = averageGrade.toFixed(1);
        this.approvedSubjectsElement.textContent = approved;
        this.pendingSubjectsElement.textContent = pending;
    }

    formatGrade(grade) {
        return grade !== null ? grade : '-';
    }

    getRowClass(estado) {
        return estado === 'NÃO APTO' ? 'not-approved' : '';
    }

    setupEventListeners() {
        // Listener para mudança de ano acadêmico
        this.academicYearSelect.addEventListener('change', () => this.loadGrades());

        // Listener para mudança de semestre
        this.semesterSelect.addEventListener('change', () => this.loadGrades());
    }
}

// Inicializar o controller quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new GradesController();
}); 