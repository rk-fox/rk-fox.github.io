document.addEventListener('DOMContentLoaded', () => {
    // Função para converter poder
    function convertPower(value) {
        const absValue = Math.abs(value); // Obter o valor absoluto
        if (absValue >= 1e3) return (value / 1e3).toFixed(3).replace('.', ',') + ' THs';
        return (value).toFixed(3).replace('.', ',') + ' GHs';
    }

    // Função para converter poder (apenas na exibição de miner em GHs)
    function convertPower2(value) {
        const absValue = Math.abs(value); // Obter o valor absoluto
        if (absValue >= 1e3) return (value / 1e3).toFixed(3).replace('.', ',') + ' THs';
        return (value) + ' GHs';
    }

    function getLevelDescription(level) {
        switch (level) {
            case 0:
                return 'Common';
            case 1:
                return 'Uncommon';
            case 2:
                return 'Rare';
            case 3:
                return 'Epic';
            case 4:
                return 'Legendary';
            case 5:
                return 'Unreal';
            default:
                return 'Unknown'; // Para qualquer valor inesperado
        }
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

            // Buscar dados de room-config usando avatarId
            const roomConfigResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/game/room-config/${avatarId}`);
            const roomConfigData = await roomConfigResponse.json();
            const roomConfigContents = JSON.parse(roomConfigData.contents);

            const minerData = roomConfigContents.data.miners.map(miner => {
                return {
                    miner_id: miner.miner_id,
                    power: miner.power,
                    bonus_percent: miner.bonus_percent,
                    name: miner.name,
                    level: miner.level,
                    slots: miner.width,
                    filename: miner.filename,
                    is_in_set: miner.is_in_set
                };
            });

            // Obter valor do rádio selecionado
            const selectedOption = document.querySelector('input[name="option"]:checked').value;

            // Filtrar minerData com base na opção selecionada
            let filteredMiners = minerData;
            if (selectedOption === 'op1') {
                filteredMiners = minerData.filter(miner => miner.slots === 1);
            } else if (selectedOption === 'op2') {
                filteredMiners = minerData.filter(miner => miner.slots === 2);
            }

            // Contar as repetições de miner_id
            function countRepetitions(minerIds) {
                const counts = minerIds.reduce((acc, id) => {
                    acc[id] = (acc[id] || 0) + 1;
                    return acc;
                }, {});

                return counts;
            }

            // Array com os miner_id dos mineradores filtrados
            const minerIds = filteredMiners.map(miner => miner.miner_id);

            // Contar as repetições
            const counts = countRepetitions(minerIds);

            // Calcular newpower para cada miner e armazenar todos os mineradores negativos
            const results = filteredMiners.map(miner => {
                // Ajustar o cálculo do newBonusPercent com base nas repetições
                const newBonusPercent = counts[miner.miner_id] > 1 ? bonusPercent : (bonusPercent - (miner.bonus_percent / 100));
                const newpower = (((miners - miner.power) * (1 + (newBonusPercent / 100))) - total_orig);
                
                return {
                    ...miner,
                    newpower: newpower
                };
            });

            const negativeResults = results.filter(result => result.newpower < 0);

            // Ordenar os mineradores negativos com base no impacto (newpower), mais próximo de zero
            negativeResults.sort((a, b) => Math.abs(a.newpower) - Math.abs(b.newpower));

            // Selecionar os 3 mineradores com impacto mais próximo de zero
            const top3NegativeResults = negativeResults.slice(0, 3);

            // Logar todos os mineradores negativos no console
            console.log('Mineradores com valores negativos:');
            top3NegativeResults.forEach(miner => {
                console.log(`Nome: ${getLevelDescription(miner.level)} ${miner.name}`);
                console.log(`Poder: ${convertPower2(miner.power)}`);
                console.log(`Bônus: ${(miner.bonus_percent / 100).toFixed(2).replace('.', ',')}%`);
                console.log(`Impacto: ${convertPower(miner.newpower)}`);
                console.log(`Está em conjunto: ${miner.is_in_set ? 'Sim' : 'Não'}`);
                console.log(`Repetições: ${counts[miner.miner_id] || 1}`);
                console.log('---');
            });

            // Atualizar os elementos da página com informações dos mineradores negativos
            const updateElement = (index, miner) => {
                document.getElementById(`nome${index}`).innerText = miner ? `${getLevelDescription(miner.level)} ${miner.name}` : '';
                document.getElementById(`img${index}`).src = `https://static.rollercoin.com/static/img/market/miners/${miner?.filename}.gif?v=1`;
                document.getElementById(`img${index}`).style.display = 'block';  // Tornar a imagem visível
                document.getElementById(`poder${index}`).innerText = miner ? convertPower2(miner.power) : '';
                document.getElementById(`bonus${index}`).innerText = miner ? `${(miner.bonus_percent / 100).toFixed(2).replace('.', ',')}%` : '';
                document.getElementById(`impact${index}`).innerText = miner ? convertPower(miner.newpower) : '';
                document.getElementById(`set${index}`).innerText = miner ? (miner.is_in_set ? 'Sim' : 'Não') : '';
                document.getElementById(`merge${index}`).innerText = counts[miner.miner_id] > 1 ? 'Sim' : 'Não';
            };

            updateElement(1, top3NegativeResults[0]);
            updateElement(2, top3NegativeResults[1]);
            updateElement(3, top3NegativeResults[2]);

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Ocorreu um erro ao buscar os dados.');
        }
    });
});
