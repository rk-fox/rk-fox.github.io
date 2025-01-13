const script_google = 'https://script.google.com/macros/s/AKfycbzQHIXDtfr5mNxm0EvtyUPvEBKl4c6kCa8-N-lf_VjoOQTkIG1RFNKsl0rdQrYN1DJm/exec';

document.addEventListener('DOMContentLoaded', function () {
    fetch(script_google, { method: 'POST' })
    .then(response => {
        alert('Contador atualizado');
    })
    .catch(error => {
        console.error('Erro ao atualizar contador', error);
    });
});
