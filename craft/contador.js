const script_google = 'https://script.google.com/macros/s/AKfycbx_7K6yHodCjqrHr0x3IdVUVD4jUWRcteOpjPNcVw_wyw4dh-R84p8TrWmFRRuwlvOz/exec';

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
