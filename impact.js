document.addEventListener('DOMContentLoaded', () => {
    // Variáveis globais para armazenar os dados


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
            const userName = profileContents.data.name;
            const avatarId = profileContents.data.avatar_id;

            if (!avatarId) {
                alert('Erro ao obter o avatar_id.');
                return;
            }
            if (!userName) {
                alert('Erro ao obter o avatar_id.');
                return;
            }

        // Exibir avatar e mensagem de boas-vindas
        const avatarUrl = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${avatarId}.png`;
        document.getElementById('avatar').src = avatarUrl;
        document.getElementById('avatar').style.display = 'block';  // Tornar a imagem visível
        document.getElementById('welcomeMessage').innerText = `Olá, ${userName}!`;

        // Buscar dados de user-power-data usando avatarId
        const powerDataResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
        const powerData = await powerDataResponse.json();
        const powerContents = JSON.parse(powerData.contents);
        const miners = powerContents.data.miners;
        let bonusPercent = powerContents.data.bonus_percent;

        // Processar bonus_percent
        bonusPercent = (bonusPercent / 100).toFixed(2).replace('.', ',');

        // Calcular Poder Total
        const total_orig = miners * (miners * (bonusPercent / 100));

        console.log('Poder Total:', convertPower(total_orig));
            

    } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error);
        alert('Erro ao buscar dados do perfil.');
    }
});

});

