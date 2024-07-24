document.getElementById('searchButton').addEventListener('click', async () => {
    const userLink = document.getElementById('userLink').value;
    const resultsDiv = document.getElementById('results');
    
    if (!userLink) {
        alert('Por favor, digite o link da sala.');
        return;
    }

    try {
        // Buscar avatar_id
        const profileResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`);
        const profileData = await profileResponse.json();
        const avatarId = JSON.parse(profileData.contents).data.avatar_id;

        if (!avatarId) {
            alert('Erro ao obter o avatar_id.');
            return;
        }

        // Buscar dados de usuário
        const powerResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
        const powerData = await powerResponse.json();
        const data = JSON.parse(powerData.contents).data;

        const miners = data.miners;
        const bonusPercent = data.bonus_percent / 100;
        const bonus = miners * bonusPercent / 100;
        const totalPower = miners + bonus;

        // Atualizar resultados na página
        document.getElementById('miners').textContent = `Miners: ${miners}`;
        document.getElementById('bonusPercent').textContent = `Bônus (%): ${bonusPercent.toFixed(2)}`;
        document.getElementById('bonus').textContent = `Bônus: ${bonus.toFixed(2)}`;
        document.getElementById('totalPower').textContent = `Poder Total: ${totalPower.toFixed(2)}`;

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar dados. Verifique o link e tente novamente.');
    }
});
