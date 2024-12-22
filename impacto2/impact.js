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

            const results = filteredMiners.map(miner => {
                let setpt = 0;
                let setb = 0;

                // Verificar e atribuir os valores dos sets
                switch (miner.miner_id) {
                    case '67338357d9b2852bde4b077d':
                    case '67338298d9b2852bde4afb0d':
                    case '67338415d9b2852bde4b0dc6':
                        const set1Count = counts[miner.miner_id] || 0;
                        setpt = set1Count === 2 ? 7500000 : (set1Count === 3 ? 15000000 : 0);
                        break;
                    case '66c31b17b82bcb27662d302b':
                    case '66c31aecb82bcb27662d2f53':
                    case '66c31b3eb82bcb27662d30d8':
                        const set2Count = counts[miner.miner_id] || 0;
                        setpt = set2Count === 2 ? 5000000 : (set2Count === 3 ? 10000000 : 0);
                        break;
                    case '6687cea87643815232d65882':
                    case '6687cefd7643815232d65d11':
                    case '6687ce4e7643815232d65297':
                    case '6687ced67643815232d65cc8':
                        const set3Count = counts[miner.miner_id] || 0;
                        setpt = set3Count === 2 || set3Count === 3 ? 2000000 : (set3Count === 4 ? 3000000 : 0);
                        break;
                    case '6687cd307643815232d64077':
                    case '6687cdc47643815232d64726':
                    case '6687ccfc7643815232d6402d':
                    case '6687cd837643815232d640c1':
                        const set4Count = counts[miner.miner_id] || 0;
                        setpt = set4Count === 2 || set4Count === 3 ? 1500000 : (set4Count === 4 ? 2500000 : 0);
                        break;
                    case '674df56acbe1e47b27075ab6':
                    case '674df5c5cbe1e47b27075b51':
                    case '674df539cbe1e47b27075a68':
                    case '674df599cbe1e47b27075b04':
                        const set5Count = counts[miner.miner_id] || 0;
                        setpt = set5Count === 2 || set5Count === 3 ? 10000000 : (set5Count === 4 ? 25000000 : 0);
                        break;
                    case '66ead1cde0dd3530da969ea9':
                    case '66ead191e0dd3530da969e5f':
                        const set6Count = counts[miner.miner_id] || 0;
                        setpt = set6Count === 2 ? 5000000 : (set6Count === 3 ? 8000000 : 0);
                        break;
                    case '66f1c200e0dd3530daa2eadf':
                    case '66f1c1b9e0dd3530daa2e9df':
                    case '66f1c18fe0dd3530daa2e8dd':
                    case '66f1c1dee0dd3530daa2ea96':
                        const set7Count = counts[miner.miner_id] || 0;
                        setb = set7Count === 2 || set7Count === 3 ? 500 : (set7Count === 4 ? 1000 : 0);
                        break;
                    case '6687cf817643815232d65da6':
                    case '6687cfd57643815232d65e39':
                    case '6687cf557643815232d65d5c':
                    case '6687cfae7643815232d65def':
                        const set8Count = counts[miner.miner_id] || 0;
                        setb = set8Count === 2 || set8Count === 3 ? 200 : (set8Count === 4 ? 700 : 0);
                        break;
                }

                // Ajustar fórmula de newBonusPercent para Set 7 e Set 8
                let newBonusPercent = counts[miner.miner_id] > 1 ? bonusPercent : (bonusPercent - (miner.bonus_percent / 100));
                if (setb) {
                    newBonusPercent = counts[miner.miner_id] > 1 ? bonusPercent : (bonusPercent - ((miner.bonus_percent + setb) / 100));
                }

                const newpower = (((miners - miner.power) * (1 + (newBonusPercent / 100))) - (total_orig + setpt));

                return {
                    ...miner,
                    newpower: newpower,
                    setpt: setpt,
                    setb: setb
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
                bonus: `${(miner.bonus_percent / 100).toFixed(2).replace('.', ',')}%`,
                newpower: convertPower(miner.newpower)                
            })));

            const updateElement = (index, miner) => {
                if (miner) {
                    const levelInfo = getLevelDescription(miner.level);
                    const levelSpan = `<span style="color: ${levelInfo.color}">${levelInfo.text}</span>`;

                    document.getElementById(`miner${index}name`).textContent = `${miner.name} (${levelSpan})`;
                    document.getElementById(`miner${index}power`).textContent = convertPower(miner.power);
                    document.getElementById(`miner${index}newpower`).textContent = convertPower(miner.newpower);
                    document.getElementById(`miner${index}bonus`).textContent = `${(miner.bonus_percent / 100).toFixed(2).replace('.', ',')}%`;
                }
            };

            top10NegativeResults.forEach((miner, index) => {
                updateElement(index + 1, miner);
            });
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    });
});
