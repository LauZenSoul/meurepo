// JavaScript para funcionalidades da página inicial do ITDRA
// Versão com animações elegantes e fluidas

document.addEventListener('DOMContentLoaded', function() {
    initializeMenuToggle();
    initializeLoginButton();
    initializeAdvancedScrollAnimations();
    initializeModal();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeMicroInteractions();
    initializePerformanceOptimizations();
});

// Função para inicializar o menu hambúrguer com animações elegantes
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    const overlay = document.querySelector('.menu-overlay');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });

        // Fechar menu ao clicar em um link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fechar menu ao clicar no overlay
        overlay.addEventListener('click', closeMenu);

        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Modal de Login
    const loginBtn = document.querySelector('.btn-login');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            loginModal.classList.add('show');
        });

        closeBtn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            loginModal.classList.remove('show');
        });

        window.addEventListener('click', function(e) {
            if (e.target == loginModal) {
                loginModal.style.display = 'none';
                loginModal.classList.remove('show');
            }
        });
    }
}

// Função para criar efeito ripple
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Função para inicializar o botão de login com micro-animação
function initializeLoginButton() {
    const loginButton = document.querySelector('.btn-login');
    
    if (loginButton) {
        // Adicionar efeito de loading elegante
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animação de clique
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = '';
            }, 100);
            
            // Verificar se existe uma página de login específica
            showLoadingButton(this);
            
            fetch('./login.html')
                .then(response => {
                    if (response.ok) {
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 800);
                    } else {
                        hideLoadingButton(this);
                        openLoginModal();
                    }
                })
                .catch(() => {
                    hideLoadingButton(this);
                    openLoginModal();
                });
        });
    }
}

// Função para mostrar loading no botão
function showLoadingButton(button) {
    const originalText = button.textContent;
    button.dataset.originalText = originalText;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
    button.disabled = true;
    button.style.opacity = '0.8';
}

// Função para esconder loading no botão
function hideLoadingButton(button) {
    const originalText = button.dataset.originalText;
    button.textContent = originalText;
    button.disabled = false;
    button.style.opacity = '';
}

// Função para abrir modal de login com animação elegante
function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'flex';
        loginModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Animação de backdrop
        loginModal.style.opacity = '0';
        setTimeout(() => {
            loginModal.style.transition = 'opacity 0.3s ease';
            loginModal.style.opacity = '1';
        }, 10);
    }
}

// Função para inicializar animações de scroll avançadas
function initializeAdvancedScrollAnimations() {
    // Configurações mais sofisticadas do observador
    const observerOptions = {
        threshold: [0, 0.1, 0.25, 0.5],
        rootMargin: '0px 0px -10% 0px'
    };
    
    let animationDelay = 0;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const intersectionRatio = entry.intersectionRatio;
                
                // Aplicar diferentes tipos de animação baseado na posição
                const rect = element.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const elementCenter = rect.top + rect.height / 2;
                const viewportCenter = viewportHeight / 2;
                
                if (elementCenter < viewportCenter) {
                    // Elemento na parte superior - animar da esquerda
                    element.classList.remove('animate-on-scroll');
                    element.classList.add('animate-on-scroll-left', 'in-view');
                } else {
                    // Elemento na parte inferior - animar da direita
                    element.classList.remove('animate-on-scroll');
                    element.classList.add('animate-on-scroll-right', 'in-view');
                }
                
                // Animação escalonada para cards em grid
                if (element.closest('.courses-grid') || element.closest('.features-grid')) {
                    const cards = Array.from(element.parentElement.children);
                    const index = cards.indexOf(element);
                    element.style.animationDelay = `${index * 0.15}s`;
                    
                    // Adicionar animação de escala para variety
                    if (index % 2 === 0) {
                        element.classList.add('animate-on-scroll-scale');
                    }
                }
                
                // Efeito de parallax suave
                if (element.classList.contains('feature-card')) {
                    applyParallaxEffect(element, intersectionRatio);
                }
                
                // Observer só executa uma vez
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Adicionar classes de animação aos elementos com variety
    const animatedElements = document.querySelectorAll('.course-card, .feature-card');
    animatedElements.forEach((el, index) => {
        // Variar tipos de animação inicial
        const animationTypes = ['animate-on-scroll', 'animate-on-scroll-left', 'animate-on-scroll-right', 'animate-on-scroll-scale'];
        const randomType = animationTypes[index % animationTypes.length];
        el.classList.add(randomType);
        observer.observe(el);
    });
    
    // Animar hero na entrada da página com sequência elegante
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateX(-50px) rotateY(-10deg)';
            heroContent.style.filter = 'blur(2px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateX(0) rotateY(0)';
                heroContent.style.filter = 'blur(0)';
            }, 200);
        }
        
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'scale(0.9) rotate(-2deg)';
            heroImage.style.filter = 'blur(1px)';
            
            setTimeout(() => {
                heroImage.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1) rotate(0)';
                heroImage.style.filter = 'blur(0)';
            }, 600);
        }
    }, 300);
}

// Função para aplicar efeito parallax
function applyParallaxEffect(element, ratio) {
    const intensity = 20;
    const yPos = -(1 - ratio) * intensity;
    element.style.transform += ` translateY(${yPos}px)`;
}

// Função para inicializar modal com animações elegantes
function initializeModal() {
    const modal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Fechar modal com animação
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '0';
            
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }, 300);
        });
        
        // Fechar modal clicando fora do conteúdo
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal.click();
            }
        });
    }
    
    // Funcionalidade das abas com transições suaves
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Animação de saída para aba atual
            const currentActive = document.querySelector('.tab-content[style*="block"]');
            if (currentActive) {
                currentActive.style.opacity = '0';
                currentActive.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    currentActive.style.display = 'none';
                    
                    // Mostrar nova aba
                    const newTab = document.getElementById(targetTab);
                    newTab.style.display = 'block';
                    newTab.style.opacity = '0';
                    newTab.style.transform = 'translateX(20px)';
                    newTab.style.transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
                    
                    setTimeout(() => {
                        newTab.style.opacity = '1';
                        newTab.style.transform = 'translateX(0)';
                    }, 50);
                }, 200);
            } else {
                // Primeira ativação
                document.getElementById(targetTab).style.display = 'block';
            }
            
            // Atualizar botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Manipular formulários com animações de feedback
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            animateFormSubmission(this);
            handleLogin();
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            animateFormSubmission(this);
            handleRegistration();
        });
    }
}

// Função para animar submissão de formulário
function animateFormSubmission(form) {
    const button = form.querySelector('button[type="submit"]');
    button.style.transform = 'scale(0.95)';
    button.style.transition = 'transform 0.1s ease';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
}

// Função para scroll suave aprimorado
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efeito ripple no link
            createRippleEffect(this);
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Scroll com easing customizado
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });
}

// Função de scroll suave customizada
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    requestAnimationFrame(animation);
}

// Função para inicializar efeitos parallax
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        // Parallax no hero
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax nas imagens dos cursos
        const courseImages = document.querySelectorAll('.course-image img');
        courseImages.forEach((img, index) => {
            const rect = img.getBoundingClientRect();
            const speed = 0.1 + (index % 3) * 0.05; // Velocidades variadas
            const yPos = -(rect.top * speed);
            img.style.transform = `translateY(${yPos}px) scale(1.1)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Função para inicializar micro-interações
function initializeMicroInteractions() {
    // Hover elegante para botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Animação do logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.05) rotate(2deg)';
            img.style.filter = 'drop-shadow(0 0 10px rgba(46, 125, 50, 0.3))';
        });
        
        logo.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = '';
            img.style.filter = '';
        });
    }
    
    // Hover para feature icons
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1) rotateY(10deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = '';
        });
    });
}

// Função para otimizações de performance
function initializePerformanceOptimizations() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload de recursos críticos
    const criticalResources = [
        'login.html',
        'public/html/dashboard-admin.html'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Função para lidar com login (mantida da versão anterior)
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    showLoading(true);
    
    setTimeout(() => {
        showLoading(false);
        
        if (username.toLowerCase().includes('admin')) {
            window.location.href = '/dashboard-admin.html';
        } else {
            showNotification('Login realizado com sucesso!', 'success');
            setTimeout(() => {
                window.location.href = '/dashboard-student.html';
            }, 1500);
        }
    }, 2000);
}

// Função para lidar com registro (mantida da versão anterior)
function handleRegistration() {
    const fullname = document.getElementById('fullname').value;
    const biNumber = document.getElementById('bi-number').value;
    const phone = document.getElementById('phone').value;
    
    if (!fullname || !biNumber || !phone) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    showLoading(true);
    
    setTimeout(() => {
        showLoading(false);
        showNotification('Cadastro iniciado com sucesso! Você será redirecionado para a próxima etapa.', 'success');
        
        setTimeout(() => {
            const modal = document.getElementById('loginModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 2000);
    }, 1500);
}

// Funções auxiliares mantidas das versões anteriores
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

function showLoading(show) {
    let loader = document.querySelector('.page-loader');
    
    if (show) {
        if (!loader) {
            loader = document.createElement('div');
            loader.className = 'page-loader';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <p>Processando...</p>
                </div>
            `;
            document.body.appendChild(loader);
        }
        loader.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        if (loader) {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Função para sugestão de cursos (mantida da versão anterior)
function initializeCourseSuggestion() {
    const submitButton = document.getElementById('submit-suggestion');
    
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            const courseName = document.getElementById('course-suggestion').value;
            const courseDescription = document.getElementById('course-description').value;
            
            if (!courseName.trim()) {
                showNotification('Por favor, digite o nome do curso sugerido.', 'error');
                return;
            }
            
            // Animação do botão
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            showLoading(true);
            
            setTimeout(() => {
                showLoading(false);
                showNotification('Sugestão enviada com sucesso! Obrigado pela sua contribuição.', 'success');
                
                document.getElementById('course-suggestion').value = '';
                document.getElementById('course-description').value = '';
            }, 1500);
        });
    }
}

// Inicializar sugestão de cursos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initializeCourseSuggestion();
});

// Adicionar estilos CSS melhorados para notificações e loader
const enhancedStyles = `
<style>
.notification {
    position: fixed;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 300px;
    max-width: 500px;
    background: var(--white);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    backdrop-filter: blur(10px);
}

.notification.show {
    top: 20px;
    transform: translateX(-50%) scale(1);
}

.notification-content {
    padding: 1.2rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.notification-success {
    border-left: 4px solid var(--success);
    background: linear-gradient(135deg, rgba(56, 142, 60, 0.1), rgba(255, 255, 255, 0.95));
}

.notification-error {
    border-left: 4px solid var(--error);
    background: linear-gradient(135deg, rgba(211, 47, 47, 0.1), rgba(255, 255, 255, 0.95));
}

.notification-info {
    border-left: 4px solid var(--info);
    background: linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(255, 255, 255, 0.95));
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--neutral);
    margin-left: 1rem;
    transition: all 0.3s ease;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

.notification-close:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
}

.page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.loader-content {
    text-align: center;
    padding: 2rem;
    background: var(--white);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.loader-spinner {
    width: 50px;
    height: 50px;
    background: conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--primary));
    border-radius: 50%;
    animation: elegantSpin 1.5s cubic-bezier(0.87, 0, 0.13, 1) infinite;
    margin: 0 auto 1.5rem;
    position: relative;
}

.loader-spinner::before {
    content: '';
    position: absolute;
    inset: 4px;
    background: var(--white);
    border-radius: 50%;
}

.menu-open {
    overflow: hidden;
}

/* Animação de ripple global */
@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(4);
        opacity: 0;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', enhancedStyles); 