const script_google = 'https://script.google.com/macros/s/AKfycbyKEeixfrwQq02uNQxBSpl1w6lUn31Q3ObHjJ2wNjdOfRwiIUHXgd3RrI7N9vioM4J2/exec';

// Atualizar a célula G2
function updateCounterG2() {
    fetch(`${script_google}`, {
        method: 'POST',
        mode: 'no-cors'
    });
}

// Atualiza G2 quando o site for carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounterG2();
});
