const script_google = 'https://script.google.com/macros/s/AKfycbzQHIXDtfr5mNxm0EvtyUPvEBKl4c6kCa8-N-lf_VjoOQTkIG1RFNKsl0rdQrYN1DJm/exec' ;
const dados_cont = 1;

dados_cont.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch(script_google, { method: 'POST', body: new FormData(dados_cont) })
    .then(response => {
        alert('Contador atualizado', response);
    })
    .catch(error => {
        console.error('Erro no contador', error);
});
});
