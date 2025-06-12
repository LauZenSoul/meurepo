// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/frontend-integration/example-integration.js

/**
 * Exemplo de integração do frontend com o backend do ITDRA
 * Este arquivo demonstra como utilizar a classe ITDRAApi em diferentes frameworks frontend
 */

// ========== EXEMPLO COM JAVASCRIPT VANILLA ==========

// Inicialização da API
const api = new ITDRAApi('https://api.itdra.ao/api'); // URL de produção
// const api = new ITDRAApi('http://localhost:3000/api'); // URL de desenvolvimento

// Exemplo de login
document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageElement = document.getElementById('message');
  
  try {
    messageElement.textContent = 'A autenticar...';
    const result = await api.login(email, password);
    messageElement.textContent = 'Login bem-sucedido!';
    
    // Redirecionar para dashboard após login bem-sucedido
    window.location.href = '/dashboard.html';
  } catch (error) {
    messageElement.textContent = `Erro: ${error.message}`;
  }
});

// Exemplo de carregamento de cursos
async function loadCourses() {
  const coursesContainer = document.getElementById('courses-container');
  coursesContainer.innerHTML = '<p>A carregar cursos...</p>';
  
  try {
    const courses = await api.getCourses();
    
    if (courses.length === 0) {
      coursesContainer.innerHTML = '<p>Nenhum curso disponível.</p>';
      return;
    }
    
    let html = '<ul class="courses-list">';
    courses.forEach(course => {
      html += `
        <li class="course-item">
          <h3>${course.nome_curso}</h3>
          <p>${course.descricao}</p>
          <button onclick="enrollCourse(${course.id})">Inscrever-se</button>
        </li>
      `;
    });
    html += '</ul>';
    
    coursesContainer.innerHTML = html;
  } catch (error) {
    coursesContainer.innerHTML = `<p>Erro ao carregar cursos: ${error.message}</p>`;
  }
}

// Função para inscrição em curso
async function enrollCourse(courseId) {
  try {
    await api.createEnrollment({ curso_id: courseId });
    alert('Inscrição realizada com sucesso!');
    // Atualizar a lista de cursos ou redirecionar
  } catch (error) {
    alert(`Erro na inscrição: ${error.message}`);
  }
}

// ========== EXEMPLO COM REACT ==========

/*
// Componente de Login em React
import React, { useState } from 'react';
import ITDRAApi from './api';

const api = new ITDRAApi('https://api.itdra.ao/api');

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await api.login(email, password);
      setMessage('Login bem-sucedido!');
      // Redirecionar ou atualizar estado da aplicação
      window.location.href = '/dashboard';
    } catch (error) {
      setMessage(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login ITDRA</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'A processar...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
*/

// ========== EXEMPLO COM VUE.JS ==========

/*
<!-- Componente de Login em Vue.js -->
<template>
  <div class="login-container">
    <h2>Login ITDRA</h2>
    <div v-if="message" class="message">{{ message }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'A processar...' : 'Entrar' }}
      </button>
    </form>
  </div>
</template>

<script>
import ITDRAApi from './api';

const api = new ITDRAApi('https://api.itdra.ao/api');

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      loading: false
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.message = '';
      
      try {
        await api.login(this.email, this.password);
        this.message = 'Login bem-sucedido!';
        // Redirecionar ou atualizar estado da aplicação
        this.$router.push('/dashboard');
      } catch (error) {
        this.message = `Erro: ${error.message}`;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
*/

// ========== EXEMPLO DE INTEGRAÇÃO COM RELATÓRIOS ==========

// Função para carregar o dashboard com gráficos usando Chart.js
async function loadDashboard() {
  const dashboardContainer = document.getElementById('dashboard-container');
  dashboardContainer.innerHTML = '<p>A carregar dashboard...</p>';
  
  try {
    const dashboardData = await api.getDashboardReport();
    
    // Limpar container
    dashboardContainer.innerHTML = '';
    
    // Criar elementos para os gráficos
    const studentDistributionElement = document.createElement('div');
    studentDistributionElement.className = 'chart-container';
    studentDistributionElement.innerHTML = '<canvas id="student-distribution-chart"></canvas>';
    
    const coursePopularityElement = document.createElement('div');
    coursePopularityElement.className = 'chart-container';
    coursePopularityElement.innerHTML = '<canvas id="course-popularity-chart"></canvas>';
    
    // Adicionar elementos ao container
    dashboardContainer.appendChild(studentDistributionElement);
    dashboardContainer.appendChild(coursePopularityElement);
    
    // Criar gráficos usando Chart.js (assumindo que Chart.js está incluído)
    if (typeof Chart !== 'undefined') {
      // Gráfico de distribuição de estudantes
      const studentCtx = document.getElementById('student-distribution-chart').getContext('2d');
      new Chart(studentCtx, {
        type: 'bar',
        data: {
          labels: dashboardData.distribuicao_resumida.cursos_populares.map(item => item.Course.nome_curso),
          datasets: [{
            label: 'Número de Estudantes',
            data: dashboardData.distribuicao_resumida.cursos_populares.map(item => item.total_alunos),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Distribuição de Estudantes por Curso'
            }
          }
        }
      });
      
      // Gráfico de popularidade de cursos
      const courseCtx = document.getElementById('course-popularity-chart').getContext('2d');
      new Chart(courseCtx, {
        type: 'pie',
        data: {
          labels: dashboardData.popularidade_cursos.map(item => item.nome_curso),
          datasets: [{
            data: dashboardData.popularidade_cursos.map(item => item.total_matriculas),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Popularidade dos Cursos'
            }
          }
        }
      });
    } else {
      // Fallback se Chart.js não estiver disponível
      dashboardContainer.innerHTML = '<p>Chart.js não está disponível. Não é possível exibir gráficos.</p>';
    }
  } catch (error) {
    dashboardContainer.innerHTML = `<p>Erro ao carregar dashboard: ${error.message}</p>`;
  }
}

// Exemplo de como carregar o dashboard quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se estamos na página do dashboard
  if (window.location.pathname.includes('dashboard')) {
    loadDashboard();
  }
  
  // Verificar se estamos na página de cursos
  if (window.location.pathname.includes('courses')) {
    loadCourses();
  }
});
