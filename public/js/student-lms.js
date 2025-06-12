// Funções para o LMS do Aluno - ITDRA

document.addEventListener('DOMContentLoaded', function() {
    // Controle do menu
    const menuToggle = document.getElementById('menuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            body.style.overflow = 'hidden';
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Toggle da sidebar (colapsar/expandir)
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        sidebarToggle.querySelector('i').style.transform = isCollapsed ? 'rotate(180deg)' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    sidebarToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleMenu);

    // Navegação entre seções
    const menuLinks = document.querySelectorAll('[data-section]');
    const sections = document.querySelectorAll('.content-section');

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId + '-section');
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Atualizar menu ativo
        menuLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.parentElement.classList.add('active');
        }

        // Fechar menu em mobile
        if (window.innerWidth <= 1024) {
            toggleMenu();
        }
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Fecha menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Reset ao redimensionar
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 1024) {
                menuToggle.classList.remove('active');
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = '';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }, 250);
    });

    // Inicialização
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        const progressValue = 75; // Valor em porcentagem
        progressCircle.style.setProperty('--progress', `${progressValue * 3.6}deg`);
    }
});

// Configuração dos Círculos de Progresso
function setupProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const value = circle.querySelector('.progress-value');
        if (value) {
            const percentage = parseInt(value.textContent);
            circle.style.setProperty('--progress', `${percentage * 3.6}deg`);
        }
    });
}

// Navegação entre Módulos
function setupModuleNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const moduleItems = document.querySelectorAll('.module-item');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Aqui você pode adicionar lógica para mostrar o conteúdo correspondente
        });
    });

    moduleItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!item.querySelector('.status-locked')) {
                loadModuleContent(item);
            }
        });
    });
}

// Carregamento do Conteúdo do Módulo
function loadModuleContent(moduleItem) {
    const moduleTitle = moduleItem.querySelector('h4').textContent;
    const isComplete = moduleItem.querySelector('.status-complete') !== null;
    const isInProgress = moduleItem.querySelector('.status-in-progress') !== null;

    // Atualizar estado visual
    document.querySelectorAll('.module-item').forEach(item => {
        item.classList.remove('current');
    });
    moduleItem.classList.add('current');

    // Aqui você pode adicionar a lógica para carregar o conteúdo específico do módulo
    console.log(`Carregando conteúdo do módulo: ${moduleTitle}`);
    console.log(`Status: ${isComplete ? 'Completo' : isInProgress ? 'Em Andamento' : 'Não Iniciado'}`);
}

// Sistema de Notificações
function setupNotifications() {
    const notificationIcon = document.querySelector('.notifications');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', () => {
            // Aqui você pode implementar a lógica para mostrar as notificações
            // Por exemplo, abrir um modal ou dropdown com a lista de notificações
            console.log('Abrindo notificações...');
        });
    }
}

// Funções de Utilidade para o Modelo Híbrido

// Verificar Próxima Aula Presencial
function checkNextPresentialClass() {
    // Esta função pode ser expandida para verificar no backend
    // as próximas aulas presenciais agendadas
    const nextClass = {
        type: 'presencial',
        date: '2024-03-15T14:00:00',
        title: 'Sistema Circulatório',
        location: 'Centro ITDRA - Lab 02'
    };

    return nextClass;
}

// Atualizar Progresso do Módulo
function updateModuleProgress(moduleId, progress) {
    // Esta função seria chamada quando o aluno completa atividades
    // tanto online quanto presenciais
    console.log(`Atualizando progresso do módulo ${moduleId}: ${progress}%`);
}

// Verificar Requisitos de Presença
function checkAttendanceRequirements(moduleId) {
    // Esta função verifica se o aluno está cumprindo os requisitos
    // mínimos de presença nas aulas presenciais
    const requirements = {
        totalClasses: 10,
        attendedClasses: 9,
        minimumRequired: 7,
        isCompliant: true
    };

    return requirements;
}

// Sincronizar Dados Offline
function syncOfflineData() {
    // Esta função seria responsável por sincronizar dados
    // quando o aluno estiver offline e voltar a ter conexão
    return new Promise((resolve, reject) => {
        // Implementar lógica de sincronização
        console.log('Sincronizando dados offline...');
        resolve();
    });
}

// Verificar Disponibilidade de Material Offline
function checkOfflineMaterialAvailability(moduleId) {
    // Verifica se o material do módulo está disponível offline
    return {
        isAvailable: true,
        lastSync: new Date(),
        size: '250MB'
    };
}

// Gerenciar Cache de Conteúdo
const contentCache = {
    // Implementar lógica de cache para conteúdo offline
    store: new Map(),
    
    async set(key, value) {
        this.store.set(key, {
            value,
            timestamp: Date.now()
        });
    },
    
    async get(key) {
        return this.store.get(key);
    },
    
    async clear() {
        this.store.clear();
    }
};

// Exportar funções para uso em outros módulos
export {
    initializeLMS,
    checkNextPresentialClass,
    updateModuleProgress,
    checkAttendanceRequirements,
    syncOfflineData,
    checkOfflineMaterialAvailability,
    contentCache
}; 