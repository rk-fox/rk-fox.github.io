document.getElementById('searchButton').addEventListener('click', async () => {
    const userLink = document.getElementById('linkInput').value;

    if (!userLink) {
        alert('Por favor, digite o link da sala.');
        return;
    }

    try {
        const profileResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`);
        const profileData = await profileResponse.json();
        userName = profileData.data.name; // Atualiza o valor global
        avatarId = profileData.data.avatar_id; // Atualiza o valor global
        
        if (!avatarId) {
            alert('Erro ao obter avatarId.');
            return;
        }

        const avatarUrl = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${avatarId}.png`;
        document.getElementById('avatar').src = avatarUrl;
        document.getElementById('avatar').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Olá, ${userName}!`;

        const powerDataResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
        const powerData = await powerDataResponse.json();

        if (!powerData.data || !powerData.data.miners || !powerData.data.racks) {
            console.error("Dados inesperados recebidos da API:", powerData);
            return;
        }

        const miners = [];
        let bonusPercent = powerData.data.bonus_percent;

        bonusPercent = parseFloat((bonusPercent / 100).toFixed(2));

        const total_orig = powerData.data.miners.reduce((sum, miner) => sum + miner.power, 0) * (1 + (bonusPercent / 100));

        console.log('Dados do usuário:', {
            userName,
            avatarId,
            miners,
            bonusPercent,
            total_orig: convertPower(total_orig)
        });
