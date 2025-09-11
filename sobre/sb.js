document.addEventListener('DOMContentLoaded', function () {
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