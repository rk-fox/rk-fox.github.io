const script_google = 'https://script.google.com/macros/s/AKfycbw9TfgggqeY_ByvmDb15Vgi6DfOaPjc5FyIb_yCjkMBIXE7toViYYj1UerBJw6KUcWP/exec';

// Atualizar a célula B2
function updateCounterB2() {
    fetch(`${script_google}`, {
        method: 'POST',
        mode: 'no-cors'
    });
}

// Atualiza B2 quando o site for carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounterB2();
});
