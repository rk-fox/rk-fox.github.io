// contador.js

// Função para inicializar a API do Google Sheets
function initGoogleSheetsAPI() {
    gapi.client.init({
        apiKey: 'AIzaSyA2_BzWS3OLThXJGVk4hSHmyIV4RLb3n5E',  // Sua chave de API
    }).then(() => {
        gapi.client.load('sheets', 'v4', () => {
            incrementCounter();
        });
    });
}

// Função para incrementar o contador na célula A2
function incrementCounter() {
    const spreadsheetId = '19_Z6oA0fdyEn5JYwTeEL-8QXmExH9YADyeOlCpu_XHg';  // ID da planilha
    const range = 'contador!A2';  // A célula A2 na aba "contador"
    
    // Obter o valor atual da célula A2
    const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=AIzaSyBP12YfPrz9MhCH3J7boeondSm7HYVCUvA`;

    fetch(getUrl)
        .then(response => response.json())
        .then(data => {
            let currentValue = parseInt(data.values[0][0], 10);  // Pegar o valor atual da célula A2
            currentValue = isNaN(currentValue) ? 0 : currentValue + 1;  // Incrementa 1 ao valor

            // Atualizar a célula A2 com o novo valor
            const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

            // Corpo da requisição de atualização
            const requestBody = {
                range: range,
                majorDimension: 'ROWS',
                values: [[currentValue]],
            };

            // Enviar a requisição PUT para atualizar a célula
            fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
            .then(response => response.json())
            .then(updatedData => {
                console.log('Célula A2 atualizada com sucesso!', updatedData);
            })
            .catch(error => {
                console.error('Erro ao atualizar a célula:', error);
            });
        })
        .catch(error => {
            console.error('Erro ao obter o valor da célula:', error);
        });
}

// Carregar a biblioteca da API do Google
function loadGoogleAPI() {
    gapi.load('client', initGoogleSheetsAPI);
}

// Chamar a função para carregar a API ao carregar a página
window.onload = function() {
    loadGoogleAPI();
};
