// Função para converter o poder
function convertPower(value) {
    let convertedValue;
    if (value.endsWith('PHs')) {
        convertedValue = parseFloat(value) * 1e6;
    } else if (value.endsWith('THs')) {
        convertedValue = parseFloat(value) * 1e3;
    } else if (value.endsWith('GHs')) {
        convertedValue = parseFloat(value);
    } else {
        convertedValue = parseFloat(value);
    }
    return convertedValue;
}

// Função para buscar os dados da API
async function fetchPowerData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Função para exibir os dados na tela
function displayPowerData(miners, bonusPercent) {
    const minersElement = document.getElementById('miners');
    const bonusPercentElement = document.getElementById('bonusPercent');
    const bonusElement = document.getElementById('bonus');
    const totalPowerElement = document.getElementById('totalPower');

    const bonus = miners * (bonusPercent / 100);
    const totalPower = miners + bonus;

    minersElement.textContent = `${(miners / 1e6).toFixed(2)} PHs`;
    bonusPercentElement.textContent = `${bonusPercent.toFixed(2)} %`;
    bonusElement.textContent = `${(bonus / 1e6).toFixed(2)} PHs`;
    totalPowerElement.textContent = `${(totalPower / 1e6).toFixed(2)} PHs`;
}

// Função para calcular novos valores com base nos inputs do usuário
function calculateNewValues() {
    const minersElement = document.getElementById('miners');
    const bonusPercentElement = document.getElementById('bonusPercent');
    const totalPowerElement = document.getElementById('totalPower');

    const originalMiners = convertPower(minersElement.textContent);
    const originalBonusPercent = parseFloat(bonusPercentElement.textContent);

    const sellPowerInput = document.querySelectorAll('.power-input')[0].value + 'THs';
    const sellBonusInput = document.querySelectorAll('.bonus-input')[0].value;
    const buyPowerInput = document.querySelectorAll('.power-input')[1].value + 'THs';
    const buyBonusInput = document.querySelectorAll('.bonus-input')[1].value;

    const sellPower = convertPower(sellPowerInput);
    const sellBonus = parseFloat(sellBonusInput);
    const buyPower = convertPower(buyPowerInput);
    const buyBonus = parseFloat(buyBonusInput);

    const newMiners = originalMiners - sellPower + buyPower;
    const newBonusPercent = originalBonusPercent - sellBonus + buyBonus;
    const newBonus = newMiners * (newBonusPercent / 100);
    const newTotalPower = newMiners + newBonus;

    // Exibir resultados
    let resultColorClass = 'unchanged';
    if (newTotalPower > (originalMiners + originalMiners * (originalBonusPercent / 100))) {
        resultColorClass = 'increased';
    } else if (newTotalPower < (originalMiners + originalMiners * (originalBonusPercent / 100))) {
        resultColorClass = 'decreased';
    }

    totalPowerElement.textContent = `${(newTotalPower / 1e6).toFixed(2)} PHs`;
    totalPowerElement.className = resultColorClass;
}

// Adicionando evento ao botão de pesquisa
document.getElementById('searchButton').addEventListener('click', async () => {
    const linkInput = document.getElementById('linkInput').value;
    const avatarId = linkInput.split('/').pop();
    const powerDataUrl = `https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/user-power-data/${avatarId}`;

    const powerData = await fetchPowerData(powerDataUrl);
    const miners = powerData.data.miners;
    const bonusPercent = powerData.data.bonus_percent / 100;

    displayPowerData(miners, bonusPercent);
});

// Adicionando evento ao botão de calcular
document.getElementById('calculateButton').addEventListener('click', () => {
    calculateNewValues();
});
