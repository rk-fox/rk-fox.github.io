const script_google = 'https://script.google.com/macros/s/AKfycbwcaI45b-FgWqcCjgyqkKQnxVhlTw8z2NDL0lggfTwOH0gVIJoThIIatDHV912fsVPu/exec';

// Atualizar a célula A2
function updateCounterA2() {
    fetch(`${script_google}`, {
        method: 'POST',
        mode: 'no-cors'
    });
}

// Atualiza A2 quando o site for carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounter();
});
