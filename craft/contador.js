const script_google = 'https://script.google.com/macros/s/AKfycbwjBJ7wYfdGS9qNIMupNY8_QjptCVBoBYDMOiYH0v83P05hWs82Rm4U08SBBooOB5u6/exec';

// Atualizar a célula D2
function updateCounterD2() {
    fetch(`${script_google}`, {
        method: 'POST',
        mode: 'no-cors'
    });
}

// Atualiza D2 quando o site for carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounterD2();
});
