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
            document.getElementById('miners').textContent = `Miners: ${convertPower(miners)}`;
            document.getElementById('bonusPercent').textContent = `Bônus (%): ${bonusPercent.toFixed(2)}%`;
            document.getElementById('bonus').textContent = `Bônus: ${convertPower(bonus)}`;
            document.getElementById('totalPower').textContent = `Poder Total: ${convertPower(totalPower)}`;

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Erro ao buscar dados. Verifique o link e tente novamente.');
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
