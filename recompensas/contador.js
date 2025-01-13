const script_google = 'https://script.google.com/macros/s/AKfycbyttnlhm-QW4XWlhEKhoQafvXWOv8a0znD7F0lFGPBYXC7VyqqULw_DIPNESVIkB7Qn/exec';

// Atualizar a célula E2
function updateCounterE2() {
    fetch(`${script_google}`, {
        method: 'POST',
        mode: 'no-cors'
    });
}

// Atualiza E2 quando o site for carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounterE2();
});
