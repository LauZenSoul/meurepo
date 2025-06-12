// Dados dos cursos
const coursesData = {
    enfermagem: {
        title: 'Técnico em Enfermagem Rural',
        description: `
            <h2>Sobre o Curso</h2>
            <p>O curso Técnico em Enfermagem Rural oferece formação abrangente nas áreas de saúde rural e atendimento comunitário, com foco especial em práticas de enfermagem adaptadas ao contexto rural angolano. O curso é oferecido em formato híbrido, combinando aulas online com práticas presenciais.</p>
            
            <h3>Modelo de Ensino</h3>
            <ul>
                <li>Aulas teóricas através de plataforma digital</li>
                <li>Práticas presenciais em laboratórios e unidades de saúde</li>
                <li>Material didático digital e impresso</li>
                <li>Tutoria online e presencial</li>
            </ul>

            <h3>Objetivos do Curso</h3>
            <ul>
                <li>Formar profissionais capacitados para atuar em comunidades rurais</li>
                <li>Desenvolver habilidades práticas em atendimento de saúde básica</li>
                <li>Promover conhecimento sobre saúde preventiva e educação em saúde</li>
                <li>Capacitar para o uso de tecnologias em saúde rural</li>
            </ul>

            <h3>Áreas de Atuação</h3>
            <ul>
                <li>Postos de saúde rurais</li>
                <li>Programas de saúde comunitária</li>
                <li>Clínicas e hospitais rurais</li>
                <li>Projetos de saúde preventiva</li>
            </ul>

            <h3>Matriz Curricular</h3>
            <div class="curriculum-grid">
                <div class="semester">
                    <h4>1º Semestre</h4>
                    <ul>
                        <li>Anatomia e Fisiologia Humana</li>
                        <li>Fundamentos de Enfermagem</li>
                        <li>Biossegurança em Saúde</li>
                        <li>Psicologia em Saúde</li>
                        <li>Informática Aplicada à Saúde</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>2º Semestre</h4>
                    <ul>
                        <li>Técnicas Básicas de Enfermagem</li>
                        <li>Farmacologia Aplicada</li>
                        <li>Saúde Coletiva Rural</li>
                        <li>Primeiros Socorros</li>
                        <li>Ética Profissional</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>3º Semestre</h4>
                    <ul>
                        <li>Enfermagem em Saúde Pública</li>
                        <li>Assistência à Saúde da Família</li>
                        <li>Enfermagem em Urgência e Emergência</li>
                        <li>Saúde da Mulher e da Criança</li>
                        <li>Práticas Integrativas em Saúde</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>4º Semestre</h4>
                    <ul>
                        <li>Gestão em Saúde Rural</li>
                        <li>Enfermagem em Doenças Transmissíveis</li>
                        <li>Saúde do Trabalhador Rural</li>
                        <li>Estágio Supervisionado</li>
                        <li>Projeto Integrador</li>
                    </ul>
                </div>
            </div>
        `
    },
    agronomia: {
        title: 'Técnico em Agronomia Rural',
        description: `
            <h2>Sobre o Curso</h2>
            <p>O curso Técnico em Agronomia Rural forma profissionais especializados em práticas agrícolas sustentáveis e gestão de cultivos, com foco nas necessidades específicas do contexto rural angolano. O programa utiliza um modelo de ensino híbrido inovador.</p>
            
            <h3>Modelo de Ensino</h3>
            <ul>
                <li>Aulas teóricas através de plataforma digital</li>
                <li>Práticas em campos experimentais e propriedades rurais</li>
                <li>Laboratórios virtuais e simuladores</li>
                <li>Acompanhamento técnico presencial</li>
            </ul>

            <h3>Objetivos do Curso</h3>
            <ul>
                <li>Desenvolver competências em produção agrícola sustentável</li>
                <li>Capacitar para o uso de tecnologias agrícolas modernas</li>
                <li>Formar profissionais aptos a gerenciar projetos rurais</li>
                <li>Promover práticas de agricultura regenerativa</li>
            </ul>

            <h3>Áreas de Atuação</h3>
            <ul>
                <li>Propriedades rurais</li>
                <li>Cooperativas agrícolas</li>
                <li>Projetos de desenvolvimento rural</li>
                <li>Empresas de insumos agrícolas</li>
            </ul>

            <h3>Matriz Curricular</h3>
            <div class="curriculum-grid">
                <div class="semester">
                    <h4>1º Semestre</h4>
                    <ul>
                        <li>Solos e Nutrição de Plantas</li>
                        <li>Botânica Agrícola</li>
                        <li>Climatologia Rural</li>
                        <li>Matemática Aplicada</li>
                        <li>Informática Rural</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>2º Semestre</h4>
                    <ul>
                        <li>Irrigação e Drenagem</li>
                        <li>Culturas Anuais</li>
                        <li>Mecanização Agrícola</li>
                        <li>Topografia Rural</li>
                        <li>Gestão Ambiental</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>3º Semestre</h4>
                    <ul>
                        <li>Fruticultura</li>
                        <li>Olericultura</li>
                        <li>Defesa Fitossanitária</li>
                        <li>Agricultura Digital</li>
                        <li>Sistemas Agroflorestais</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>4º Semestre</h4>
                    <ul>
                        <li>Gestão Rural</li>
                        <li>Tecnologia Pós-Colheita</li>
                        <li>Agricultura Familiar</li>
                        <li>Estágio Supervisionado</li>
                        <li>Projeto Integrador</li>
                    </ul>
                </div>
            </div>
        `
    },
    administracao: {
        title: 'Técnico em Administração Rural',
        description: `
            <h2>Sobre o Curso</h2>
            <p>O curso Técnico em Administração Rural prepara profissionais para gerir empreendimentos rurais com eficiência, combinando conhecimentos administrativos com as particularidades do setor rural. O curso adota um modelo híbrido de ensino.</p>
            
            <h3>Modelo de Ensino</h3>
            <ul>
                <li>Aulas teóricas em ambiente virtual</li>
                <li>Estudos de caso práticos</li>
                <li>Visitas técnicas a empreendimentos rurais</li>
                <li>Mentorias online e presenciais</li>
            </ul>

            <h3>Objetivos do Curso</h3>
            <ul>
                <li>Desenvolver habilidades em gestão rural</li>
                <li>Capacitar para o planejamento financeiro</li>
                <li>Formar empreendedores rurais</li>
                <li>Promover práticas de gestão sustentável</li>
            </ul>

            <h3>Áreas de Atuação</h3>
            <ul>
                <li>Gestão de propriedades rurais</li>
                <li>Cooperativas e associações</li>
                <li>Projetos de desenvolvimento rural</li>
                <li>Consultoria em agronegócio</li>
            </ul>

            <h3>Matriz Curricular</h3>
            <div class="curriculum-grid">
                <div class="semester">
                    <h4>1º Semestre</h4>
                    <ul>
                        <li>Fundamentos de Administração</li>
                        <li>Matemática Financeira</li>
                        <li>Economia Rural</li>
                        <li>Informática Aplicada</li>
                        <li>Contabilidade Básica</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>2º Semestre</h4>
                    <ul>
                        <li>Gestão de Pessoas</li>
                        <li>Marketing Rural</li>
                        <li>Legislação Rural</li>
                        <li>Gestão da Produção</li>
                        <li>Empreendedorismo Rural</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>3º Semestre</h4>
                    <ul>
                        <li>Planejamento Estratégico</li>
                        <li>Gestão de Custos</li>
                        <li>Comercialização Agrícola</li>
                        <li>Projetos Rurais</li>
                        <li>Cooperativismo</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>4º Semestre</h4>
                    <ul>
                        <li>Gestão da Qualidade</li>
                        <li>Logística Rural</li>
                        <li>Análise de Investimentos</li>
                        <li>Estágio Supervisionado</li>
                        <li>Projeto Integrador</li>
                    </ul>
                </div>
            </div>
        `
    },
    veterinaria: {
        title: 'Técnico em Veterinária Rural',
        description: `
            <h2>Sobre o Curso</h2>
            <p>O curso Técnico em Veterinária Rural forma profissionais especializados em saúde e produção animal, com ênfase nas necessidades específicas do ambiente rural angolano. O curso utiliza metodologia híbrida de ensino.</p>
            
            <h3>Modelo de Ensino</h3>
            <ul>
                <li>Aulas teóricas em plataforma digital</li>
                <li>Práticas em laboratórios e fazendas</li>
                <li>Simuladores virtuais de procedimentos</li>
                <li>Acompanhamento veterinário supervisionado</li>
            </ul>

            <h3>Objetivos do Curso</h3>
            <ul>
                <li>Desenvolver competências em saúde animal</li>
                <li>Capacitar para manejo de rebanhos</li>
                <li>Formar profissionais em produção animal</li>
                <li>Promover práticas veterinárias sustentáveis</li>
            </ul>

            <h3>Áreas de Atuação</h3>
            <ul>
                <li>Clínicas veterinárias rurais</li>
                <li>Fazendas e propriedades rurais</li>
                <li>Programas de saúde animal</li>
                <li>Projetos de produção animal</li>
            </ul>

            <h3>Matriz Curricular</h3>
            <div class="curriculum-grid">
                <div class="semester">
                    <h4>1º Semestre</h4>
                    <ul>
                        <li>Anatomia Animal</li>
                        <li>Fisiologia Veterinária</li>
                        <li>Biossegurança Animal</li>
                        <li>Zootecnia Geral</li>
                        <li>Informática Aplicada</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>2º Semestre</h4>
                    <ul>
                        <li>Patologia Animal</li>
                        <li>Farmacologia Veterinária</li>
                        <li>Nutrição Animal</li>
                        <li>Parasitologia</li>
                        <li>Manejo Sanitário</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>3º Semestre</h4>
                    <ul>
                        <li>Clínica de Grandes Animais</li>
                        <li>Reprodução Animal</li>
                        <li>Doenças Infecciosas</li>
                        <li>Produção Animal</li>
                        <li>Tecnologia de Produtos</li>
                    </ul>
                </div>
                <div class="semester">
                    <h4>4º Semestre</h4>
                    <ul>
                        <li>Cirurgia Veterinária Básica</li>
                        <li>Saúde Pública Veterinária</li>
                        <li>Gestão em Veterinária</li>
                        <li>Estágio Supervisionado</li>
                        <li>Projeto Integrador</li>
                    </ul>
                </div>
            </div>
        `
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Filtros de Categoria
    const categoryFilters = document.querySelectorAll('.category-filter');
    const courseCards = document.querySelectorAll('.course-card');

    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class de todos os filtros
            categoryFilters.forEach(f => {
                f.classList.remove('active');
                f.setAttribute('aria-selected', 'false');
            });

            // Adiciona active class ao filtro clicado
            filter.classList.add('active');
            filter.setAttribute('aria-selected', 'true');

            const category = filter.dataset.category;

            // Filtra os cards com animação
            courseCards.forEach(card => {
                card.style.opacity = '0';
                setTimeout(() => {
                    if (category === 'todos' || card.dataset.category === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Modal de Detalhes
    const modal = document.getElementById('courseModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.querySelector('.modal-close');

    window.openCourseDetails = function(courseId) {
        const courseData = coursesData[courseId];
        if (!courseData) return;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${courseData.title}</h2>
            </div>
            <div class="modal-body">
                ${courseData.description}
            </div>
        `;
    };

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modalClose.click();
        }
    });

    // Fechar modal clicando fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modalClose.click();
        }
    });

    // Botão Voltar ao Topo
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Função para demonstrar interesse em cursos futuros
    function demonstrarInteresse(cursoId) {
        const button = event.target.closest('button');
        const countElement = button.parentElement.querySelector('.interest-count');
        const currentCount = parseInt(countElement.textContent);
        
        // Simula o envio do interesse
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        
        // Simula uma chamada de API
        setTimeout(() => {
            countElement.textContent = `${currentCount + 1} interessados`;
            button.innerHTML = '<i class="fas fa-check"></i> Interesse Registrado';
            button.classList.add('registered');
            
            // Mostra notificação
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Obrigado pelo seu interesse! Entraremos em contato quando o curso estiver disponível.
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }, 1000);
    }

    // Função para enviar sugestão de curso
    function submitSuggestion(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Desabilita o botão e mostra loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Simula envio do formulário
        setTimeout(() => {
            // Limpa o formulário
            form.reset();
            
            // Restaura o botão
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Sugestão';
            
            // Mostra notificação de sucesso
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Sua sugestão foi enviada com sucesso! Agradecemos sua contribuição.
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }, 1500);
        
        return false;
    }
});