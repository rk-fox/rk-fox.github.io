function processarDados() {
    // Obtém os dados do campo de input
    const inputData = document.getElementById('inputData').value;

    try {
        // Parseia os dados do JSON colado pelo usuário
        const jsonData = JSON.parse(inputData);

        // Verifica se há dados válidos para processar
        if (!jsonData || !Array.isArray(jsonData)) {
            alert('Os dados JSON fornecidos são inválidos.');
            return;
        }

        // Seleciona o container onde a tabela será inserida
        const tabelaContainer = document.getElementById('tabelaContainer');
        tabelaContainer.innerHTML = ''; // Limpa qualquer tabela existente

        // Cria a tabela
        const tabela = document.createElement('table');

        // Cria o cabeçalho da tabela
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Imagem', 'Informações', 'Poder', 'Bônus de Poder'];

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        tabela.appendChild(thead);

        // Cria o corpo da tabela
        const tbody = document.createElement('tbody');

        jsonData.forEach(miner => {
            const row = document.createElement('tr');

            // Coluna da imagem
            const imgCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = `https://static.rollercoin.com/static/img/market/miners/${miner.filename}.gif`;
            img.alt = miner.name;
            imgCell.appendChild(img);
            row.appendChild(imgCell);

            // Coluna com Level traduzido e Nome
            const infoCell = document.createElement('td');
            const levelTranslated = traduzirLevel(miner.level);
            
            // Corrigir o nome, caso seja um objeto ou undefined
            const minerName = typeof miner.name === 'string' ? miner.name : (miner.name && miner.name.display ? miner.name.display : 'Nome Desconhecido');
            infoCell.innerHTML = `<strong>Level:</strong> ${levelTranslated}<br><strong>Nome:</strong> ${minerName}`;
            row.appendChild(infoCell);

            // Coluna de Poder
            const powerCell = document.createElement('td');
            powerCell.textContent = miner.power;
            row.appendChild(powerCell);

            // Coluna de Bônus de Poder
            const bonusPowerCell = document.createElement('td');
            bonusPowerCell.textContent = miner.bonus_power;
            row.appendChild(bonusPowerCell);

            // Adiciona a linha ao corpo da tabela
            tbody.appendChild(row);
        });

        // Adiciona o corpo da tabela à tabela principal
        tabela.appendChild(tbody);

        // Insere a tabela no container
        tabelaContainer.appendChild(tabela);
    } catch (error) {
        alert('Erro ao processar os dados JSON: ' + error.message);
    }
}
// Função para traduzir o nível
function traduzirLevel(level) {
    const levels = {
        0: 'Common',
        1: 'Uncommon',
        2: 'Rare',
        3: 'Epic',
        4: 'Legendary',
        5: 'Unreal'
    };
    return levels[level] || 'Desconhecido'; // Retorna 'Desconhecido' se o nível não for encontrado
}
