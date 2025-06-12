class StudentProgressService {
    constructor() {
        // Simular dados do backend
        this.mockData = {
            currentSemester: {
                number: 3,
                subjects: [
                    {
                        name: 'Enfermagem Médico-Cirúrgica',
                        progress: 75,
                        average: 16.8,
                        status: 'Em Andamento'
                    },
                    {
                        name: 'Saúde Materno-Infantil',
                        progress: 80,
                        average: 17.2,
                        status: 'Em Andamento'
                    },
                    {
                        name: 'Microbiologia e Parasitologia',
                        progress: 65,
                        average: 15.5,
                        status: 'Em Andamento'
                    },
                    {
                        name: 'Ética em Enfermagem',
                        progress: 90,
                        average: 18.0,
                        status: 'Em Andamento'
                    },
                    {
                        name: 'Prática Clínica I',
                        progress: 70,
                        average: 16.0,
                        status: 'Em Andamento'
                    }
                ]
            },
            historical: [
                {
                    number: 1,
                    subjects: [
                        {
                            id: '1_1',
                            name: 'Anatomia e Fisiologia Humana',
                            finalGrade: 17.5,
                            status: 'Aprovado'
                        },
                        {
                            id: '1_2',
                            name: 'Fundamentos de Enfermagem',
                            finalGrade: 16.8,
                            status: 'Aprovado'
                        },
                        {
                            id: '1_3',
                            name: 'Biossegurança em Saúde',
                            finalGrade: 18.0,
                            status: 'Aprovado'
                        },
                        {
                            id: '1_4',
                            name: 'Psicologia em Saúde',
                            finalGrade: 15.5,
                            status: 'Aprovado'
                        },
                        {
                            id: '1_5',
                            name: 'Informática Aplicada à Saúde',
                            finalGrade: 17.0,
                            status: 'Aprovado'
                        }
                    ]
                },
                {
                    number: 2,
                    subjects: [
                        {
                            id: '2_1',
                            name: 'Farmacologia Básica',
                            finalGrade: 16.5,
                            status: 'Aprovado'
                        },
                        {
                            id: '2_2',
                            name: 'Técnicas de Enfermagem',
                            finalGrade: 17.8,
                            status: 'Aprovado'
                        },
                        {
                            id: '2_3',
                            name: 'Saúde Comunitária',
                            finalGrade: 18.2,
                            status: 'Aprovado'
                        },
                        {
                            id: '2_4',
                            name: 'Nutrição e Dietética',
                            finalGrade: 16.0,
                            status: 'Aprovado'
                        },
                        {
                            id: '2_5',
                            name: 'Primeiros Socorros',
                            finalGrade: 17.5,
                            status: 'Aprovado'
                        }
                    ]
                }
            ],
            overallStats: {
                overallProgress: 65,
                completedSubjects: 12,
                averageGrade: 16.5
            }
        };
    }

    async getCurrentSemesterProgress() {
        // Simular chamada à API
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.mockData.currentSemester);
            }, 500);
        });
    }

    async getHistoricalProgress() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.mockData.historical);
            }, 500);
        });
    }

    async getOverallProgress() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.mockData.overallStats);
            }, 500);
        });
    }

    async getSemesterData(semesterNumber) {
        return new Promise(resolve => {
            setTimeout(() => {
                const semester = this.mockData.historical.find(
                    s => s.number === parseInt(semesterNumber)
                ) || this.mockData.historical[0];
                resolve(semester);
            }, 500);
        });
    }

    async getSubjectDetails(subjectId) {
        // Simular detalhes da disciplina
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    id: subjectId,
                    name: 'Nome da Disciplina',
                    professor: 'Nome do Professor',
                    evaluations: [
                        { name: 'Prova 1', grade: 16.5 },
                        { name: 'Prova 2', grade: 17.0 },
                        { name: 'Trabalho Prático', grade: 18.0 }
                    ],
                    attendance: 95,
                    observations: 'Observações sobre o desempenho do aluno'
                });
            }, 500);
        });
    }
} 