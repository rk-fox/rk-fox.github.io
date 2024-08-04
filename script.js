// Função para aplicar o modo escuro
function applyDarkMode() {
    document.body.classList.add('dark-mode');
    document.getElementById('toggle-dark-mode').checked = true;
}

// Função para remover o modo escuro
function removeDarkMode() {
    document.body.classList.remove('dark-mode');
    document.getElementById('toggle-dark-mode').checked = false;
}

// Verifica a preferência do usuário no localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    applyDarkMode();
}

// Evento de clique no toggle switch
document.getElementById('toggle-dark-mode').addEventListener('change', function() {
    if (this.checked) {
        applyDarkMode();
        localStorage.setItem('darkMode', 'enabled');
    } else {
        removeDarkMode();
        localStorage.setItem('darkMode', 'disabled');
    }
});
