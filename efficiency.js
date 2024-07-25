document.addEventListener('DOMContentLoaded', () => {
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

            const miners = data.miners;
            const bonusPercent = data.bonus_percent / 100;
            const bonus = miners * bonusPercent / 100;
            const totalPower = miners + bonus;

            // Atualizar resultados na página
            document.getElementById('miners').textContent = convertPower(miners);
            document.getElementById('bonusPercent').textContent = `${(bonusPercent * 100).toFixed(2).replace('.', ',')}%`;
            document.getElementById('bonus').textContent = convertPower(bonus);
            document.getElementById('totalPower').textContent = convertPower(totalPower);

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Erro ao buscar dados. Verifique o link e tente novamente.');
        }
    });

    document.getElementById('calculateButton').addEventListener('click', () => {
        // Pegue os valores atuais
        let miners = parseFloat(document.getElementById('miners').textContent.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
        let bonusPercent = parseFloat(document.getElementById('bonusPercent').textContent.replace(/[^0-9.,]/g, '').replace(',', '.')) / 100 || 0;
        let totalPower = parseFloat(document.getElementById('totalPower').textContent.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;

        // Pegue os valores de entrada do usuário e converta de GHs para unidades adequadas
        let sellPower = parseFloat(document.getElementById('sellPower').value.replace(',', '.')) * 1000 || 0;
        let sellBonus = parseFloat(document.getElementById('sellBonus').value.replace(',', '.')) || 0;
        let buyPower = parseFloat(document.getElementById('buyPower').value.replace(',', '.')) * 1000 || 0;
        let buyBonus = parseFloat(document.getElementById('buyBonus').value.replace(',', '.')) || 0;

        // Calcule os novos valores
        let newMiners = miners - (sellPower / 1000) + (buyPower / 1000);
        let newBonusPercent = bonusPercent - (sellBonus / 100) + (buyBonus / 100);
        let newBonus = newMiners * newBonusPercent;
        let newPower = newMiners + newBonus;

        // Atualize os resultados na tabela
        document.getElementById('newMiners').textContent = convertPower(newMiners);
        document.getElementById('newBonuspercent').textContent = `${(newBonusPercent * 100).toFixed(2).replace('.', ',')}%`;
        document.getElementById('newBonus').textContent = convertPower(newBonus);

        // Determine a cor e a seta para o newPower
        let powerChange = document.getElementById('powerChange');
        let newPowerElement = document.getElementById('newPower');

        // Defina a cor com base na diferença entre newPower e totalPower
        if (newPower > totalPower + 1) {
            newPowerElement.textContent = convertPower(newPower);
            newPowerElement.style.color = 'green';
            powerChange.innerHTML = '▲';
            powerChange.style.color = 'green';
        } else if (newPower < totalPower - 1) {
            newPowerElement.textContent = convertPower(newPower);
            newPowerElement.style.color = 'red';
            powerChange.innerHTML = '▼';
            powerChange.style.color = 'red';
        } else {
            newPowerElement.textContent = convertPower(newPower);
            newPowerElement.style.color = 'black';
            powerChange.innerHTML = '';
        }
    });

    // Função para converter o poder para a unidade apropriada
    function convertPower(power) {
        const absPower = Math.abs(power);
        let convertedPower;

        if (absPower >= 1e6) {
            convertedPower = (absPower / 1e6).toFixed(2).replace('.', ',') + ' PHs';
        } else if (absPower >= 1e3) {
            convertedPower = (absPower / 1e3).toFixed(2).replace('.', ',') + ' THs';
        } else {
            convertedPower = absPower.toFixed(2).replace('.', ',') + ' GHs';
        }

        return power < 0 ? '-' + convertedPower : convertedPower;
    }
});
