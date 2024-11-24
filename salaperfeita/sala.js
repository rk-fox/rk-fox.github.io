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

        // Ordena os dados pela coluna de Power (decrescente) para tentarmos otimizar
        jsonData.sort((a, b) => b.power - a.power);

        // Capacidade máxima da mochila (512 Cells)
        const capacidadeMaxima = 512;

        // Cria o array de "itens" para a mochila com as informações de peso (células) e valor (power ajustado com bonus)
        const itens = jsonData.map(miner => {
            const bonusPowerAdjusted = miner.bonus_power / 100; // Ajuste do bônus
            const valor = miner.power * (1 + bonusPowerAdjusted); // Valor do item
            return { 
                nome: miner.name.en,
                level: miner.level,
                filename: miner.filename,
                power: miner.power,
                bonus_power: miner.bonus_power,
                valor: valor,
                peso: miner.cells || 1 // Peso é 1 ou 2, conforme definido no JSON
            };
        });

        // Algoritmo de Programação Dinâmica para resolver o Problema da Mochila
        const dp = new Array(capacidadeMaxima + 1).fill(0);
        const escolha = new Array(capacidadeMaxima + 1).fill(null);

        for (let i = 0; i < itens.length; i++) {
            for (let j = capacidadeMaxima; j >= itens[i].peso; j--) {
                const novoValor = dp[j - itens[i].peso] + itens[i].valor;
                if (novoValor > dp[j]) {
                    dp[j] = novoValor;
                    escolha[j] = i;
                }
            }
        }

        // Reconstroi a solução
        const selecionados = [];
        let capacidadeRestante = capacidadeMaxima;

        while (capacidadeRestante > 0 && escolha[capacidadeRestante] !== null) {
            const minerSelecionado = itens[escolha[capacidadeRestante]];
            selecionados.push(minerSelecionado);
            capacidadeRestante -= minerSelecionado.peso;
        }

        // Selecionados agora contém os miners escolhidos pela mochila
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

        let totalPower = 0;
        let totalBonusPower = 0;
        let totalPowerComBonus = 0;

        selecionados.forEach(miner => {
            const row = document.createElement('tr');

            // Coluna da imagem
            const imgCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = `https://static.rollercoin.com/static/img/market/miners/${miner.filename}.gif`;
            img.alt = miner.nome;
            imgCell.appendChild(img);
            row.appendChild(imgCell);

            // Coluna com Level traduzido e Nome
            const infoCell = document.createElement('td');
            const levelTranslated = traduzirLevel(miner.level);
            const color = obterCorPorLevel(miner.level);
            infoCell.innerHTML = `<span style="color: ${color};">${levelTranslated}</span> ${miner.nome}`;
            row.appendChild(infoCell);

            // Coluna de Poder
            const powerCell = document.createElement('td');
            powerCell.textContent = miner.power;
            totalPower += miner.power;
            row.appendChild(powerCell);

            // Coluna de Bônus de Poder (ajustada para exibir com %)
            const bonusPowerCell = document.createElement('td');
            const bonusPercentage = (miner.bonus_power / 100).toFixed(2) + '%';
            bonusPowerCell.textContent = bonusPercentage;
            totalBonusPower += miner.bonus_power;
            row.appendChild(bonusPowerCell);

            // Adiciona a linha ao corpo da tabela
            tbody.appendChild(row);

            // Calcula o poder ajustado com o bônus para o total
            totalPowerComBonus += miner.power * (1 + (miner.bonus_power / 100));
        });

        // Adiciona o corpo da tabela à tabela principal
        tabela.appendChild(tbody);

        // Cria o rodapé da tabela para o somatório
        const tfoot = document.createElement('tfoot');
        const footerRow = document.createElement('tr');

        // Célula vazia para a coluna de imagem
        footerRow.appendChild(document.createElement('td'));

        // Célula de título para o somatório
        const totalLabelCell = document.createElement('td');
        totalLabelCell.innerHTML = '<strong>Total</strong>';
        footerRow.appendChild(totalLabelCell);

        // Célula com o somatório de Power
        const totalPowerCell = document.createElement('td');
        totalPowerCell.textContent = totalPower;
        footerRow.appendChild(totalPowerCell);

        // Célula com o somatório de Bônus de Poder
        const totalBonusPowerCell = document.createElement('td');
        const totalBonusPercentage = (totalBonusPower / 100).toFixed(2) + '%';
        totalBonusPowerCell.textContent = totalBonusPercentage;
        footerRow.appendChild(totalBonusPowerCell);

        // Adiciona o somatório de Power com Bônus
        const totalPowerComBonusCell = document.createElement('td');
        totalPowerComBonusCell.textContent = totalPowerComBonus.toFixed(2);
        footerRow.appendChild(totalPowerComBonusCell);

        // Adiciona a linha de rodapé ao rodapé da tabela
        tfoot.appendChild(footerRow);
        tabela.appendChild(tfoot);

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

// Função para obter a cor por nível
function obterCorPorLevel(level) {
    const colors = {
        0: '#5d615c', // Common
        1: '#2bff00', // Uncommon
        2: '#0084ff', // Rare
        3: '#fb00ff', // Epic
        4: '#ff0000', // Unreal
    };
    return colors[level] || '#000000'; // Preto como cor padrão para casos desconhecidos
}
