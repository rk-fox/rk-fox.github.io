const script_google = 'https://script.google.com/macros/s/AKfycbwjBJ7wYfdGS9qNIMupNY8_QjptCVBoBYDMOiYH0v83P05hWs82Rm4U08SBBooOB5u6/exec';

// Atualizar a célula H2
function updateCounterH2() {
    fetch(`${script_google}`, {
        method: 'POST',
        mode: 'no-cors'
    });
}

// Atualiza H2 quando o site for carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounterH2();
});
