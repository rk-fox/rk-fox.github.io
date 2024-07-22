document.addEventListener("DOMContentLoaded", function() {
    // Lista de IDs dos usuários
    const userIds = [
        '61e852b4dc27dc001969efa3',
        '61e484ca5aa1be001868f065',
        '65de9e82a1e9f41193e2f6cc'
    ];

    // Função para realizar a requisição e processar a resposta
    function fetchUserData(userId) {
        return new Promise((resolve, reject) => {
            const url = `https://rollercoin.free.mockoapp.net/get?url=${encodeURIComponent(`https://rollercoin.com/api/profile/user-power-data/${userId}`)}`;
            
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(`Erro ${xhr.status}: ${xhr.statusText}`);
                }
            };

            xhr.onerror = function() {
                reject('Erro de rede');
            };

            xhr.send();
        });
    }

    // Preencher a tabela com os dados dos usuários
    function populateTable(userData) {
        const tableBody = document.querySelector('#user-table tbody');
        
        userIds.forEach(userId => {
            fetchUserData(userId)
                .then(data => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${userId}</td>
                        <td>${JSON.stringify(data)}</td>
                    `;
                    tableBody.appendChild(row);
                })
                .catch(error => {
                    console.error(error);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${userId}</td>
                        <td>Erro ao carregar dados</td>
                    `;
                    tableBody.appendChild(row);
                });
        });
    }

    // Inicializar o preenchimento da tabela
    populateTable();
});
