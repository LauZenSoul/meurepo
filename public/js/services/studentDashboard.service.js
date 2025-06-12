class StudentDashboardService {
    constructor() {
        this.currentStudent = JSON.parse(localStorage.getItem('currentStudent'));
    }

    async getStudentData() {
        return new Promise(resolve => {
            setTimeout(() => {
                const student = window.tempDB.getStudent(this.currentStudent.id);
                resolve(student);
            }, 300);
        });
    }

    async getAcademicProgress() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.progress), 300);
        });
    }

    async getRecentClasses() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.recentClasses), 300);
        });
    }

    async getUpcomingClasses() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.upcomingClasses), 300);
        });
    }

    async getRecentGrades() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.recentGrades), 300);
        });
    }

    async getImportantNotices() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.notices), 300);
        });
    }

    async getPendingTasks() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.tasks), 300);
        });
    }

    async getSubjectsProgress() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.subjects), 300);
        });
    }

    async getFilteredTasks(subject, date) {
        return new Promise(resolve => {
            let filteredTasks = [...this.mockData.tasks];

            if (subject) {
                filteredTasks = filteredTasks.filter(task => 
                    task.subject.toLowerCase().includes(subject.toLowerCase())
                );
            }

            if (date) {
                filteredTasks = filteredTasks.filter(task => 
                    new Date(task.deadline) <= new Date(date)
                );
            }

            setTimeout(() => resolve(filteredTasks), 300);
        });
    }

    async getLastWatchedClass() {
        return new Promise(resolve => {
            const lastClass = this.mockData.recentClasses.find(aula => aula.progress < 100);
            setTimeout(() => resolve({
                ...lastClass,
                videoUrl: `/aulas/${lastClass?.title.toLowerCase().replace(/ /g, '-')}`
            }), 300);
        });
    }

    async getGradesData() {
        return new Promise(resolve => {
            setTimeout(() => {
                const grades = window.tempDB.getStudentGrades(this.currentStudent.id);
                resolve(grades);
            }, 300);
        });
    }

    async getGradesByYear(year) {
        return new Promise(resolve => {
            setTimeout(() => {
                const grades = window.tempDB.getStudentGrades(this.currentStudent.id);
                resolve(grades.currentYear); // Por enquanto retorna apenas o ano atual
            }, 300);
        });
    }

    async getGradesBySemester(year, semester) {
        return new Promise(resolve => {
            setTimeout(() => {
                const grades = window.tempDB.getStudentGrades(this.currentStudent.id);
                const filteredGrades = grades.currentYear.filter(
                    grade => grade.regime.includes(semester + 'º Semestre')
                );
                resolve(filteredGrades);
            }, 300);
        });
    }
} 