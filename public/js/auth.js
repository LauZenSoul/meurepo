class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.checkAuthentication();
        this.setupEventListeners();
    }

    checkAuthentication() {
        // Verificar se existe um token de autenticação válido
        const token = localStorage.getItem('studentToken');
        if (!token) {
            // Se não estiver na página de login, redirecionar
            if (!window.location.pathname.includes('login.html')) {
                this.redirectToLogin();
            }
            return;
        }

        // Verificar validade do token
        try {
            // Aqui você implementaria a verificação real do token com o backend
            this.isAuthenticated = true;
            this.showAuthenticatedContent();
        } catch (error) {
            console.error('Erro na autenticação:', error);
            this.redirectToLogin();
        }
    }

    redirectToLogin() {
        // Salvar a URL atual para redirecionamento após login
        if (!window.location.pathname.includes('login.html')) {
            localStorage.setItem('redirectUrl', window.location.href);
            window.location.href = 'login.html';
        }
    }

    showAuthenticatedContent() {
        // Ocultar área de verificação de autenticação
        const authCheck = document.querySelector('.auth-check');
        if (authCheck) {
            authCheck.style.display = 'none';
        }

        // Mostrar conteúdo apropriado baseado na página atual
        if (window.location.pathname.includes('notas.html')) {
            document.querySelector('.grades-container').style.display = 'block';
        } else if (window.location.pathname.includes('progresso-estudante.html')) {
            document.querySelector('.dashboard-container').style.display = 'block';
        }
    }

    setupEventListeners() {
        // Listener para o botão de logout
        const logoutBtn = document.querySelector('.btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Listener para links que requerem autenticação
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && !this.isAuthenticated) {
                const href = link.getAttribute('href');
                if (href.includes('notas.html') || href.includes('progresso-estudante.html')) {
                    e.preventDefault();
                    this.redirectToLogin();
                }
            }
        });
    }

    logout() {
        localStorage.removeItem('studentToken');
        this.redirectToLogin();
    }

    // Método estático para verificar se está autenticado
    static isUserAuthenticated() {
        return !!localStorage.getItem('studentToken');
    }
}

// Inicializar autenticação quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new Auth();
}); 