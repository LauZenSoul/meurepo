// Dashboard Administrativo - JavaScript Elegante e Fluido
// Versão com animações avançadas e micro-interações sofisticadas

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeNavigation();
    initializeUserMenu();
    initializeResponsiveFeatures();
    initializeQuickActions();
    initializeAnimatedEntrance();
    initializeMicroInteractions();
    initializeAdvancedFeatures();
    initializeNotifications();
    initializeModals();
    initializeFormHandling();
    initializeDataTables();
    loadDashboardData();
    showSection('courses');
    initializeEventListeners();
});

// Inicializar funcionalidades da sidebar com controle correto
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Só funcionar no desktop
            if (window.innerWidth > 1024) {
                // Toggle da classe collapsed
                sidebar.classList.toggle('collapsed');
                
                // Atualizar ícone do botão
                const toggleIcon = sidebarToggle.querySelector('i');
                if (toggleIcon) {
                    if (sidebar.classList.contains('collapsed')) {
                        toggleIcon.className = 'fas fa-chevron-right';
                    } else {
                        toggleIcon.className = 'fas fa-chevron-left';
                    }
                }
                
                // Salvar estado no localStorage
                localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
                
                console.log('Sidebar collapsed (desktop):', sidebar.classList.contains('collapsed'));
            }
        });
        
        // Restaurar estado da sidebar
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState === 'true') {
            sidebar.classList.add('collapsed');
            const toggleIcon = sidebarToggle.querySelector('i');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-chevron-right';
            }
        }
    }
}

// Inicializar navegação entre páginas com transições elegantes
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const contentPages = document.querySelectorAll('.content-page');
    const pageTitle = document.getElementById('page-title');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Criar efeito ripple no link clicado
            createRippleEffect(this);
            
            // Animação de saída da página atual
            const currentPage = document.querySelector('.content-page.active');
            if (currentPage) {
                currentPage.style.transition = 'all 0.3s cubic-bezier(0.5, 0, 0.75, 0)';
                currentPage.style.opacity = '0';
                currentPage.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    currentPage.classList.remove('active');
                }, 300);
            }
            
            // Atualizar navegação ativa com animação
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const parentNavItem = this.closest('.nav-item');
            parentNavItem.classList.add('active');
            
            // Mostrar nova página com animação de entrada
            setTimeout(() => {
                const targetPageElement = document.getElementById(`${targetPage}-page`);
                if (targetPageElement) {
                    targetPageElement.style.opacity = '0';
                    targetPageElement.style.transform = 'translateY(20px)';
                    targetPageElement.classList.add('active');
                    
                    setTimeout(() => {
                        targetPageElement.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
                        targetPageElement.style.opacity = '1';
                        targetPageElement.style.transform = 'translateY(0)';
                    }, 50);
                    
                    // Atualizar título da página com animação
                    if (pageTitle) {
                        updatePageTitle(targetPage, pageTitle);
                    }
                }
            }, 150);
            
            // Fechar sidebar em mobile após navegação
            if (window.innerWidth <= 1024) {
                setTimeout(() => closeMobileSidebar(), 200);
            }
        });
    });
}

// Função para atualizar título da página com animação
function updatePageTitle(targetPage, titleElement) {
    const pageNames = {
        'dashboard': 'Dashboard',
        'students': 'Gestão de Estudantes',
        'courses': 'Gestão de Cursos',
        'enrollment': 'Gestão de Inscrições',
        'centers': 'Centros Telbanda',
        'documents': 'Gestão de Documentos',
        'reports': 'Relatórios e Análises',
        'settings': 'Configurações do Sistema'
    };
    
    if (pageNames[targetPage]) {
        titleElement.style.transition = 'all 0.3s cubic-bezier(0.5, 0, 0.75, 0)';
        titleElement.style.opacity = '0';
        titleElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            titleElement.textContent = pageNames[targetPage];
            titleElement.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            titleElement.style.opacity = '1';
            titleElement.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Criar efeito ripple elegante
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    const rippleStyles = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    ripple.style.cssText = rippleStyles;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Inicializar menu do usuário com animações sofisticadas
function initializeUserMenu() {
    const logoutBtn = document.getElementById('logout-btn');
    const userMenuBtn = document.querySelector('.user-menu-btn');
    const userDropdown = document.querySelector('.user-dropdown');
    
    // Logout com confirmação elegante
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showElegantConfirmation('Tem certeza que deseja sair do sistema?', handleLogout);
        });
    }
    
    // Hover do menu do usuário
    if (userMenuBtn && userDropdown) {
        let hoverTimeout;
        
        userMenuBtn.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            userDropdown.style.display = 'block';
            
            setTimeout(() => {
                userDropdown.style.opacity = '1';
                userDropdown.style.visibility = 'visible';
                userDropdown.style.transform = 'translateY(0) scale(1)';
            }, 10);
        });
        
        const userMenu = document.querySelector('.user-menu');
        userMenu.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                userDropdown.style.opacity = '0';
                userDropdown.style.visibility = 'hidden';
                userDropdown.style.transform = 'translateY(-10px) scale(0.95)';
                
                setTimeout(() => {
                    userDropdown.style.display = 'none';
                }, 400);
            }, 200);
        });
    }
}

// Confirmação elegante
function showElegantConfirmation(message, callback) {
    const modal = document.createElement('div');
    modal.className = 'elegant-confirmation-modal';
    modal.innerHTML = `
        <div class="confirmation-backdrop"></div>
        <div class="confirmation-content">
            <div class="confirmation-icon">
                <i class="fas fa-question-circle"></i>
            </div>
            <h3>Confirmação</h3>
            <p>${message}</p>
            <div class="confirmation-buttons">
                <button class="btn btn-cancel">Cancelar</button>
                <button class="btn btn-confirm">Confirmar</button>
            </div>
        </div>
    `;
    
    // Estilos do modal
    const modalStyles = `
        <style>
        .elegant-confirmation-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .confirmation-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }
        
        .confirmation-content {
            background: var(--white);
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            text-align: center;
            max-width: 400px;
            z-index: 1;
            transform: scale(0.8);
            opacity: 0;
            animation: scaleIn 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.1s forwards;
        }
        
        .confirmation-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--warning), #ffb300);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            color: var(--white);
            font-size: 1.5rem;
        }
        
        .confirmation-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .btn-cancel {
            background: var(--light);
            color: var(--dark);
            border: 2px solid transparent;
        }
        
        .btn-confirm {
            background: var(--error);
            color: var(--white);
            border: 2px solid var(--error);
        }
        
        .btn-cancel:hover {
            background: var(--neutral);
            color: var(--white);
        }
        
        .btn-confirm:hover {
            background: #c62828;
            border-color: #c62828;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('.btn-cancel').addEventListener('click', () => {
        closeElegantModal(modal);
    });
    
    modal.querySelector('.btn-confirm').addEventListener('click', () => {
        closeElegantModal(modal);
        callback();
    });
    
    modal.querySelector('.confirmation-backdrop').addEventListener('click', () => {
        closeElegantModal(modal);
    });
}

function closeElegantModal(modal) {
    const content = modal.querySelector('.confirmation-content');
    const backdrop = modal.querySelector('.confirmation-backdrop');
    
    content.style.animation = 'scaleOut 0.3s ease forwards';
    backdrop.style.animation = 'fadeOut 0.3s ease forwards';
    
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// Inicializar recursos responsivos aprimorados
function initializeResponsiveFeatures() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    let sidebarOverlay;
    
    // Criar overlay para mobile se não existir
    if (!document.querySelector('.sidebar-overlay')) {
        sidebarOverlay = document.createElement('div');
        sidebarOverlay.className = 'sidebar-overlay';
        document.body.appendChild(sidebarOverlay);
        
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
    } else {
        sidebarOverlay = document.querySelector('.sidebar-overlay');
    }
    
    // Toggle menu mobile melhorado
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = sidebar.classList.contains('active');
            console.log('Mobile menu toggle clicked, isActive:', isActive);
            
            if (!isActive) {
                // Garantir que a sidebar seja visível
                sidebar.classList.add('active');
                sidebar.classList.remove('collapsed'); // Sempre remover collapsed no mobile
                sidebarOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Debug: verificar se os elementos estão visíveis
                setTimeout(() => {
                    const navLinks = sidebar.querySelectorAll('.nav-link span');
                    console.log('Nav links encontrados:', navLinks.length);
                    navLinks.forEach((span, index) => {
                        console.log(`Link ${index}:`, span.textContent, 'visível:', window.getComputedStyle(span).display !== 'none');
                    });
                }, 100);
            } else {
                closeMobileSidebar();
            }
        });
    }
    
    // Fechar sidebar ao clicar em nav-links no mobile
    const navLinks = sidebar.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                setTimeout(() => closeMobileSidebar(), 100);
            }
        });
    });
    
    // Fechar sidebar ao redimensionar para desktop
    window.addEventListener('resize', function() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        
        if (window.innerWidth > 1024) {
            closeMobileSidebar();
            // Mostrar botão toggle no desktop
            if (sidebarToggle) {
                sidebarToggle.style.display = 'block';
            }
        } else {
            // Esconder botão toggle no mobile
            if (sidebarToggle) {
                sidebarToggle.style.display = 'none';
            }
            sidebar.classList.remove('collapsed');
        }
    });
    
    // Configuração inicial para mobile
    if (window.innerWidth <= 1024) {
        console.log('Inicializando em modo mobile');
        sidebar.classList.remove('collapsed');
        
        // Garantir que o botão toggle não interfira no mobile
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.style.display = 'none';
        }
        
        console.log('Sidebar classes:', sidebar.className);
    }
}

// Fechar sidebar mobile melhorado
function closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
        console.log('Mobile sidebar fechado');
    }
}

// Inicializar ações rápidas com animações
function initializeQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn[data-page]');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Animação de feedback
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            // Simular clique no link de navegação correspondente
            const navLink = document.querySelector(`.nav-link[data-page="${targetPage}"]`);
            if (navLink) {
                setTimeout(() => {
                    navLink.click();
                }, 150);
            }
        });
        
        // Hover com efeito de onda
        button.addEventListener('mouseenter', function() {
            const wave = this.querySelector('::before');
            // O efeito já está implementado no CSS
        });
    });
}

// Inicialização sem animações desnecessárias
function initializeAnimatedEntrance() {
    // A página carrega normalmente sem efeitos excessivos
    console.log('Interface carregada com sucesso');
}

// Inicializar micro-interações
function initializeMicroInteractions() {
    // Hover nos botões com efeito de elevação
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
    
    // Animação de hover nos nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
    
    // Animação suave nos inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Inicializar recursos avançados
function initializeAdvancedFeatures() {
    // Parallax suave no scroll
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        const parallaxElements = document.querySelectorAll('.stat-icon');
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index % 3) * 0.05;
            const yPos = -(scrolled * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        pageContent.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // Auto-refresh das estatísticas com animação
    setInterval(() => {
        updateStats();
    }, 30000); // Atualizar a cada 30 segundos
}

// Função para logout com animação
function handleLogout() {
    showElegantLoading(true, 'Fazendo logout...');
    
    setTimeout(() => {
        showElegantLoading(false);
        
        // Animação de saída
        const mainContent = document.querySelector('.main-content');
        const sidebar = document.querySelector('.sidebar');
        
        if (mainContent) {
            mainContent.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0.75, 0)';
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateX(100%)';
        }
        
        if (sidebar) {
            sidebar.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0.75, 0) 0.2s';
            sidebar.style.opacity = '0';
            sidebar.style.transform = 'translateX(-100%)';
        }
        
        setTimeout(() => {
            // Limpar dados locais
            localStorage.removeItem('userToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('sidebarCollapsed');
            
            // Redirecionar para página inicial
            window.location.href = '/index.html';
        }, 800);
    }, 1500);
}

// Loading elegante aprimorado
function showElegantLoading(show, message = 'Processando...') {
    let loader = document.querySelector('.elegant-loader');
    
    if (show) {
        if (!loader) {
            loader = document.createElement('div');
            loader.className = 'elegant-loader';
            loader.innerHTML = `
                <div class="loader-backdrop"></div>
                <div class="loader-content">
                    <div class="loader-spinner-elegant"></div>
                    <p class="loader-message">${message}</p>
                </div>
            `;
            
            // Estilos do loader elegante
            const loaderStyles = `
                <style>
                .elegant-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .loader-backdrop {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(5px);
                    animation: fadeIn 0.3s ease;
                }
                
                .loader-content {
                    text-align: center;
                    z-index: 1;
                    padding: 2rem;
                    background: var(--white);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    animation: scaleIn 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.1s both;
                }
                
                .loader-spinner-elegant {
                    width: 50px;
                    height: 50px;
                    background: conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--primary));
                    border-radius: 50%;
                    margin: 0 auto 1.5rem;
                    position: relative;
                    animation: elegantSpin 1.5s cubic-bezier(0.87, 0, 0.13, 1) infinite;
                }
                
                .loader-spinner-elegant::before {
                    content: '';
                    position: absolute;
                    inset: 4px;
                    background: var(--white);
                    border-radius: 50%;
                }
                
                .loader-message {
                    margin: 0;
                    color: var(--dark);
                    font-weight: 500;
                }
                
                @keyframes elegantSpin {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.1); }
                    100% { transform: rotate(360deg) scale(1); }
                }
                </style>
            `;
            
            if (!document.querySelector('.elegant-loader-styles')) {
                const styleElement = document.createElement('div');
                styleElement.className = 'elegant-loader-styles';
                styleElement.innerHTML = loaderStyles;
                document.head.appendChild(styleElement);
            }
            
            document.body.appendChild(loader);
        }
        loader.style.display = 'flex';
    } else {
        if (loader) {
            const content = loader.querySelector('.loader-content');
            const backdrop = loader.querySelector('.loader-backdrop');
            
            content.style.animation = 'scaleOut 0.3s ease forwards';
            backdrop.style.animation = 'fadeOut 0.3s ease forwards';
            
            setTimeout(() => {
                loader.remove();
            }, 300);
        }
    }
}

// Atualizar estatísticas com animações
function updateStats() {
    const stats = loadDashboardData();
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        const numberElement = card.querySelector('h3');
        const targetNumber = Object.values(stats)[index];
        
        // Animação de pulse antes da atualização
        card.style.animation = 'pulse 0.3s ease';
        
        setTimeout(() => {
            animateNumber(numberElement, parseInt(numberElement.textContent.replace(/,/g, '')), targetNumber, 1000);
            card.style.animation = '';
        }, 300);
    });
}

// Animação de números com easing
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const change = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (change * easeOutQuart));
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Dados simulados
function loadDashboardData() {
    return {
        students: 1240 + Math.floor(Math.random() * 10),
        courses: 4,
        centers: 18,
        certificates: 892 + Math.floor(Math.random() * 5)
    };
}

// CSS adicional para animações
const additionalAnimationStyles = `
<style>
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

@keyframes scaleIn {
    from { 
        opacity: 0; 
        transform: scale(0.8); 
    }
    to { 
        opacity: 1; 
        transform: scale(1); 
    }
}

@keyframes scaleOut {
    from { 
        opacity: 1; 
        transform: scale(1); 
    }
    to { 
        opacity: 0; 
        transform: scale(0.8); 
    }
}

.sidebar-open {
    overflow: hidden;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalAnimationStyles);

// Inicializar sistema de notificações
function initializeNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationBadge = document.querySelector('.notification-badge');
    
    // Criar dropdown de notificações
    if (notificationBtn && !document.querySelector('.notification-dropdown')) {
        const dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        dropdown.innerHTML = `
            <div class="notification-header">
                <h4>Notificações</h4>
                <button class="mark-all-read">Marcar todas como lidas</button>
            </div>
            <div class="notification-list">
                <div class="notification-item unread">
                    <div class="notification-icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <div class="notification-content">
                        <h5>Nova inscrição</h5>
                        <p>João Silva se inscreveu no curso de Agricultura Digital</p>
                        <span class="notification-time">Há 2 minutos</span>
                    </div>
                </div>
                <div class="notification-item unread">
                    <div class="notification-icon">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <div class="notification-content">
                        <h5>Certificado emitido</h5>
                        <p>Maria Santos completou o curso de Tecnologia Agrícola</p>
                        <span class="notification-time">Há 1 hora</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="notification-content">
                        <h5>Novo centro registrado</h5>
                        <p>Centro Telbanda de Huíla foi adicionado ao sistema</p>
                        <span class="notification-time">Há 3 horas</span>
                    </div>
                </div>
            </div>
            <div class="notification-footer">
                <a href="#" data-page="notifications">Ver todas as notificações</a>
            </div>
        `;
        
        notificationBtn.parentElement.appendChild(dropdown);
        
        // Adicionar estilos específicos
        const styles = document.createElement('style');
        styles.textContent = `
            .notification-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                background: var(--white);
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s var(--ease-out-expo);
                min-width: 350px;
                max-height: 400px;
                overflow: hidden;
                z-index: 1500;
            }
            
            .notifications:hover .notification-dropdown {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .notification-header {
                padding: 1rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .notification-header h4 {
                margin: 0;
                color: var(--dark);
                font-size: 1rem;
                font-weight: 600;
            }
            
            .mark-all-read {
                background: none;
                border: none;
                color: var(--primary);
                cursor: pointer;
                font-size: 0.875rem;
                text-decoration: underline;
            }
            
            .notification-list {
                max-height: 300px;
                overflow-y: auto;
            }
            
            .notification-item {
                padding: 1rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                display: flex;
                gap: 0.75rem;
                transition: background-color 0.2s;
                cursor: pointer;
            }
            
            .notification-item:hover {
                background-color: rgba(0, 0, 0, 0.02);
            }
            
            .notification-item.unread {
                background-color: rgba(46, 125, 50, 0.05);
                position: relative;
            }
            
            .notification-item.unread::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 3px;
                height: 100%;
                background: var(--primary);
            }
            
            .notification-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(46, 125, 50, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--primary);
                flex-shrink: 0;
            }
            
            .notification-content h5 {
                margin: 0 0 0.25rem 0;
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--dark);
            }
            
            .notification-content p {
                margin: 0 0 0.5rem 0;
                font-size: 0.8rem;
                color: var(--neutral);
                line-height: 1.4;
            }
            
            .notification-time {
                font-size: 0.75rem;
                color: var(--muted);
            }
            
            .notification-footer {
                padding: 0.75rem 1rem;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            
            .notification-footer a {
                color: var(--primary);
                text-decoration: none;
                font-size: 0.875rem;
                font-weight: 500;
            }
        `;
        document.head.appendChild(styles);
        
        // Event listeners para notificações
        const markAllRead = dropdown.querySelector('.mark-all-read');
        markAllRead.addEventListener('click', function() {
            const unreadItems = dropdown.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => item.classList.remove('unread'));
            updateNotificationBadge(0);
        });
        
        // Marcar como lida ao clicar
        const notificationItems = dropdown.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.addEventListener('click', function() {
                if (this.classList.contains('unread')) {
                    this.classList.remove('unread');
                    updateNotificationCount();
                }
            });
        });
    }
}

// Atualizar contador de notificações
function updateNotificationBadge(count) {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
}

function updateNotificationCount() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    updateNotificationBadge(unreadCount);
}

// Sistema de modais
function initializeModals() {
    // Criar estrutura base do modal
    if (!document.querySelector('.modal-overlay')) {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-container">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer"></div>
            </div>
        `;
        document.body.appendChild(modalOverlay);
        
        // Estilos do modal
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s var(--ease-out-expo);
                backdrop-filter: blur(5px);
            }
            
            .modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-container {
                background: var(--white);
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow: hidden;
                transform: scale(0.9) translateY(20px);
                transition: all 0.3s var(--ease-out-expo);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .modal-overlay.active .modal-container {
                transform: scale(1) translateY(0);
            }
            
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-title {
                margin: 0;
                color: var(--dark);
                font-size: 1.25rem;
                font-weight: 600;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--neutral);
                cursor: pointer;
                font-size: 1.2rem;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.2s;
            }
            
            .modal-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: var(--dark);
            }
            
            .modal-body {
                padding: 1.5rem;
                max-height: 60vh;
                overflow-y: auto;
            }
            
            .modal-footer {
                padding: 1rem 1.5rem;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
        `;
        document.head.appendChild(modalStyles);
        
        // Event listeners
        const closeBtn = modalOverlay.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }
}

// Funções para controlar modais
function openModal(title, content, buttons = []) {
    const modal = document.querySelector('.modal-overlay');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    const modalFooter = modal.querySelector('.modal-footer');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    
    // Limpar botões existentes
    modalFooter.innerHTML = '';
    
    // Adicionar novos botões
    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.className = `btn ${button.class || 'btn-secondary'}`;
        btn.textContent = button.text;
        btn.addEventListener('click', button.action || closeModal);
        modalFooter.appendChild(btn);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Inicializar manipulação de formulários
function initializeFormHandling() {
    // Validação de formulários em tempo real
    document.addEventListener('input', function(e) {
        if (e.target.matches('input, textarea, select')) {
            validateField(e.target);
        }
    });
    
    // Submissão de formulários
    document.addEventListener('submit', function(e) {
        if (e.target.matches('.ajax-form')) {
            e.preventDefault();
            handleFormSubmission(e.target);
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Validações básicas
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'Este campo é obrigatório';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        message = 'Email inválido';
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        message = 'Telefone inválido';
    }
    
    // Aplicar estilos de validação
    const fieldGroup = field.closest('.form-group');
    if (fieldGroup) {
        const errorElement = fieldGroup.querySelector('.field-error');
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
            if (errorElement) errorElement.remove();
        } else {
            field.classList.add('error');
            field.classList.remove('valid');
            
            if (!errorElement) {
                const error = document.createElement('span');
                error.className = 'field-error';
                error.textContent = message;
                fieldGroup.appendChild(error);
            } else {
                errorElement.textContent = message;
            }
        }
    }
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\+]?[\d\s\-\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 9;
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validar todos os campos
    const fields = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showToast('Por favor, corrija os erros no formulário', 'error');
        return;
    }
    
    // Simular envio
    showElegantLoading(true, 'Salvando dados...');
    
    setTimeout(() => {
        showElegantLoading(false);
        showToast('Dados salvos com sucesso!', 'success');
        form.reset();
        closeModal();
        
        // Atualizar dados se necessário
        loadDashboardData();
    }, 2000);
}

// Sistema de toast notifications
function showToast(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${getToastIcon(type)}"></i>
        </div>
        <div class="toast-content">
            <span>${message}</span>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Estilos do toast
    if (!document.querySelector('.toast-styles')) {
        const toastStyles = document.createElement('style');
        toastStyles.className = 'toast-styles';
        toastStyles.textContent = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            }
            
            .toast {
                background: var(--white);
                border-radius: 8px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem;
                margin-bottom: 0.5rem;
                transform: translateX(100%);
                transition: all 0.3s var(--ease-out-expo);
                pointer-events: auto;
                min-width: 300px;
                border-left: 4px solid var(--primary);
            }
            
            .toast.show {
                transform: translateX(0);
            }
            
            .toast-success {
                border-left-color: #4CAF50;
            }
            
            .toast-error {
                border-left-color: #f44336;
            }
            
            .toast-warning {
                border-left-color: #ff9800;
            }
            
            .toast-icon {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                color: var(--white);
                font-size: 0.875rem;
                flex-shrink: 0;
            }
            
            .toast-success .toast-icon {
                background: #4CAF50;
            }
            
            .toast-error .toast-icon {
                background: #f44336;
            }
            
            .toast-warning .toast-icon {
                background: #ff9800;
            }
            
            .toast-info .toast-icon {
                background: var(--primary);
            }
            
            .toast-content {
                flex: 1;
                font-size: 0.875rem;
                color: var(--dark);
            }
            
            .toast-close {
                background: none;
                border: none;
                color: var(--neutral);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 50%;
                transition: all 0.2s;
            }
            
            .toast-close:hover {
                background: rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(toastStyles);
    }
    
    // Criar container se não existir
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    container.appendChild(toast);
    
    // Mostrar toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Event listener para fechar
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    // Auto remover
    if (duration > 0) {
        setTimeout(() => removeToast(toast), duration);
    }
}

function removeToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'fa-check';
        case 'error': return 'fa-exclamation';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info';
    }
}

// Inicializar tabelas de dados
function initializeDataTables() {
    // Implementar funcionalidades de tabela (ordenação, filtros, paginação)
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        addTableFunctionality(table);
    });
}

function addTableFunctionality(table) {
    // Adicionar funcionalidades de ordenação
    const headers = table.querySelectorAll('th[data-sortable]');
    headers.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            sortTable(table, this);
        });
    });
}

function sortTable(table, header) {
    const columnIndex = Array.from(header.parentNode.children).indexOf(header);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const isAscending = !header.classList.contains('sort-asc');
    
    // Remover classes de ordenação de outros headers
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Adicionar classe apropriada
    header.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
    
    // Ordenar linhas
    rows.sort((a, b) => {
        const aValue = a.children[columnIndex].textContent.trim();
        const bValue = b.children[columnIndex].textContent.trim();
        
        if (isNumeric(aValue) && isNumeric(bValue)) {
            return isAscending ? 
                parseFloat(aValue) - parseFloat(bValue) : 
                parseFloat(bValue) - parseFloat(aValue);
        } else {
            return isAscending ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        }
    });
    
    // Reorganizar DOM
    rows.forEach(row => tbody.appendChild(row));
}

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// ==================== FUNÇÕES DOS CENTROS TELBANDA ====================

// Funcionalidades do mapa fictício
function zoomIn() {
    const map = document.getElementById('mapbox-map');
    if (map) {
        map.style.transform = map.style.transform ? 
            map.style.transform.replace(/scale\([^)]*\)/, 'scale(1.2)') : 
            'scale(1.2)';
        map.style.transition = 'transform 0.3s ease';
        
        showToast('Zoom aumentado', 'info', 2000);
    }
}

function zoomOut() {
    const map = document.getElementById('mapbox-map');
    if (map) {
        map.style.transform = map.style.transform ? 
            map.style.transform.replace(/scale\([^)]*\)/, 'scale(0.8)') : 
            'scale(0.8)';
        map.style.transition = 'transform 0.3s ease';
        
        showToast('Zoom diminuído', 'info', 2000);
    }
}

function resetMap() {
    const map = document.getElementById('google-map') || document.getElementById('mapbox-map');
    if (map) {
        map.style.transform = 'scale(1)';
        console.log('Mapa centralizado');
    }
}

// Nova função para toggle de vista satélite
function toggleSatellite() {
    const mapBackground = document.querySelector('.map-background.google-style');
    const satelliteBtn = document.querySelector('.map-btn[onclick="toggleSatellite()"]');
    
    if (mapBackground && satelliteBtn) {
        if (mapBackground.classList.contains('satellite-view')) {
            // Voltar para vista de mapa
            mapBackground.classList.remove('satellite-view');
            mapBackground.style.background = 'linear-gradient(135deg, #e1f0f7 0%, #f8fcff 100%)';
            satelliteBtn.title = 'Vista satélite';
            console.log('Vista de mapa ativada');
        } else {
            // Mudar para vista satélite
            mapBackground.classList.add('satellite-view');
            mapBackground.style.background = 'linear-gradient(135deg, #4a5d3a 0%, #6b7c5c 30%, #8faa7d 60%, #a8c396 100%)';
            satelliteBtn.title = 'Vista de mapa';
            console.log('Vista satélite ativada');
        }
    }
}

// Inicializar interações do mapa
function initializeMapInteractions() {
    const mapMarkers = document.querySelectorAll('.map-marker');
    const centerCards = document.querySelectorAll('.center-card');
    
    // Interação entre marcadores do mapa e cards
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const centerId = this.getAttribute('data-center');
            
            // Remover estado ativo de todos os marcadores
            mapMarkers.forEach(m => m.querySelector('.marker-pin').classList.remove('active'));
            centerCards.forEach(c => c.classList.remove('active'));
            
            // Ativar marcador e card correspondente
            this.querySelector('.marker-pin').classList.add('active');
            const correspondingCard = document.querySelector(`.center-card[data-center="${centerId}"]`);
            if (correspondingCard) {
                correspondingCard.classList.add('active');
                correspondingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            showToast(`Centro ${this.querySelector('.marker-tooltip').textContent} selecionado`, 'info');
        });
    });
    
    // Interação dos cards com os marcadores
    centerCards.forEach(card => {
        card.addEventListener('click', function() {
            const centerId = this.getAttribute('data-center');
            
            // Remover estado ativo
            mapMarkers.forEach(m => m.querySelector('.marker-pin').classList.remove('active'));
            centerCards.forEach(c => c.classList.remove('active'));
            
            // Ativar card e marcador correspondente
            this.classList.add('active');
            const correspondingMarker = document.querySelector(`.map-marker[data-center="${centerId}"]`);
            if (correspondingMarker) {
                correspondingMarker.querySelector('.marker-pin').classList.add('active');
            }
        });
    });
}

// Gerenciamento de centros
function viewCenter(id) {
    const centerData = getCenterData(id);
    if (!centerData) return;
    
    const content = `
        <div class="center-details">
            <div class="detail-section">
                <h4>Informações Gerais</h4>
                <div class="detail-grid">
                    <div class="detail-group">
                        <label>Nome do Centro:</label>
                        <span>${centerData.name}</span>
                    </div>
                    <div class="detail-group">
                        <label>Localização:</label>
                        <span>${centerData.location}</span>
                    </div>
                    <div class="detail-group">
                        <label>Status:</label>
                        <span class="status-badge ${centerData.status.toLowerCase()}">${centerData.status}</span>
                    </div>
                    <div class="detail-group">
                        <label>Telefone:</label>
                        <span>${centerData.phone}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Estatísticas</h4>
                <div class="stats-row">
                    <div class="stat-item">
                        <div class="stat-number">${centerData.students}</div>
                        <div class="stat-label">Estudantes</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${centerData.courses}</div>
                        <div class="stat-label">Cursos</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${centerData.completion}%</div>
                        <div class="stat-label">Taxa Conclusão</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Cursos Oferecidos</h4>
                <div class="courses-list">
                    ${centerData.availableCourses.map(course => 
                        `<span class="course-tag">${course}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
    
    const buttons = [
        {
            text: 'Editar Centro',
            class: 'btn-primary',
            onclick: () => {
                closeModal();
                editCenter(id);
            }
        },
        {
            text: 'Fechar',
            class: 'btn-secondary',
            onclick: closeModal
        }
    ];
    
    openModal(`Detalhes - ${centerData.name}`, content, buttons);
}

function editCenter(id) {
    const centerData = getCenterData(id);
    if (!centerData) return;
    
    const content = `
        <form id="edit-center-form" class="modal-form">
            <div class="form-group">
                <label for="center-name">Nome do Centro:</label>
                <input type="text" id="center-name" value="${centerData.name}" required>
            </div>
            
            <div class="form-group">
                <label for="center-location">Localização:</label>
                <input type="text" id="center-location" value="${centerData.location}" required>
            </div>
            
            <div class="form-group">
                <label for="center-phone">Telefone:</label>
                <input type="tel" id="center-phone" value="${centerData.phone}" required>
            </div>
            
            <div class="form-group">
                <label for="center-status">Status:</label>
                <select id="center-status" required>
                    <option value="Ativo" ${centerData.status === 'Ativo' ? 'selected' : ''}>Ativo</option>
                    <option value="Inativo" ${centerData.status === 'Inativo' ? 'selected' : ''}>Inativo</option>
                    <option value="Manutenção" ${centerData.status === 'Manutenção' ? 'selected' : ''}>Manutenção</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="center-capacity">Capacidade de Estudantes:</label>
                <input type="number" id="center-capacity" value="${centerData.capacity}" min="1" required>
            </div>
            
            <div class="form-group">
                <label for="center-manager">Gerente do Centro:</label>
                <input type="text" id="center-manager" value="${centerData.manager}" required>
            </div>
        </form>
    `;
    
    const buttons = [
        {
            text: 'Salvar Alterações',
            class: 'btn-primary',
            onclick: () => saveCenterChanges(id)
        },
        {
            text: 'Cancelar',
            class: 'btn-secondary',
            onclick: closeModal
        }
    ];
    
    openModal(`Editar Centro - ${centerData.name}`, content, buttons);
}

function openAddCenterModal() {
    const content = `
        <form id="add-center-form" class="modal-form">
            <div class="form-group">
                <label for="new-center-name">Nome do Centro:</label>
                <input type="text" id="new-center-name" placeholder="Ex: Centro Telbanda Cabinda" required>
            </div>
            
            <div class="form-group">
                <label for="new-center-location">Localização:</label>
                <input type="text" id="new-center-location" placeholder="Ex: Cidade de Cabinda" required>
            </div>
            
            <div class="form-group">
                <label for="new-center-phone">Telefone:</label>
                <input type="tel" id="new-center-phone" placeholder="+244 923 456 799" required>
            </div>
            
            <div class="form-group">
                <label for="new-center-capacity">Capacidade de Estudantes:</label>
                <input type="number" id="new-center-capacity" placeholder="200" min="1" required>
            </div>
            
            <div class="form-group">
                <label for="new-center-manager">Gerente do Centro:</label>
                <input type="text" id="new-center-manager" placeholder="Nome do gerente" required>
            </div>
            
            <div class="form-group">
                <label for="new-center-coordinates">Coordenadas (Latitude, Longitude):</label>
                <input type="text" id="new-center-coordinates" placeholder="-8.8368, 13.2897" required>
            </div>
        </form>
    `;
    
    const buttons = [
        {
            text: 'Criar Centro',
            class: 'btn-primary',
            onclick: saveNewCenter
        },
        {
            text: 'Cancelar',
            class: 'btn-secondary',
            onclick: closeModal
        }
    ];
    
    openModal('Adicionar Novo Centro Telbanda', content, buttons);
}

function saveCenterChanges(id) {
    const form = document.getElementById('edit-center-form');
    if (!form.checkValidity()) {
        showToast('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    showElegantLoading(true, 'Salvando alterações...');
    
    setTimeout(() => {
        showElegantLoading(false);
        closeModal();
        showToast('Centro atualizado com sucesso!', 'success');
        
        // Simular atualização dos dados no card
        updateCenterCard(id, {
            name: document.getElementById('center-name').value,
            location: document.getElementById('center-location').value,
            phone: document.getElementById('center-phone').value,
            status: document.getElementById('center-status').value
        });
    }, 2000);
}

function saveNewCenter() {
    const form = document.getElementById('add-center-form');
    if (!form.checkValidity()) {
        showToast('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    showElegantLoading(true, 'Criando novo centro...');
    
    setTimeout(() => {
        showElegantLoading(false);
        closeModal();
        showToast('Novo centro criado com sucesso!', 'success');
        
        // Aqui você adicionaria a lógica para criar um novo centro
        // Para demo, apenas mostramos a mensagem de sucesso
    }, 2500);
}

function exportCenters() {
    showElegantLoading(true, 'Preparando relatório...');
    
    setTimeout(() => {
        showElegantLoading(false);
        showToast('Relatório de centros exportado com sucesso!', 'success');
        
        // Simular download
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,Centro,Localização,Estudantes,Status\nCentro Telbanda Luanda Norte,Bairro Viana,145,Ativo';
        link.download = `centros_telbanda_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    }, 1500);
}

function updateCenterCard(id, data) {
    const card = document.querySelector(`.center-card[data-center="${id}"]`);
    if (!card) return;
    
    // Atualizar o título
    const title = card.querySelector('h4');
    if (title) title.textContent = data.name;
    
    // Atualizar as informações
    const locationSpan = card.querySelector('.info-item:nth-child(1) span');
    if (locationSpan) locationSpan.textContent = data.location;
    
    const phoneSpan = card.querySelector('.info-item:nth-child(4) span');
    if (phoneSpan) phoneSpan.textContent = data.phone;
    
    // Atualizar status visual se necessário
    const statusIndicator = card.querySelector('.center-status');
    if (statusIndicator) {
        statusIndicator.className = `center-status ${data.status.toLowerCase()}`;
    }
    
    // Animação de confirmação
    card.style.transform = 'scale(1.02)';
    card.style.boxShadow = '0 8px 30px rgba(46, 125, 50, 0.2)';
    
    setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
    }, 300);
}

// Dados fictícios dos centros (simulando uma API)
function getCenterData(id) {
    const centers = {
        1: {
            name: 'Centro Telbanda Luanda Norte',
            location: 'Bairro Viana, Luanda',
            phone: '+244 923 456 789',
            status: 'Ativo',
            students: 145,
            courses: 4,
            completion: 87,
            capacity: 200,
            manager: 'Ana Fernandes',
            availableCourses: ['Agricultura Digital', 'Tecnologia Agrícola', 'Gestão Rural', 'Desenvolvimento Sustentável']
        },
        2: {
            name: 'Centro Telbanda Luanda Sul',
            location: 'Bairro Rangel, Luanda',
            phone: '+244 923 456 790',
            status: 'Ativo',
            students: 132,
            courses: 4,
            completion: 82,
            capacity: 180,
            manager: 'João Santos',
            availableCourses: ['Agricultura Digital', 'Tecnologia Agrícola', 'Gestão Rural', 'Desenvolvimento Sustentável']
        },
        3: {
            name: 'Centro Telbanda Malanje',
            location: 'Cidade de Malanje',
            phone: '+244 923 456 791',
            status: 'Ativo',
            students: 98,
            courses: 3,
            completion: 79,
            capacity: 150,
            manager: 'Maria Silva',
            availableCourses: ['Agricultura Digital', 'Tecnologia Agrícola', 'Gestão Rural']
        }
        // ... outros centros seguem o mesmo padrão
    };
    
    return centers[id] || null;
}

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

// Sistema de Notificações
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

function initializeEventListeners() {
    // Implementar listeners de eventos necessários
    document.querySelectorAll('.quick-access-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const section = card.getAttribute('onclick').match(/'([^']+)'/)[1];
            showSection(section);
        });
    });
} 