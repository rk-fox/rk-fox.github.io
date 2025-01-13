const script_google = 'https://script.google.com/macros/s/AKfycbyS5c2Nr70VpAzYyM4cpGZtbm5wMWuX_AnhOJSHGg7ulIqs_1IH3opajMZoaQSlIBGP/exec';

// Atualizar a célula F2
function updateCounterF2() {
    fetch(`${script_google}`, {
        method: 'POST',
        mode: 'no-cors'
    });
}

// Atualiza F2 quando o site for carregado
document.addEventListener('DOMContentLoaded', function () {
    updateCounterF2();
});
