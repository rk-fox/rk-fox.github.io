const script_google = 'https://script.google.com/macros/s/AKfycbzczni1hzu4ZbwOgeOF6OxRDECu05uimOEbsrobN0LKw711L8TuX2q7PhXKpzgDmgRn/exec';

// Atualizar a célula C2
function updateCounterC2() {
    fetch(`${script_google}`, {
        method: 'POST',
        mode: 'no-cors'
    });
}

// Atualiza C2 quando o site for carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounterC2();
});
