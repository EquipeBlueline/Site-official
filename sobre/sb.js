// Função para configurar o menu dropdown
function setupMenuDropdown() {
    const menuButton = document.getElementById('menuButton');
    const menuDropdown = document.getElementById('menuDropdown');
    
    if (menuButton && menuDropdown) {
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            menuDropdown.classList.toggle('active');
        });

        // Fecha o menu quando clicar fora
        document.addEventListener('click', function(e) {
            if (!menuButton.contains(e.target) && !menuDropdown.contains(e.target)) {
                menuDropdown.classList.remove('active');
            }
        });

        // Fecha o menu quando clicar em um item
        const menuItems = menuDropdown.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menuDropdown.classList.remove('active');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Configurar menu dropdown
    setupMenuDropdown();
    
    // Função para mostrar cards
    window.mostrarCard = function(cardId) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.remove('active');
        });
        const cardAtivo = document.getElementById(cardId);
        if (cardAtivo) {
            cardAtivo.classList.add('active');
        }
    };
});