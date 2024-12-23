// Função para calcular o bônus extra com base nos IDs específicos
function applyBonusAdjustment(miners, targetIds, fullSetBonus, partialSetBonus) {
    const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));
    const bonusAdjustment =
        matchingMiners.length === 4
            ? fullSetBonus
            : matchingMiners.length >= 2
            ? partialSetBonus
            : 0;

    matchingMiners.forEach(miner => {
        miner.bonus_percent += bonusAdjustment;
    });
}

// Função para converter valores de poder
function convertPower(value) {
    if (value >= 1e6) {
        return (value / 1e6).toFixed(3).replace('.', ',') + ' Phs';
    }
    if (value >= 1e3) {
        return (value / 1e3).toFixed(3).replace('.', ',') + ' Ths';
    }
    return value.toFixed(3).replace('.', ',') + ' Ghs';
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const userLink = document.getElementById('linkInput').value;

    if (!userLink) {
        alert('Por favor, digite o link da sala.');
        return;
    }

    try {
        const profileResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`);
        const profileData = await profileResponse.json();
        const userName = profileData.data.name;
        const avatarId = profileData.data.avatar_id;

        if (!avatarId || !userName) {
            alert('Erro ao obter o avatar_id ou nome.');
            return;
        }

        const avatarUrl = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${avatarId}.png`;
        document.getElementById('avatar').src = avatarUrl;
        document.getElementById('avatar').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Olá, ${userName}!`;

        const powerDataResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
        const powerData = await powerDataResponse.json();
        const miners = powerData.data.miners;
        let bonusPercent = powerData.data.bonus_percent;

        bonusPercent = parseFloat((bonusPercent / 100).toFixed(2));

        const total_orig = miners * (1 + (bonusPercent / 100));

        console.log('Dados do usuário:', {
            userName,
            avatarId,
            miners,
            bonusPercent,
            total_orig: convertPower(total_orig)
        });
    } catch (error) {
        console.error('Erro ao obter os dados:', error);
        alert('Erro ao obter os dados. Verifique o console para mais informações.');
    }
});

// Fazendo uma requisição à API para obter dados dinâmicos
fetch("https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/game/room-config/61849ec5bee39a0026d534e7")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(jsonData => {
        const miners = [];
        const minerCount = {};

        jsonData.data.miners.forEach(miner => {
            const key = `${miner.miner_id}_${miner.level}`;
            if (!minerCount[key]) {
                minerCount[key] = { count: 0, isFirst: true };
            }
            minerCount[key].count++;

            miners.push({
                miner_id: miner.miner_id,
                user_rack_id: miner.placement.user_rack_id,
                name: miner.name,
                width: miner.width,
                level: miner.level,
                power: miner.power,
                formattedPower: convertPower(miner.power),
                filename: miner.filename,
                bonus_percent: minerCount[key].isFirst ? miner.bonus_percent / 100 : 0,
                is_in_set: miner.is_in_set,
                repetitions: minerCount[key].isFirst ? "NÃO" : minerCount[key].count
            });

            minerCount[key].isFirst = false;
        });

        applyBonusAdjustment(miners, 
            ["66f1c200e0dd3530daa2eadf", "66f1c1b9e0dd3530daa2e9df", "66f1c18fe0dd3530daa2e8dd", "66f1c1dee0dd3530daa2ea96"], 
            10,
            5
        );
        applyBonusAdjustment(miners, 
            ["6687cf817643815232d65da6", "6687cfd57643815232d65e39", "6687cf557643815232d65d5c", "6687cfae7643815232d65def"], 
            7,
            2
        );

        const racks = jsonData.data.racks.map(rack => ({
            _id: rack._id,
            room_level: rack.placement.room_level,
            x: rack.placement.x,
            y: rack.placement.y
        }));

        miners.forEach(miner => {
            const rack = racks.find(r => r._id === miner.user_rack_id);
            if (rack) {
                miner.room_level = rack.room_level;
                miner.rack_x = rack.x;
                miner.rack_y = rack.y;
            }
        });

        const totalPower = miners.reduce((sum, miner) => sum + miner.power, 0);
        const totalBonusPercent = miners.reduce((sum, miner) => sum + miner.bonus_percent, 0);
        const adjustedPower = totalPower * ((100 + totalBonusPercent) / 100);

        const formattedTotalPower = convertPower(totalPower);
        const formattedAdjustedPower = convertPower(adjustedPower);

        const minerImpacts = miners.map(miner => {
            const remainingPower = totalPower - miner.power;
            const remainingBonusPercent = totalBonusPercent - miner.bonus_percent;
            const newAdjustedPower = remainingPower * ((100 + remainingBonusPercent) / 100);
            const impact = newAdjustedPower - adjustedPower;

            return { 
                ...miner, 
                impact, 
                formattedImpact: convertPower(Math.abs(impact))
            };
        });

        minerImpacts.sort((a, b) => b.impact - a.impact);

        console.log("Miners Data (formatted):", miners);
        console.log("Racks Data:", racks);
        console.log("Total Power:", formattedTotalPower);
        console.log("Total Bonus Percent:", totalBonusPercent);
        console.log("Adjusted Power (formatted):", formattedAdjustedPower);
        console.log("Miner Impacts (sorted):", minerImpacts);
    })
    .catch(error => {
        console.error("Erro ao obter dados da API:", error);
    });
