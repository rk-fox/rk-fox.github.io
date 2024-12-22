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

            // Definir valores do Set 1 e Set 2
            let setpt = 0;
            const set1 = [
                '67338357d9b2852bde4b077d',
                '67338298d9b2852bde4afb0d',
                '67338415d9b2852bde4b0dc6'
            ];

            let setb = 0;
            const set2 = [
                '6687cf817643815232d65da6',
                '6687cfd57643815232d65e39',
                '6687cf557643815232d65d5c',
                '6687cfae7643815232d65def'
            ];

            // Lógica para Set 1
            set1.forEach(miner_id => {
                if (counts[miner_id] === 2) setpt = 7500000;
                if (counts[miner_id] === 3) setpt = 15000000;
            });

            // Lógica para Set 2
            set2.forEach(miner_id => {
                if (counts[miner_id] === 2 || counts[miner_id] === 3) setb = 200;
                if (counts[miner_id] === 4) setb = 700;

                // Log para debug - Verificar se o miner_id está na lista e seu novo bônus
                const miner = filteredMiners.find(m => m.miner_id === miner_id);
                if (miner) {
                    console.log(`Miner ID: ${miner.miner_id}, Novo Bônus: ${miner.bonus_percent + setb}`);
                }
            });

            const results = filteredMiners.map(miner => {
                // Aplicando diretamente setb no bônus
                if (set2.includes(miner.miner_id)) {
                    miner.bonus_percent += setb; // Atualizando diretamente o bônus
                }

                // Calcular o novo poder
                const newpower = (((miners - miner.power) * (1 + (miner.bonus_percent / 100))) - (total_orig + setpt));

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
                bonus: `${((miner.bonus_percent) / 100).toFixed(2).replace('.', ',')}%`,
                newpower: convertPower(miner.newpower)                
            })));

            const updateElement = (index, miner) => {
                if (miner) {
                    const levelInfo = getLevelDescription(miner.level);
                    const levelSpan = `<span style="color: ${levelInfo.color}; font-weight: bold;">${levelInfo.text}</span> ${miner.name}`;
                    document.getElementById(`nome${index}`).innerHTML = levelSpan;
                    document.getElementById(`img${index}`).src = `https://static.rollercoin.com/static/img/market/miners/${miner.filename}.gif?v=1`;
                    document.getElementById(`img${index}`).style.display = 'block';
                    document.getElementById(`poder${index}`).innerText = convertPower2(miner.power);
                    document.getElementById(`bonus${index}`).innerText = `${((miner.bonus_percent) / 100).toFixed(2).replace('.', ',')}%`;
                    document.getElementById(`impact${index}`).innerText = convertPower(miner.newpower);
                    document.getElementById(`set${index}`).innerText = miner.is_in_set ? 'Sim' : 'Não';
                    document.getElementById(`merge${index}`).innerText = counts[miner.miner_id] > 1 ? 'Sim' : 'Não';

                    if (miner.placement.rack_info) {
                        const rack = miner.placement.rack_info;
                        document.getElementById(`rack${index}`).innerText = `Sala: ${rack.placement.room_level + 1}, Linha: ${rack.placement.y + 1}, Rack: ${rack.placement.x + 1}`;
                    }
                } else {
                    document.getElementById(`nome${index}`).innerText = '';
                }
            };

            top10NegativeResults.forEach((miner, i) => updateElement(i + 1, miner));

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Ocorreu um erro ao buscar os dados.');
        }
    });
});
