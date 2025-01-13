const script_google = 'https://script.google.com/macros/s/AKfycbz8Sme6DpkwZ95wsCdV3HfR-BFoffEEPcD5Wu4Z7zvCXbToPwE7I_uk0UEWA1fMNGgQ/exec';

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
