const script_google = 'https://script.google.com/macros/s/AKfycbwcaI45b-FgWqcCjgyqkKQnxVhlTw8z2NDL0lggfTwOH0gVIJoThIIatDHV912fsVPu/exec';

// Função para fazer a requisição e chamar a função do Google Apps
function updateCounter() {
    fetch(`${script_google}`, {
        method: 'POST',
        mode: 'no-cors'  // Usado para fazer a requisição sem precisar de resposta
    })
    .then(response => {
        // Se a requisição for bem-sucedida, você pode fazer o que quiser com a resposta
        console.log('Contador atualizado com sucesso.');
    })
    .catch(error => {
        console.error('Erro ao fazer a requisição:', error);
    });
}

// Chama a função quando o site é carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounter();
});
