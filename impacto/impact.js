document.addEventListener('DOMContentLoaded', () => {
    // Função para converter poder
    function convertPower(value) {
        const absValue = Math.abs(value); // Obter o valor absoluto
        if (absValue >= 1e3) return (value / 1e3).toFixed(3).replace('.', ',') + ' THs';
        return (value).toFixed(3).replace('.', ',') + ' GHs';
    }

    function convertPower2(value) {
        const absValue = Math.abs(value); // Obter o valor absoluto
        if (absValue >= 1e3) return (value / 1e3).toFixed(3).replace('.', ',') + ' THs';
        return (value) + ' GHs';
    }

    // Função para atribuir setpt
    function calculateSetPt(minerIds) {
        let setpt = 0;
        
        // Set 1
        const set1Ids = [
            '67338357d9b2852bde4b077d',
            '67338298d9b2852bde4afb0d',
            '67338415d9b2852bde4b0dc6'
        ];
        const set1Count = minerIds.filter(id => set1Ids.includes(id)).length;
        if (set1Count === 2) setpt = 7500000;
        else if (set1Count === 3) setpt = 15000000;

        // Set 2
        const set2Ids = [
            '66c31b17b82bcb27662d302b',
            '66c31aecb82bcb27662d2f53',
            '66c31b3eb82bcb27662d30d8'
        ];
        const set2Count = minerIds.filter(id => set2Ids.includes(id)).length;
        if (set2Count === 2) setpt = 5000000;
        else if (set2Count === 3) setpt = 10000000;

        // Set 3
        const set3Ids = [
            '6687cea87643815232d65882',
            '6687cefd7643815232d65d11',
            '6687ce4e7643815232d65297',
            '6687ced67643815232d65cc8'
        ];
        const set3Count = minerIds.filter(id => set3Ids.includes(id)).length;
        if (set3Count >= 2 && set3Count <= 3) setpt = 2000000;
        else if (set3Count === 4) setpt = 3000000;

        // Set 4
        const set4Ids = [
            '6687cd307643815232d64077',
            '6687cdc47643815232d64726',
            '6687ccfc7643815232d6402d',
            '6687cd837643815232d640c1'
        ];
        const set4Count = minerIds.filter(id => set4Ids.includes(id)).length;
        if (set4Count >= 2 && set4Count <= 3) setpt = 1500000;
        else if (set4Count === 4) setpt = 2500000;

        // Set 5
        const set5Ids = [
            '674df56acbe1e47b27075ab6',
            '674df5c5cbe1e47b27075b51',
            '674df539cbe1e47b27075a68',
            '674df599cbe1e47b27075b04'
        ];
        const set5Count = minerIds.filter(id => set5Ids.includes(id)).length;
        if (set5Count >= 2 && set5Count <= 3) setpt = 10000000;
        else if (set5Count === 4) setpt = 25000000;

        // Set 6
        const set6Ids = [
            '66ead1cde0dd3530da969ea9',
            '66ead191e0dd3530da969e5f',
            '66ead191e0dd3530da969e5f'
        ];
        const set6Count = minerIds.filter(id => set6Ids.includes(id)).length;
        if (set6Count === 2) setpt = 5000000;
        else if (set6Count === 3) setpt = 8000000;

        return setpt;
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

            const roomConfigResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/game/room-config/${avatarId}`);
            const roomConfigData = await roomConfigResponse.json();
            const minerData = roomConfigData.data.miners;
            const racks = roomConfigData.data.racks;

            minerData.forEach(miner => {
                const rack = racks.find(r => r._id === miner.placement.user_rack_id);
                if (rack) {
                    miner.placement.rack_info = rack;
                }
            });

            const selectedOption = document.querySelector('input[name="option"]:checked').value;
            let filteredMiners = minerData;
            if (selectedOption === 'op1') {
                filteredMiners = minerData.filter(miner => miner.width === 1);
            } else if (selectedOption === 'op2') {
                filteredMiners = minerData.filter(miner => miner.width === 2);
            }

            function countRepetitions(minerIds) {
                const counts = minerIds.reduce((acc, id) => {
                    acc[id] = (acc[id] || 0) + 1;
                    return acc;
                }, {});
                return counts;
            }

            const minerIds = filteredMiners.map(miner => miner.miner_id);
            const counts = countRepetitions(minerIds);

            const setpt = calculateSetPt(minerIds); // Atribuindo o valor de setpt

            const results = filteredMiners.map(miner => {
                const newBonusPercent = counts[miner.miner_id] > 1 ? bonusPercent : (bonusPercent - (miner.bonus_percent / 100));
                const newpower = (((miners - miner.power) * (1 + (newBonusPercent / 100))) - (total_orig + setpt)); // Aplicando o setpt na fórmula
                
                return {
                    ...miner,
                    newpower: newpower
                };
            });

            const negativeResults = results.filter(result => result.newpower < 0);
            negativeResults.sort((a, b) => Math.abs(a.newpower) - Math.abs(b.newpower));
            const top10NegativeResults = negativeResults.slice(0, 10);

            // Logar 30 resultados negativos no console
            const top30NegativeResults = negativeResults.slice(0, 30);
            console.log(top30NegativeResults.map(miner => ({
                name: miner.name,
                power: convertPower(miner.power),
                bonus: `${(miner.bonus_percent * 100).toFixed(2)} %`,
                newpower: convertPower(miner.newpower),
            })));

            updateResultsTable(top10NegativeResults);

        } catch (error) {
            console.error(error);
        }
    });
});
