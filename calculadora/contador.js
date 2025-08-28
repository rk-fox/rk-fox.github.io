const script_google = 'https://script.google.com/macros/s/AKfycbxXE-hJGU4J2b76mButw9dQggLONaWXanf8yMB9Iy2yHyAJwLlGwoZOwwsIiRhNpFYQ/exec';

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
