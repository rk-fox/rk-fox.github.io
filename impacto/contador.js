const script_google = 'https://script.google.com/macros/s/AKfycbyiwGM4G3QVt0DQTPCKvpR0QglskRcnxCDmS_CfC4Ho-A5pUAvP5eAa0ehw27B-BMDM/exec';

// Atualizar a célula B2
function updateCounterB2() {
    fetch(`${script_google}?path=updateB2`, {
        method: 'POST',
        mode: 'no-cors'
    });
}

// Atualiza B2 quando o site for carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounterB2();
});
