document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').addEventListener('click', async () => {
        const userLink = document.getElementById('linkInput').value;
        const resultsDiv = document.getElementById('results');

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
            document.getElementById('miners').textContent = `${convertPower(miners)}`;
            document.getElementById('bonusPercent').textContent = `${bonusPercent.toFixed(2)}%`;
            document.getElementById('bonus').textContent = `${convertPower(bonus)}`;
            document.getElementById('totalPower').textContent = `${convertPower(totalPower)}`;

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Erro ao buscar dados. Verifique o link e tente novamente.');
        }
    });

    document.getElementById('calculateButton').addEventListener('click', () => {
        // Pegue os valores atuais
        let miners = parseFloat(document.getElementById('miners').textContent) || 0;
        let bonusPercent = parseFloat(document.getElementById('bonusPercent').textContent) || 0;
        let totalPower = parseFloat(document.getElementById('totalPower').textContent) || 0;

        // Pegue os valores de entrada do usuário
        let sellPower = parseFloat(document.getElementById('sellPower').value) || 0;
        let sellBonus = parseFloat(document.getElementById('sellBonus').value) || 0;
        let buyPower = parseFloat(document.getElementById('buyPower').value) || 0;
        let buyBonus = parseFloat(document.getElementById('buyBonus').value) || 0;

        // Calcule os novos valores
        let newMiners = data.miners - (sellPower * 1000) + (buyPower * 1000);
        let newBonuspercent = bonusPercent - sellBonus + buyBonus;
        let newBonus = newMiners * newBonuspercent / 100;
        let newPower = newMiners + newBonus;

        // Atualize os resultados na tabela
        document.getElementById('newMiners').textContent = convertPower(newMiners);
        document.getElementById('newBonuspercent').textContent = `${newBonuspercent.toFixed(2)}%`;
        document.getElementById('newBonus').textContent = convertPower(newBonus);

        // Determine a cor e a seta para o newPower
        let powerChange = document.getElementById('powerChange');
        if (newPower > totalPower) {
            document.getElementById('newPower').textContent = convertPower(newPower);
            document.getElementById('newPower').style.color = 'green';
            powerChange.innerHTML = '↑';
            powerChange.style.color = 'green';
        } else if (newPower < totalPower) {
            document.getElementById('newPower').textContent = convertPower(newPower);
            document.getElementById('newPower').style.color = 'red';
            powerChange.innerHTML = '↓';
            powerChange.style.color = 'red';
        } else {
            document.getElementById('newPower').textContent = convertPower(newPower);
            document.getElementById('newPower').style.color = 'black';
            powerChange.innerHTML = '';
        }
    });

    // Função para converter o poder para a unidade apropriada
    function convertPower(power) {
        const absPower = Math.abs(power);
        let convertedPower;

        if (absPower >= 1e6) {
            convertedPower = (absPower / 1e6).toFixed(2) + ' PHs';
        } else if (absPower >= 1e3) {
            convertedPower = (absPower / 1e3).toFixed(2) + ' THs';
        } else {
            convertedPower = absPower.toFixed(2) + ' GHs';
        }

        return power < 0 ? '-' + convertedPower : convertedPower;
    }
});
