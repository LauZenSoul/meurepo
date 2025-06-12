import database from '../data/database.json';

export const login = (identifier: string, password: string): any => {
  // Buscar usuário por email ou matrícula
  const user = database.users.find((u: any) => 
    (u.email === identifier || u.matricula === identifier) && u.password === password
  );
  
  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  
  switch (user.role) {
    case 'student':
      return {
        user: userWithoutPassword,
        redirectTo: '/html/progresso-estudante.html',
        data: getStudentData(user.id)
      };
    
    case 'professor':
      return {
        user: userWithoutPassword,
        redirectTo: '/html/professor-dashboard.html',
        data: getProfessorData(user.id)
      };
    
    case 'coordinator':
      return {
        user: userWithoutPassword,
        redirectTo: '/html/coordinator-dashboard.html',
        data: getCoordinatorData()
      };
    
    default:
      return null;
  }
};

export const getStudentData = (studentId: number): any => {
  const user = database.users.find((u: any) => u.id === studentId && u.role === 'student');
  
  if (!user || !user.enrollments) {
    return null;
  }

  const userCourses = user.enrollments.map((enrollment: any) => {
    const courseInfo = database.courses.find((c: any) => c.id === enrollment.courseId);
    const grades = database.grades.filter((g: any) => g.studentId === studentId && g.courseId === enrollment.courseId);
    
    return {
      courseInfo: courseInfo,
      progress: enrollment.progress,
      lastAccess: enrollment.lastAccess,
      status: enrollment.status,
      grades: grades
    };
  });

  const { password: _, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    courses: userCourses
  };
};

export const getProfessorData = (professorId: number): any => {
  const professor = database.users.find((u: any) => u.id === professorId && u.role === 'professor');
  
  if (!professor || !professor.disciplinas) {
    return null;
  }

  // Buscar cursos que o professor leciona
  const professorCourses = database.courses.filter((c: any) => 
    professor.disciplinas?.includes(c.title)
  );

  // Buscar turmas do professor
  const professorTurmas = database.turmas.filter((t: any) => 
    professor.turmas?.includes(t.nome)
  );

  // Buscar alunos das turmas
  const students = database.users.filter((u: any) => 
    u.role === 'student' && professor.turmas?.includes(u.turma || '')
  );

  return {
    professor: { ...professor, password: undefined },
    courses: professorCourses,
    turmas: professorTurmas,
    students: students.map((s: any) => ({ ...s, password: undefined }))
  };
};

export const getCoordinatorData = (): any => {
  const allStudents = database.users.filter((u: any) => u.role === 'student');
  const allCourses = database.courses;
  const allTurmas = database.turmas;
  const allGrades = database.grades;

  return {
    students: allStudents.map((s: any) => ({ ...s, password: undefined })),
    courses: allCourses,
    turmas: allTurmas,
    grades: allGrades,
    statistics: {
      totalStudents: allStudents.length,
      totalCourses: allCourses.length,
      totalTurmas: allTurmas.length
    }
  };
};

export const addStudent = (studentData: any): any => {
  const newId = Math.max(...database.users.map((u: any) => u.id)) + 1;
  
  const newStudent = {
    id: newId,
    name: studentData.name,
    email: studentData.email,
    matricula: studentData.matricula,
    password: '123456',
    role: 'student',
    turma: studentData.turma,
    enrollments: []
  };

  return newStudent;
};

export const addGrade = (gradeData: any): any => {
  const newId = Math.max(...database.grades.map((g: any) => g.id)) + 1;
  
  const newGrade = {
    id: newId,
    studentId: gradeData.studentId,
    courseId: gradeData.courseId,
    nota: gradeData.nota,
    data: new Date().toISOString().split('T')[0],
    professor: gradeData.professor
  };

  return newGrade;
};

export const updateGrade = (gradeId: number, newNota: number): any => {
  const grade = database.grades.find((g: any) => g.id === gradeId);
  
  if (grade) {
    return { ...grade, nota: newNota };
  }
  
  return null;
}; 