// Supondo que `rewards` seja um array de objetos como o JSON fornecido
rewards.forEach(reward => {
    let row = document.createElement('tr');
    
    // Cria a célula para o nível
    let cellLevel = document.createElement('td');
    cellLevel.textContent = reward.required_level || '-';
    row.appendChild(cellLevel);
    
    // Calcula e atualiza o XP total
    let cellXPValue = levelXPMap[reward.required_level] || 0;
    totalXP += parseFloat(cellXPValue);

    let cellXP = document.createElement('td');
    cellXP.textContent = cellXPValue || '-';
    row.appendChild(cellXP);

    let cellTotalXP = document.createElement('td');
    cellTotalXP.textContent = Math.floor(totalXP); // Remove as casas decimais
    row.appendChild(cellTotalXP);

    // Cria a célula para a quantidade e imagem
    let cellAmount = document.createElement('td');
    
    if (reward.type === 'money') {
        // Define a imagem fixa baseada na moeda
        let currencyImageURL = reward.currency === 'rlt'
            ? 'https://static.rollercoin.com/static/img/icons/currencies/rlt.svg'
            : 'https://static.rollercoin.com/static/img/icons/currencies/rst.svg';

        // Cria a imagem para a moeda
        let currencyImage = document.createElement('img');
        currencyImage.src = currencyImageURL;
        currencyImage.alt = reward.currency;
        currencyImage.style.width = '20px'; // Define o tamanho da imagem
        currencyImage.style.height = 'auto'; // Mantém a proporção da altura

        // Adiciona a imagem e a quantidade formatada à célula
        cellAmount.appendChild(currencyImage);
        cellAmount.appendChild(document.createTextNode(` ${ (reward.amount / 1000000).toFixed(2) } ${ reward.currency }`));
    } else if (reward.type === 'miner') {
        // Construa a URL da imagem do minerador
        const baseURL = "https://static.rollercoin.com/static/img/market/miners/";
        const filename = reward.item.filename;
        const imageURL = `${baseURL}${filename}.gif`;

        // Cria a imagem para o minerador
        let minerImage = document.createElement('img');
        minerImage.src = imageURL;
        minerImage.alt = reward.item.name.en;
        minerImage.style.width = '50px'; // Define o tamanho da imagem
        minerImage.style.height = 'auto'; // Mantém a proporção da altura

        // Adiciona a imagem, nível e nome do item à célula
        cellAmount.appendChild(minerImage);
        cellAmount.appendChild(document.createTextNode(` Level: ${reward.item.level || '-'} ${reward.item.name?.en || '-'}`));
    } else {
        cellAmount.textContent = '-';
    }

    row.appendChild(cellAmount);

    let cellPower = document.createElement('td');
    cellPower.textContent = reward.item?.power || '-';
    row.appendChild(cellPower);

    let cellBonus = document.createElement('td');
    cellBonus.textContent = (reward.bonus / 100).toFixed(2) || '-';
    row.appendChild(cellBonus);

    let cellCanBeSoldOnMP = document.createElement('td');
    cellCanBeSoldOnMP.textContent = reward.is_can_be_sold_on_mp ? '' : 'X';
    row.appendChild(cellCanBeSoldOnMP);

    // Nova célula para o valor personalizado, editável pelo usuário
    let cellCustomValue = document.createElement('td');
    let input = document.createElement('input');
    input.type = 'number';  // Define o tipo como numérico
    input.name = 'cellValor';  // Nome para identificação do input
    input.value = '';  // Valor padrão

    cellCustomValue.appendChild(input);
    row.appendChild(cellCustomValue);

    tableBody.appendChild(row);
});
