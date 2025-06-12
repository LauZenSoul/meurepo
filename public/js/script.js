// Script para o protótipo do IMRDA - Versão simplificada

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const btnLogin = document.querySelector('.btn-login');
    const btnCadastro = document.getElementById('btn-cadastro');
    const loginModal = document.getElementById('login-modal');
    const registerStep2Modal = document.getElementById('register-step2-modal');
    const registerStep3Modal = document.getElementById('register-step3-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    const interestModal = document.getElementById('interest-modal');
    const interestConfirmationModal = document.getElementById('interest-confirmation-modal');
    const suggestionConfirmationModal = document.getElementById('suggestion-confirmation-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const documentUploadForm = document.getElementById('document-upload-form');
    const backToStep1Button = document.getElementById('back-to-step1');
    const backToStep2Button = document.getElementById('back-to-step2');
    const completeRegistrationButton = document.getElementById('complete-registration');
    const closeConfirmationButton = document.getElementById('close-confirmation');
    const locationPermissionButton = document.getElementById('location-permission');
    const locationStatus = document.getElementById('location-status');
    const submitInterestButton = document.getElementById('submit-interest');
    const closeInterestConfirmationButton = document.getElementById('close-interest-confirmation');
    const submitSuggestionButton = document.getElementById('submit-suggestion');
    const closeSuggestionConfirmationButton = document.getElementById('close-suggestion-confirmation');
    
    // Botões de interesse em cursos futuros
    const interestButtons = document.querySelectorAll('.btn-interest');
    
    // Áreas de upload de documentos
    const uploadAreas = document.querySelectorAll('.upload-preview');
    const uploadButtons = document.querySelectorAll('.upload-options button');
    
    // Dados do formulário para simulação
    let formData = {
        fullname: '',
        biNumber: '',
        phone: '',
        email: '',
        documents: {
            biFront: false,
            biBack: false,
            certificate: false,
            additionalDocs: false
        },
        location: null,
        selectedCenter: null
    };
    
    // Dados de interesse em cursos futuros
    let interestData = {
        currentCourse: '',
        counts: {
            'alimentos': 0,
            'energia': 0,
            'ti': 0,
            'agua': 0
        }
    };
    
    // Funções de abertura e fechamento de modais
    function openModal(modal) {
        // Fechar todos os modais primeiro
        closeAllModals();
        // Abrir o modal especificado
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir rolagem do body
    }
    
    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = ''; // Restaurar rolagem do body
    }
    
    // Manipulação de abas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            // Esconder todos os conteúdos de aba
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Mostrar o conteúdo da aba selecionada
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).style.display = 'block';
        });
    });
    
    // SIMPLIFICAÇÃO: Upload de documentos com um único clique
    function setupSimplifiedUploads() {
        // Configurar áreas de upload
        uploadAreas.forEach(area => {
            area.addEventListener('click', function() {
                const id = this.id.replace('-preview', '');
                simulateDocumentUpload(id, this);
            });
        });
        
        // Configurar botões de upload
        uploadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.id.replace('-file', '');
                const previewArea = document.getElementById(id + '-preview');
                simulateDocumentUpload(id, previewArea);
            });
        });
    }
    
    // Função simplificada para simular upload de documento
    function simulateDocumentUpload(documentId, previewElement) {
        // Mostrar feedback visual imediato
        previewElement.innerHTML = `
            <div class="upload-success">
                <img src="images/logo.png" alt="Documento" style="max-width: 100%; max-height: 180px;">
                <p>Documento carregado com sucesso</p>
            </div>
        `;
        
        // Marcar documento como carregado
        if (documentId === 'bi-front') {
            formData.documents.biFront = true;
        } else if (documentId === 'bi-back') {
            formData.documents.biBack = true;
        } else if (documentId === 'certificate') {
            formData.documents.certificate = true;
        } else if (documentId === 'additional-docs') {
            formData.documents.additionalDocs = true;
        }
    }
    
    // Simulação de geolocalização
    function setupGeolocation() {
        locationPermissionButton.addEventListener('click', () => {
            locationStatus.innerHTML = '<p>Solicitando acesso à localização...</p>';
            
            setTimeout(() => {
                // Simular obtenção de localização
                formData.location = {
                    latitude: -8.8383,
                    longitude: 13.2344
                };
                
                locationStatus.innerHTML = `
                    <p style="color: var(--success);">
                        <strong>Localização obtida com sucesso!</strong><br>
                        Coordenadas: ${formData.location.latitude}, ${formData.location.longitude}
                    </p>
                `;
                
                // Atualizar lista de centros com distâncias simuladas
                updateCentersList();
            }, 1500);
        });
    }
    
    // Atualizar lista de centros com base na localização
    function updateCentersList() {
        const centerList = document.getElementById('center-list');
        
        // Simular cálculo de distâncias
        const centers = [
            {
                name: 'Centro Telbanda - Cacuaco',
                address: 'Rua Principal, Cacuaco, Luanda',
                distance: 5.2
            },
            {
                name: 'Centro Telbanda - Funda',
                address: 'Avenida Central, Funda, Luanda',
                distance: 8.7
            },
            {
                name: 'Centro Telbanda - Bengo',
                address: 'Praça Principal, Caxito, Bengo',
                distance: 32.5
            }
        ];
        
        // Ordenar por distância
        centers.sort((a, b) => a.distance - b.distance);
        
        // Limpar lista atual
        centerList.innerHTML = '';
        
        // Adicionar centros ordenados
        centers.forEach(center => {
            const centerItem = document.createElement('div');
            centerItem.className = 'center-item';
            centerItem.innerHTML = `
                <div class="center-info">
                    <h5>${center.name}</h5>
                    <p>${center.address}</p>
                    <p>Distância: ${center.distance} km</p>
                </div>
                <button class="btn btn-sm btn-outline center-select" data-center="${center.name}">Selecionar</button>
            `;
            centerList.appendChild(centerItem);
        });
        
        // Adicionar eventos aos botões de seleção
        document.querySelectorAll('.center-select').forEach(button => {
            button.addEventListener('click', (e) => {
                // Remover seleção anterior
                document.querySelectorAll('.center-select').forEach(btn => {
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline');
                    btn.textContent = 'Selecionar';
                });
                
                // Marcar o botão atual como selecionado
                button.classList.remove('btn-outline');
                button.classList.add('btn-primary');
                button.textContent = 'Selecionado';
                
                // Armazenar centro selecionado
                formData.selectedCenter = button.getAttribute('data-center');
            });
        });
    }
    
    // Preencher dados de confirmação
    function fillConfirmationData() {
        document.getElementById('confirm-name').textContent = formData.fullname || "João Manuel da Silva";
        document.getElementById('confirm-bi').textContent = formData.biNumber || "000123456LA789";
        document.getElementById('confirm-phone').textContent = formData.phone || "+244 923 456 789";
        document.getElementById('confirm-code').textContent = `IMRDA-2025-${Math.floor(10000 + Math.random() * 90000)}`;
    }
    
    // Configurar botões de interesse em cursos futuros
    function setupInterestButtons() {
        interestButtons.forEach(button => {
            button.addEventListener('click', () => {
                const courseId = button.getAttribute('data-course');
                const courseName = button.closest('.course-card').querySelector('h3').textContent;
                
                // Armazenar curso atual
                interestData.currentCourse = courseId;
                
                // Atualizar nome do curso no modal
                document.getElementById('interest-course-name').textContent = courseName;
                
                // Abrir modal de interesse
                openModal(interestModal);
            });
        });
        
        // Evento para submissão de interesse
        submitInterestButton.addEventListener('click', () => {
            // Incrementar contador de interesse
            interestData.counts[interestData.currentCourse]++;
            
            // Atualizar contador na interface
            const countElement = document.getElementById(`${interestData.currentCourse}-count`);
            if (countElement) {
                countElement.textContent = `${interestData.counts[interestData.currentCourse]} interessados`;
            }
            
            // Atualizar nome do curso no modal de confirmação
            document.getElementById('confirmed-course-name').textContent = 
                document.getElementById('interest-course-name').textContent;
            
            // Mostrar modal de confirmação
            openModal(interestConfirmationModal);
        });
        
        // Fechar modal de confirmação de interesse
        closeInterestConfirmationButton.addEventListener('click', closeAllModals);
    }
    
    // Configurar formulário de sugestão de curso
    function setupSuggestionForm() {
        submitSuggestionButton.addEventListener('click', () => {
            const courseName = document.getElementById('course-suggestion').value;
            const courseDescription = document.getElementById('course-description').value;
            
            if (courseName.trim() === '') {
                alert('Por favor, informe o nome do curso sugerido.');
                return;
            }
            
            // Simular envio da sugestão
            console.log('Sugestão de curso:', {
                name: courseName,
                description: courseDescription
            });
            
            // Limpar formulário
            document.getElementById('course-suggestion').value = '';
            document.getElementById('course-description').value = '';
            
            // Mostrar confirmação
            openModal(suggestionConfirmationModal);
        });
        
        // Fechar modal de confirmação de sugestão
        closeSuggestionConfirmationButton.addEventListener('click', closeAllModals);
    }
    
    // Eventos para botões de navegação entre modais
    btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });
    
    btnCadastro.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
        // Ativar a aba de cadastro
        document.querySelector('[data-tab="register"]').click();
    });
    
    // Fechar modais
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Submissão do formulário de login (simulação)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Funcionalidade de login será implementada em uma versão futura do protótipo.');
    });
    
    // Submissão do formulário de registro inicial
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Capturar dados do formulário
        formData.fullname = document.getElementById('fullname').value;
        formData.biNumber = document.getElementById('bi-number').value;
        formData.phone = document.getElementById('phone').value;
        formData.email = document.getElementById('email').value || 'Não informado';
        
        // Avançar para a próxima etapa
        openModal(registerStep2Modal);
    });
    
    // Submissão do formulário de upload de documentos
    documentUploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // SIMPLIFICAÇÃO: Permitir avançar mesmo sem verificação completa
        // Avançar para a próxima etapa
        openModal(registerStep3Modal);
    });
    
    // Botão para voltar à etapa 1
    backToStep1Button.addEventListener('click', () => {
        openModal(loginModal);
        document.querySelector('[data-tab="register"]').click();
    });
    
    // Botão para voltar à etapa 2
    backToStep2Button.addEventListener('click', () => {
        openModal(registerStep2Modal);
    });
    
    // Botão para concluir o registro
    completeRegistrationButton.addEventListener('click', () => {
        // SIMPLIFICAÇÃO: Permitir concluir mesmo sem centro selecionado
        // Preencher dados de confirmação
        fillConfirmationData();
        
        // Mostrar modal de confirmação
        openModal(confirmationModal);
    });
    
    // Botão para fechar confirmação
    closeConfirmationButton.addEventListener('click', closeAllModals);
    
    // Inicializar funcionalidades
    setupSimplifiedUploads();
    setupGeolocation();
    setupInterestButtons();
    setupSuggestionForm();
    
    // Simulação de menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
});
