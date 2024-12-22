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

    function getLevelDescription(level) {
        switch (level) {
            case 0: return { text: 'Common', color: '' };
            case 1: return { text: 'Uncommon', color: '#2bff00' };
            case 2: return { text: 'Rare', color: '#00eaff' };
            case 3: return { text: 'Epic', color: '#ff00bb' };
            case 4: return { text: 'Legendary', color: '#fffb00' };
            case 5: return { text: 'Unreal', color: '#ff0000' };
            default: return { text: 'Unknown', color: '' };
        }
    }

    function calculateSetBonus(counts) {
        let setpt = 0;
        let setb = 0;

        const sets = [
            { ids: ["67338357d9b2852bde4b077d", "67338298d9b2852bde4afb0d", "67338415d9b2852bde4b0dc6"], thresholds: [2, 3], ptValues: [7500000, 15000000] },
            { ids: ["66c31b17b82bcb27662d302b", "66c31aecb82bcb27662d2f53", "66c31b3eb82bcb27662d30d8"], thresholds: [2, 3], ptValues: [5000000, 10000000] },
            { ids: ["6687cea87643815232d65882", "6687cefd7643815232d65d11", "6687ce4e7643815232d65297", "6687ced67643815232d65cc8"], thresholds: [2, 4], ptValues: [2000000, 3000000] },
            { ids: ["6687cd307643815232d64077", "6687cdc47643815232d64726", "6687ccfc7643815232d6402d", "6687cd837643815232d640c1"], thresholds: [2, 4], ptValues: [1500000, 2500000] },
            { ids: ["674df56acbe1e47b27075ab6", "674df5c5cbe1e47b27075b51", "674df539cbe1e47b27075a68", "674df599cbe1e47b27075b04"], thresholds: [2, 4], ptValues: [10000000, 25000000] },
            { ids: ["66ead1cde0dd3530da969ea9", "66ead191e0dd3530da969e5f", "66ead191e0dd3530da969e5f"], thresholds: [2, 3], ptValues: [5000000, 8000000] },
            { ids: ["66f1c200e0dd3530daa2eadf", "66f1c1b9e0dd3530daa2e9df", "66f1c18fe0dd3530daa2e8dd", "66f1c1dee0dd3530daa2ea96"], thresholds: [2, 4], bValues: [500, 1000] },
            { ids: ["6687cf817643815232d65da6", "6687cfd57643815232d65e39", "6687cf557643815232d65d5c", "6687cfae7643815232d65def"], thresholds: [2, 4], bValues: [200, 700] }
        ];

        sets.forEach(set => {
            const count = set.ids.reduce((acc, id) => acc + (counts[id] || 0), 0);
            if (count >= set.thresholds[0]) {
                if (set.ptValues) {
                    setpt += set.ptValues[count === set.thresholds[1] ? 1 : 0];
                }
                if (set.bValues) {
                    setb += set.bValues[count === set.thresholds[1] ? 1 : 0];
                }
            }
        });

        return { setpt, setb };
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

            const minerIds = minerData.map(miner => miner.miner_id);
            const counts = minerIds.reduce((acc, id) => {
                acc[id] = (acc[id] || 0) + 1;
                return acc;
            }, {});

            const { setpt, setb } = calculateSetBonus(counts);

            const results = minerData.map(miner => {
                const newBonusPercent = counts[miner.miner_id] > 1 ? bonusPercent : (bonusPercent - ((miner.bonus_percent + setb) / 100));
                const newpower = (((miners - miner.power) * (1 + (newBonusPercent / 100))) - total_orig - setpt);

                return {
                    ...miner,
                    newpower: newpower
                };
            });

            console.log(results);

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Ocorreu um erro ao buscar os dados.');
        }
    });
});
