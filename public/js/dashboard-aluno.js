document.addEventListener('DOMContentLoaded', () => {
    // Elementos dos filtros
    const disciplinaFilter = document.getElementById('disciplinaFilter');
    const moduloFilter = document.getElementById('moduloFilter');

    // Função para filtrar vídeos
    function filtrarVideos() {
        const disciplina = disciplinaFilter.value;
        const modulo = moduloFilter.value;

        // Aqui você faria uma chamada à API para buscar os vídeos filtrados
        // Por enquanto, vamos apenas simular uma atualização visual
        console.log('Filtrando vídeos:', { disciplina, modulo });
    }

    // Adicionar eventos aos filtros
    if (disciplinaFilter) {
        disciplinaFilter.addEventListener('change', filtrarVideos);
    }
    if (moduloFilter) {
        moduloFilter.addEventListener('change', filtrarVideos);
    }

    // Função para atualizar o progresso do vídeo
    function atualizarProgressoVideo(videoId, progresso) {
        // Aqui você faria uma chamada à API para atualizar o progresso
        console.log('Atualizando progresso:', { videoId, progresso });
    }

    // Função para marcar vídeo como visualizado
    function marcarVideoComoVisualizado(videoId) {
        // Aqui você faria uma chamada à API para marcar o vídeo como visualizado
        console.log('Marcando vídeo como visualizado:', videoId);
    }

    // Adicionar eventos aos cards de vídeo
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.dataset.videoId;
            // Aqui você abriria o player de vídeo ou redirecionaria para a página do vídeo
            console.log('Abrindo vídeo:', videoId);
        });
    });
}); 