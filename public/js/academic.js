// Gestão de Seções Acadêmicas
function showSection(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('.academic-section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostra a seção selecionada
    const selectedSection = document.getElementById(`${sectionId}-section`);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

// Gestão de Cursos
function openNewCourseModal() {
    // Implementar abertura do modal de novo curso
    showNotification('Abrindo formulário de novo curso...', 'info');
}

function editCourse(courseId) {
    // Implementar edição de curso
    showNotification('Carregando dados do curso...', 'info');
}

function manageDisciplines(courseId) {
    // Implementar gestão de disciplinas
    showNotification('Carregando disciplinas do curso...', 'info');
}

function manageClasses(courseId) {
    // Implementar gestão de turmas
    showNotification('Carregando turmas do curso...', 'info');
}

function deleteCourse(courseId) {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
        // Implementar exclusão de curso
        showNotification('Curso excluído com sucesso!', 'success');
    }
}

function exportCourses() {
    // Implementar exportação de cursos
    showNotification('Exportando lista de cursos...', 'info');
    setTimeout(() => {
        showNotification('Lista de cursos exportada com sucesso!', 'success');
    }, 1500);
}

// Gestão de Modais
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Funções para Professores
function openNewProfessorModal() {
    openModal('professorModal');
}

function saveProfessor() {
    // Implementar lógica de salvamento
    showNotification('Professor salvo com sucesso!', 'success');
    closeModal('professorModal');
}

function editProfessor(id) {
    openModal('professorModal');
    // Carregar dados do professor
    showNotification('Carregando dados do professor...', 'info');
}

function deleteProfessor(id) {
    if (confirm('Tem certeza que deseja excluir este professor?')) {
        // Implementar exclusão
        showNotification('Professor excluído com sucesso!', 'success');
    }
}

function viewProfessorDetails(id) {
    // Implementar visualização detalhada
    showNotification('Carregando detalhes do professor...', 'info');
}

// Funções para Disciplinas
function openNewSubjectModal() {
    openModal('subjectModal');
}

function saveSubject() {
    // Implementar lógica de salvamento
    showNotification('Disciplina salva com sucesso!', 'success');
    closeModal('subjectModal');
}

function editSubject(id) {
    openModal('subjectModal');
    // Carregar dados da disciplina
    showNotification('Carregando dados da disciplina...', 'info');
}

function deleteSubject(id) {
    if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
        // Implementar exclusão
        showNotification('Disciplina excluída com sucesso!', 'success');
    }
}

// Funções para Turmas
function openNewClassModal() {
    openModal('classModal');
}

function saveClass() {
    // Implementar lógica de salvamento
    showNotification('Turma salva com sucesso!', 'success');
    closeModal('classModal');
}

function editClass(id) {
    openModal('classModal');
    // Carregar dados da turma
    showNotification('Carregando dados da turma...', 'info');
}

function deleteClass(id) {
    if (confirm('Tem certeza que deseja excluir esta turma?')) {
        // Implementar exclusão
        showNotification('Turma excluída com sucesso!', 'success');
    }
}

function manageStudents(id) {
    // Implementar gestão de alunos
    showNotification('Carregando lista de alunos...', 'info');
}

function viewClassDetails(id) {
    // Implementar visualização detalhada
    showNotification('Carregando detalhes da turma...', 'info');
}

// Funções de Utilidade
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    document.body.appendChild(notification);

    // Auto-remove após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);

    // Fechar ao clicar no botão
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar a seção de cursos por padrão
    showSection('courses');

    // Inicializar listeners de eventos
    initializeEventListeners();
});

function initializeEventListeners() {
    // Listeners para cards de acesso rápido
    document.querySelectorAll('.quick-access-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const section = card.getAttribute('onclick').match(/'([^']+)'/)[1];
            showSection(section);
        });
    });

    // Listeners para botões de fechar modal
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    // Fechar modal ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
} 