// Script responsivo para mover itens de cabeçalho (barra de pesquisa, notificações, perfil)
// para dentro da sidebar em telas pequenas e retornar em telas grandes.

(function() {
    const MOBILE_BREAKPOINT = 768; // px

    const searchBar = document.querySelector('.dashboard-header .search-bar');
    const headerRight = document.querySelector('.dashboard-header .header-right');
    const header = document.querySelector('.dashboard-header');
    const mobileContainer = document.getElementById('mobileHeaderItems');

    if (!searchBar || !headerRight || !header || !mobileContainer) {
        return; // Elementos não encontrados
    }

    function moveToMobile() {
        mobileContainer.appendChild(searchBar);
        mobileContainer.appendChild(headerRight);
    }

    function moveToDesktop() {
        header.insertBefore(searchBar, header.firstChild);
        header.appendChild(headerRight);
    }

    function handleResize() {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            if (!mobileContainer.contains(searchBar)) {
                moveToMobile();
            }
        } else {
            if (!header.contains(searchBar)) {
                moveToDesktop();
            }
        }
    }

    window.addEventListener('resize', handleResize);
    // Execução inicial
    handleResize();
})(); 