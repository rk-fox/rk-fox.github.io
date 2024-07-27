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
        bonusPercent = parseFloat((bonusPercent / 100).toFixed(2));  // Dividir por 100 e garantir que é um número

        // Calcular Poder Total
        const total_orig = miners * (1 + (bonusPercent / 100));

        console.log('Poder Total Original:', convertPower(total_orig));

        // Buscar dados de room-config usando avatarId
        const roomConfigResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/game/room-config/${avatarId}`);
        const roomConfigData = await roomConfigResponse.json();
        const roomConfigContents = JSON.parse(roomConfigData.contents);

        // Verificar a estrutura dos dados e extrair miners
        if (!Array.isArray(roomConfigContents.rooms)) {
            console.error('Dados inesperados em roomConfigContents:', roomConfigContents);
            alert('Erro ao buscar dados da configuração da sala.');
            return;
        }

        // Mapear os dados de miners
        let minersData = roomConfigContents.rooms.map(room => {
            if (room.miners && Array.isArray(room.miners)) {
                return room.miners.map(miner => ({
                    miner_id: miner.miner_id,
                    power: miner.power,
                    bonus_percent: miner.bonus_percent / 100  // Converter bonus_percent
                }));
            }
            return [];
        }).flat();

        // Calcular newpower e encontrar os 3 menores valores negativos
        let results = minersData.map(miner => {
            let newpower = (((miners - miner.power) * (1 + ((bonusPercent - miner.bonus_percent) / 100))) - total_orig);
            return {
                miner_id: miner.miner_id,
                newpower: newpower
            };
        });

        results.sort((a, b) => a.newpower - b.newpower);  // Ordenar por newpower

        // Encontrar os 3 miner_id com os menores valores negativos de newpower
        let top3Miners = results.filter(item => item.newpower < 0).slice(0, 3);

        console.log('Top 3 Miners com os menores valores negativos de newpower:', top3Miners);

    } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error);
        alert('Erro ao buscar dados do perfil.');
    }
});

});

