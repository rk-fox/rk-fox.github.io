const script_google = 'https://script.google.com/macros/s/AKfycbyiwGM4G3QVt0DQTPCKvpR0QglskRcnxCDmS_CfC4Ho-A5pUAvP5eAa0ehw27B-BMDM/exec';

document.addEventListener('DOMContentLoaded', function () {
    fetch(script_google, { method: 'POST', mode: 'no-cors' });
});
