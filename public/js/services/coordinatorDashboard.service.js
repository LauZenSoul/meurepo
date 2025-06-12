class CoordinatorDashboardService {
    constructor() {
        this.apiBaseUrl = '/api';
    }

    async getGeneralStats() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/stats`);
            if (!response.ok) throw new Error('Falha ao carregar estatísticas');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
            return null;
        }
    }

    async getStudents(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`${this.apiBaseUrl}/coordinator/students?${queryParams}`);
            if (!response.ok) throw new Error('Falha ao carregar alunos');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar alunos:', error);
            return [];
        }
    }

    async addStudent(studentData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });
            if (!response.ok) throw new Error('Falha ao adicionar aluno');
            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar aluno:', error);
            throw error;
        }
    }

    async updateStudent(studentId, studentData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/students/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });
            if (!response.ok) throw new Error('Falha ao atualizar aluno');
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar aluno:', error);
            throw error;
        }
    }

    async getGrades(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`${this.apiBaseUrl}/coordinator/grades?${queryParams}`);
            if (!response.ok) throw new Error('Falha ao carregar notas');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar notas:', error);
            return [];
        }
    }

    async updateGrade(gradeId, gradeData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/grades/${gradeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gradeData)
            });
            if (!response.ok) throw new Error('Falha ao atualizar nota');
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar nota:', error);
            throw error;
        }
    }

    async getAnnouncements() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/announcements`);
            if (!response.ok) throw new Error('Falha ao carregar avisos');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar avisos:', error);
            return [];
        }
    }

    async addAnnouncement(announcementData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/announcements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(announcementData)
            });
            if (!response.ok) throw new Error('Falha ao adicionar aviso');
            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar aviso:', error);
            throw error;
        }
    }

    async updateAnnouncement(announcementId, announcementData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/announcements/${announcementId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(announcementData)
            });
            if (!response.ok) throw new Error('Falha ao atualizar aviso');
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar aviso:', error);
            throw error;
        }
    }

    async deleteAnnouncement(announcementId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/announcements/${announcementId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Falha ao deletar aviso');
            return true;
        } catch (error) {
            console.error('Erro ao deletar aviso:', error);
            throw error;
        }
    }

    async getCalendarEvents(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`${this.apiBaseUrl}/coordinator/calendar?${queryParams}`);
            if (!response.ok) throw new Error('Falha ao carregar eventos do calendário');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar eventos do calendário:', error);
            return [];
        }
    }

    async addCalendarEvent(eventData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/calendar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            if (!response.ok) throw new Error('Falha ao adicionar evento ao calendário');
            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar evento ao calendário:', error);
            throw error;
        }
    }

    async updateCalendarEvent(eventId, eventData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/calendar/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            if (!response.ok) throw new Error('Falha ao atualizar evento do calendário');
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar evento do calendário:', error);
            throw error;
        }
    }

    async deleteCalendarEvent(eventId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/coordinator/calendar/${eventId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Falha ao deletar evento do calendário');
            return true;
        } catch (error) {
            console.error('Erro ao deletar evento do calendário:', error);
            throw error;
        }
    }

    async generateReport(reportType, filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`${this.apiBaseUrl}/coordinator/reports/${reportType}?${queryParams}`);
            if (!response.ok) throw new Error('Falha ao gerar relatório');
            return await response.json();
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            throw error;
        }
    }
}

// Exportar uma instância única do serviço
window.coordinatorDashboardService = new CoordinatorDashboardService(); 