const script_google = 'https://script.google.com/macros/s/AKfycbzQHIXDtfr5mNxm0EvtyUPvEBKl4c6kCa8-N-lf_VjoOQTkIG1RFNKsl0rdQrYN1DJm/exec';

document.addEventListener('DOMContentLoaded', function () {
    fetch(script_google, { method: 'POST', mode: 'no-cors' });
});
