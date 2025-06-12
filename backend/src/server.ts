import express from 'express';
import cors from 'cors';
import path from 'path';
import { login, getStudentData, getProfessorData, getCoordinatorData, addStudent, addGrade, updateGrade } from './services/auth.service';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../../public')));

// Rota principal - redireciona para o login
app.get('/', (req, res) => {
  res.redirect('/html/login.html');
});

// API Routes
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  const result = login(identifier, password);

  if (result) {
    res.json(result);
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Rotas para estudantes
app.get('/api/students/:userId/progress', (req, res) => {
  const userId = parseInt(req.params.userId);
  const progress = getStudentData(userId);

  if (progress) {
    res.json(progress);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Rotas para professores
app.get('/api/professors/:professorId/dashboard', (req, res) => {
  const professorId = parseInt(req.params.professorId);
  const data = getProfessorData(professorId);

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: 'Professor não encontrado' });
  }
});

// Rotas para coordenador
app.get('/api/coordinator/dashboard', (req, res) => {
  const data = getCoordinatorData();
  res.json(data);
});

app.post('/api/coordinator/students', (req, res) => {
  const { name, email, matricula, turma } = req.body;
  const newStudent = addStudent({ name, email, matricula, turma });
  res.status(201).json(newStudent);
});

app.post('/api/coordinator/grades', (req, res) => {
  const { studentId, courseId, nota, professor } = req.body;
  const newGrade = addGrade({ studentId, courseId, nota, professor });
  res.status(201).json(newGrade);
});

app.put('/api/coordinator/grades/:gradeId', (req, res) => {
  const gradeId = parseInt(req.params.gradeId);
  const { nota } = req.body;
  const updatedGrade = updateGrade(gradeId, nota);

  if (updatedGrade) {
    res.json(updatedGrade);
  } else {
    res.status(404).json({ message: 'Nota não encontrada' });
  }
});

// Rota para lidar com todas as outras requisições - retorna o index.html
app.get('*', (req, res) => {
  if (req.url.startsWith('/api')) {
    res.status(404).json({ message: 'Rota não encontrada' });
  } else {
    res.sendFile(path.join(__dirname, '../../public/html/login.html'));
  }
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('\nUsuários disponíveis para teste:');
  console.log('================================');
  console.log('ESTUDANTES:');
  console.log('- Matrícula: itdrural1 | Email: joao@example.com | Senha: 123456 (João Silva)');
  console.log('- Matrícula: itdrural2 | Email: maria@example.com | Senha: 123456 (Maria Santos)');
  console.log('- Matrícula: itdrural3 | Email: pedro@example.com | Senha: 123456 (Pedro Oliveira)');
  console.log('\nPROFESSOR:');
  console.log('- Matrícula: itdrural4 | Email: ana@example.com | Senha: 123456 (Ana Costa)');
  console.log('\nCOORDENADOR:');
  console.log('- Matrícula: itdrural5 | Email: carlos@example.com | Senha: 123456 (Carlos Ferreira)');
  console.log('\n* Pode usar tanto a matrícula quanto o email para fazer login');
}); 