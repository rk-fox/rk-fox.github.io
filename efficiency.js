document.addEventListener('DOMContentLoaded', () => {
    // Variáveis globais para armazenar os dados
    let initialMiners = 0;
    let initialBonusPercent = 0;
    let initialBonus = 0;
    let currentMiners = 0;
    let currentBonusPercent = 0;
    let currentBonus = 0;
    let totalPower = 0;
    let finalPower = 0;
    let newPower = 0;

// Função para converter poder
function convertPower(value) {
    const absValue = Math.abs(value); // Obter o valor absoluto
    if (absValue >= 1e3) return (value / 1e3).toFixed(3).replace('.', ',') + ' THs';
    return value + ' GHs';
}

    document.getElementById('searchButton').addEventListener('click', async () => {
        const userLink = document.getElementById('linkInput').value;

        if (!userLink) {
            alert('Por favor, digite o link da sala.');
            return;
        }

        try {
            // Buscar avatar_id
            const profileResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`);
            const profileData = await profileResponse.json();
            const profileContents = JSON.parse(profileData.contents);
            const avatarId = profileContents.data.avatar_id;

            if (!avatarId) {
                alert('Erro ao obter o avatar_id.');
                return;
            }

            // Buscar dados de usuário
            const powerResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
            const powerData = await powerResponse.json();
            const powerContents = JSON.parse(powerData.contents);
            const data = powerContents.data;

            // Armazenar dados iniciais
            initialMiners = data.miners;
            initialBonusPercent = data.bonus_percent / 10000;
            initialBonus = initialMiners * initialBonusPercent;

            totalPower = initialMiners * (1 + initialBonusPercent);

            // Atualizar resultados na página
            document.getElementById('miners').textContent = convertPower(initialMiners);
            document.getElementById('bonusPercent').textContent = `${(initialBonusPercent * 100).toFixed(2).replace('.', ',')}%`;
            document.getElementById('bonus').textContent = convertPower(initialBonus).replace('.', ',');
            document.getElementById('totalPower').textContent = convertPower(totalPower).replace('.', ',');

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Erro ao buscar dados. Verifique o link e tente novamente.');
        }
    });

    document.getElementById('calculateButton').addEventListener('click', () => {
        // Pegue os valores atuais dos inputs do usuário
        let sellPower = parseFloat(document.getElementById('sellPower').value.replace(',', '.')) * 1000 || 0;
        let sellBonus = parseFloat(document.getElementById('sellBonus').value.replace(',', '.')) / 100 || 0;
        let buyPower = parseFloat(document.getElementById('buyPower').value.replace(',', '.')) * 1000 || 0;
        let buyBonus = parseFloat(document.getElementById('buyBonus').value.replace(',', '.')) / 100 || 0;

        // Calcule o novo poder total com a fórmula fornecida
        currentMiners = initialMiners - sellPower + buyPower;
        currentBonusPercent = initialBonusPercent - sellBonus + buyBonus;
        currentBonus = currentMiners * currentBonusPercent;
        newPower = currentMiners * (1 + (currentBonusPercent));
        finalPower = newPower - totalPower ;

        // Atualize os resultados na página
        document.getElementById('finalPower').textContent = convertPower(finalPower);
        document.getElementById('novoPower').textContent = convertPower(newPower);

        // Determine a cor e a seta para o newPower
        let powerChange = document.getElementById('powerChange');
        let newPowerElement = document.getElementById('finalPower');

        // Defina a cor com base na diferença entre newPower e totalPower
        if (finalPower > 1) { 
            newPowerElement.style.color = 'green';
            powerChange.innerHTML = '▲';
            powerChange.style.color = 'green';
        } else if (finalPower < -1) { 
            newPowerElement.style.color = 'red';
            powerChange.innerHTML = '▼';
            powerChange.style.color = 'red';
        } else {
            newPowerElement.style.color = 'black';
            powerChange.innerHTML = '';
        }
    });
    document.getElementById('calcButton').addEventListener('click', () => {
        // Pegue o valor de RLT do input do usuário
        let custoRLT = parseFloat(document.getElementById('custoInput')) || 0;
        let efiPower = parseFloat(document.getElementById('finalPower') || 0;
        let efiMiner = parseFloat(document.getElementById('buyPower') || 0;
        
        // Calcule a eficiência em Miner e Power
        efiMiner = custoRLT / (efiMiner / 1000);
        efiPower = custoRLT / (efiPower / 1000);

        // Atualize os resultados na página
        document.getElementById('effMiner').textContent = (efiMiner);
        document.getElementById('effPower').textContent = (efiPower);

        // Determine a cor e a seta para o newPower
        let conclusao = document.getElementById('conclusao');
        
        // Defina a cor com base na eficiência TOTAL
        if (efiPower <= 35) { 
            conclusaoElement.style.color = 'green';
            conclusao.innerHTML = 'EXCELENTE';
            conclusao.style.color = 'green';
        } else (finalPower > 35) { 
            conclusaoElement.style.color = 'red';
            conclusao.innerHTML = 'X';
            conclusao.style.color = 'red';
        }
    });
});
