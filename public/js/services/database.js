class TempDatabase {
    constructor() {
        this.initializeDatabase();
    }

    initializeDatabase() {
        // Verificar se já existe dados no localStorage
        if (!localStorage.getItem('db_initialized')) {
            // Dados dos alunos
            const students = [
                {
                    id: '12345',
                    password: 'senha123', // Em produção, isso seria um hash
                    name: 'Ladislau Borges',
                    email: 'ladislau.borges@itdra.ao',
                    course: 'Engenharia Informática',
                    year: '4º Ano',
                    semester: '1º Semestre',
                    lastAccess: null
                },
                {
                    id: '12346',
                    password: 'senha456',
                    name: 'Maria Silva',
                    email: 'maria.silva@itdra.ao',
                    course: 'Enfermagem',
                    year: '3º Ano',
                    semester: '2º Semestre',
                    lastAccess: null
                }
            ];

            // Dados das notas
            const grades = {
                '12345': { // Notas do Ladislau
                    currentYear: [
                        {
                            name: 'Gestão de Projectos Informáticos',
                            regime: '1º Semestre',
                            p1: 11,
                            p2: 13,
                            p3: null,
                            media: 12,
                            obs: 'Exame',
                            resultado: 'Apto',
                            esp: null,
                            rec: null,
                            nf: 11,
                            estado: 'APTO'
                        },
                        {
                            name: 'Noções Fundamentais de Direito',
                            regime: '1º Semestre',
                            p1: 10,
                            p2: 12,
                            p3: null,
                            media: 11,
                            obs: 'Exame',
                            resultado: 'Apto',
                            esp: null,
                            rec: null,
                            nf: 10,
                            estado: 'APTO'
                        },
                        {
                            name: 'Projecto Final I',
                            regime: '1º Semestre',
                            p1: 15,
                            p2: 15,
                            p3: null,
                            media: 15,
                            obs: 'Dispensado',
                            resultado: 'Apto',
                            esp: null,
                            rec: null,
                            nf: 15,
                            estado: 'APTO'
                        }
                    ],
                    academicYears: ['2023/2024', '2022/2023', '2021/2022']
                },
                '12346': { // Notas da Maria
                    currentYear: [
                        {
                            name: 'Anatomia e Fisiologia',
                            regime: '2º Semestre',
                            p1: 15,
                            p2: 16,
                            p3: null,
                            media: 15.5,
                            obs: 'Dispensado',
                            resultado: 'Apto',
                            esp: null,
                            rec: null,
                            nf: 16,
                            estado: 'APTO'
                        },
                        {
                            name: 'Enfermagem Básica',
                            regime: '2º Semestre',
                            p1: 14,
                            p2: 13,
                            p3: null,
                            media: 13.5,
                            obs: 'Exame',
                            resultado: 'Apto',
                            esp: null,
                            rec: null,
                            nf: 14,
                            estado: 'APTO'
                        }
                    ],
                    academicYears: ['2023/2024', '2022/2023']
                }
            };

            // Salvar dados no localStorage
            localStorage.setItem('students', JSON.stringify(students));
            localStorage.setItem('grades', JSON.stringify(grades));
            localStorage.setItem('db_initialized', 'true');
        }
    }

    // Métodos de autenticação
    authenticateStudent(studentId, password) {
        const students = JSON.parse(localStorage.getItem('students'));
        const student = students.find(s => s.id === studentId && s.password === password);
        
        if (student) {
            // Atualizar último acesso
            student.lastAccess = new Date().toISOString();
            this.updateStudent(student);
            return student;
        }
        return null;
    }

    // Métodos de consulta
    getStudent(studentId) {
        const students = JSON.parse(localStorage.getItem('students'));
        return students.find(s => s.id === studentId);
    }

    getStudentGrades(studentId) {
        const grades = JSON.parse(localStorage.getItem('grades'));
        return grades[studentId] || null;
    }

    // Métodos de atualização
    updateStudent(student) {
        const students = JSON.parse(localStorage.getItem('students'));
        const index = students.findIndex(s => s.id === student.id);
        if (index !== -1) {
            students[index] = student;
            localStorage.setItem('students', JSON.stringify(students));
        }
    }

    updateGrades(studentId, grades) {
        const allGrades = JSON.parse(localStorage.getItem('grades'));
        allGrades[studentId] = grades;
        localStorage.setItem('grades', JSON.stringify(allGrades));
    }

    // Método para limpar o banco de dados
    clearDatabase() {
        localStorage.removeItem('students');
        localStorage.removeItem('grades');
        localStorage.removeItem('db_initialized');
    }

    // Método para reinicializar o banco de dados
    resetDatabase() {
        this.clearDatabase();
        this.initializeDatabase();
    }
}

// Exportar uma instância única do banco de dados
window.tempDB = new TempDatabase(); 