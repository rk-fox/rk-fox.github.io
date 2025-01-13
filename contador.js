const script_google = 'https://script.google.com/macros/s/AKfycbyiwGM4G3QVt0DQTPCKvpR0QglskRcnxCDmS_CfC4Ho-A5pUAvP5eAa0ehw27B-BMDM/exec';

// Atualizar a célula A2
function updateCounterA2() {
    fetch(`${script_google}`, {
        method: 'POST',
        mode: 'no-cors'
    });
}

// Atualiza A2 quando o site for carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounterA2();
});
