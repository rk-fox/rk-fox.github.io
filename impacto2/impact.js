document.addEventListener('DOMContentLoaded', () => {
    // Função para calcular o bônus extra com base nos IDs específicos
    function applyBonusAdjustment(miners, groups) {
        groups.forEach(({ ids, fullSetBonus, partialSetBonus }) => {
            const matchingMiners = miners.filter(miner => ids.includes(miner.miner_id));
            const bonusAdjustment =
                matchingMiners.length === 4 ? fullSetBonus :
                matchingMiners.length >= 2 ? partialSetBonus : 0;
            matchingMiners.forEach(miner => miner.bonus_percent += bonusAdjustment);
        });
    }

    // Função para converter valores de poder
    function convertPower(value) {
        if (value >= 1e6) return (value / 1e6).toFixed(3).replace('.', ',') + ' Phs';
        if (value >= 1e3) return (value / 1e3).toFixed(3).replace('.', ',') + ' Ths';
        return value.toFixed(3).replace('.', ',') + ' Ghs';
    }

    // Função para obter descrição de nível
    function getLevelDescription(level) {
        const levels = [
            { text: 'Common', color: '' },
            { text: 'Uncommon', color: '#2bff00' },
            { text: 'Rare', color: '#00eaff' },
            { text: 'Epic', color: '#ff00bb' },
            { text: 'Legendary', color: '#fffb00' },
            { text: 'Unreal', color: '#ff0000' }
        ];
        return levels[level] || { text: 'Unknown', color: '' };
    }

    // Função para exibir dados no console
    function displayMinerData(miners, totalPower, totalBonusPercent, adjustedPower) {
        console.log("Miners Data:", miners.map(miner => ({
            miner_id: miner.miner_id,
            name: miner.name,
            level: miner.level,
            power: miner.formattedPower,
            bonus_percent: miner.bonus_percent,
            width: miner.width,
            repetitions: miner.repetitions,
            room_level: miner.room_level,
            rack_x: miner.rack_x,
            rack_y: miner.rack_y
        })));
        console.log("Total Power:", convertPower(totalPower));
        console.log("Total Bonus Percent:", totalBonusPercent);
        console.log("Adjusted Power:", convertPower(adjustedPower));
    }

    // Evento do botão "Pesquisar"
    document.getElementById('searchButton').addEventListener('click', async () => {
        const userLink = document.getElementById('linkInput').value;
        if (!userLink) {
            alert('Por favor, digite o link da sala.');
            return;
        }

        try {
            const profileResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`);
            const profileData = await profileResponse.json();
            const { name: userName, avatar_id: avatarId } = profileData.data;

            if (!avatarId || !userName) {
                alert('Erro ao obter o avatar_id ou nome.');
                return;
            }

            document.getElementById('avatar').src = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${avatarId}.png`;
            document.getElementById('welcomeMessage').innerText = `Olá, ${userName}!`;

            const powerDataResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
            const powerData = await powerDataResponse.json();
            const miners = powerData.data.miners.map(miner => ({
                ...miner,
                formattedPower: convertPower(miner.power),
                bonus_percent: miner.bonus_percent / 100
            }));

            // Aplicando ajustes de bônus
            applyBonusAdjustment(miners, [
                { ids: ["66f1c200e0dd3530daa2eadf", "66f1c1b9e0dd3530daa2e9df", "66f1c18fe0dd3530daa2e8dd", "66f1c1dee0dd3530daa2ea96"], fullSetBonus: 10, partialSetBonus: 5 },
                { ids: ["6687cf817643815232d65da6", "6687cfd57643815232d65e39", "6687cf557643815232d65d5c", "6687cfae7643815232d65def"], fullSetBonus: 7, partialSetBonus: 2 }
            ]);

            const totalPower = miners.reduce((sum, miner) => sum + miner.power, 0);
            const totalBonusPercent = miners.reduce((sum, miner) => sum + miner.bonus_percent, 0);
            const adjustedPower = totalPower * (1 + totalBonusPercent / 100);

            displayMinerData(miners, totalPower, totalBonusPercent, adjustedPower);

        } catch (error) {
            console.error("Erro:", error);
            alert('Ocorreu um erro ao buscar os dados. Tente novamente.');
        }
    });
});
