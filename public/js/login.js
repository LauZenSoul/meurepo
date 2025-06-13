document.addEventListener('DOMContentLoaded', () => {
    // Credenciais de teste
    const testCredentials = {
        aluno: {
            email: 'aluno@itdra.com',
            senha: 'aluno123'
        },
        professor: {
            email: 'professor@itdra.com',
            senha: 'prof123'
        },
        admin: {
            email: 'admin@itdra.com',
            senha: 'admin123'
        },
        coordenador: {
            email: 'coordenador@itdra.com',
            senha: 'coord123'
        }
    };

    // Elementos do modal
    const modal = document.getElementById('loginModal');
    const togglePasswordBtn = document.querySelector('.toggle-password');

    // Mostrar/ocultar senha
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const input = togglePasswordBtn.previousElementSibling;
            const icon = togglePasswordBtn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // Gerenciar formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const lembrar = document.getElementById('lembrar').checked;

            // Verificar credenciais de teste
            let userType = null;
            if (email === testCredentials.aluno.email && senha === testCredentials.aluno.senha) {
                userType = 'aluno';
            } else if (email === testCredentials.professor.email && senha === testCredentials.professor.senha) {
                userType = 'professor';
            } else if (email === testCredentials.admin.email && senha === testCredentials.admin.senha) {
                userType = 'admin';
            } else if (email === testCredentials.coordenador.email && senha === testCredentials.coordenador.senha) {
                userType = 'coordenador';
            }

            if (userType) {
                // Simular token
                const token = 'test-token-' + userType;

                // Armazenar dados
                if (lembrar) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('userType', userType);
                } else {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('userType', userType);
                }

                // Detectar se estamos na raiz ou na pasta public/html
                const isRoot = window.location.pathname.endsWith('index.html');
                const basePath = isRoot ? 'public/html/' : '';
                
                // Redirecionar baseado no tipo de usuário
                switch (userType) {
                    case 'aluno':
                        window.location.href = basePath + 'dashboard-aluno.html';
                        break;
                    case 'professor':
                        window.location.href = basePath + 'professor-dashboard.html';
                        break;
                    case 'admin':
                        window.location.href = basePath + 'dashboard-admin.html';
                        break;
                    case 'coordenador':
                        window.location.href = basePath + 'coordinator-dashboard.html';
                        break;
                }
            } else {
                showError('Credenciais inválidas');
            }
        });
    }

    // Funções auxiliares para mostrar mensagens
    function showError(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.textContent = message;
        insertAlert(alert);
    }

    function insertAlert(alert) {
        const modalContent = document.querySelector('.modal-content');
        const existingAlert = modalContent.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        modalContent.insertBefore(alert, modalContent.firstChild);
        setTimeout(() => alert.remove(), 5000);
    }
}); 