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

    // Função para contar as repetições de miner_id
    function countRepetitions(minerIds) {
        const counts = minerIds.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {});
        return counts;
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

            // Contar as repetições de miner_id antes de calcular newpower
            const minerIds = filteredMiners.map(miner => miner.miner_id);
            const counts = countRepetitions(minerIds);

            // Calcular newpower para cada miner e armazenar os três menores valores negativos próximos de 0
            const results = filteredMiners.map(miner => {
                // Ajustar a fórmula para newBonusPercent baseado no count do miner_id
                const newBonusPercent = counts[miner.miner_id] > 1
                    ? bonusPercent
                    : bonusPercent - (miner.bonus_percent / 100);

                const newpower = (((miners - miner.power) * (1 + (newBonusPercent / 100))) - total_orig);
                
                return {
                    ...miner,
                    newpower: newpower
                };
            });

            const negativeResults = results.filter(result => result.newpower < 0);
            const sortedResults = negativeResults.sort((a, b) => b.newpower - a.newpower);
            const topThreeNegatives = sortedResults.slice(0, 3);

            // Preencher os dados na tabela HTML
            if (topThreeNegatives.length > 0) {
                document.getElementById('nome1').innerText = topThreeNegatives[0]?.name || '';
                document.getElementById('img1').src = `https://static.rollercoin.com/static/img/market/miners/${topThreeNegatives[0].filename}.gif?v=1`;
                document.getElementById('img1').style.display = 'block';  // Tornar a imagem visível
                document.getElementById('poder1').innerText = topThreeNegatives[0] ? convertPower2(topThreeNegatives[0].power) : '';
                document.getElementById('bonus1').innerText = topThreeNegatives[0] ? `${(topThreeNegatives[0].bonus_percent / 100).toFixed(2).replace('.', ',')}%` : '';
                document.getElementById('impact1').innerText = topThreeNegatives[0] ? convertPower(topThreeNegatives[0].newpower) : '';
                document.getElementById('set1').innerText = topThreeNegatives[0] ? (topThreeNegatives[0].is_in_set ? 'Sim' : 'Não') : '';
                
                document.getElementById('nome2').innerText = topThreeNegatives[1]?.name || '';
                document.getElementById('img2').src = `https://static.rollercoin.com/static/img/market/miners/${topThreeNegatives[1].filename}.gif?v=1`;
                document.getElementById('img2').style.display = 'block';  // Tornar a imagem visível
                document.getElementById('poder2').innerText = topThreeNegatives[1] ? convertPower2(topThreeNegatives[1].power) : '';
                document.getElementById('bonus2').innerText = topThreeNegatives[1] ? `${(topThreeNegatives[1].bonus_percent / 100).toFixed(2).replace('.', ',')}%` : '';
                document.getElementById('impact2').innerText = topThreeNegatives[1] ? convertPower(topThreeNegatives[1].newpower) : '';
                document.getElementById('set2').innerText = topThreeNegatives[1] ? (topThreeNegatives[1].is_in_set ? 'Sim' : 'Não') : '';
                
                document.getElementById('nome3').innerText = topThreeNegatives[2]?.name || '';
                document.getElementById('img3').src = `https://static.rollercoin.com/static/img/market/miners/${topThreeNegatives[2].filename}.gif?v=1`;
                document.getElementById('img3').style.display = 'block';  // Tornar a imagem visível
                document.getElementById('poder3').innerText = topThreeNegatives[2] ? convertPower2(topThreeNegatives[2].power) : '';
                document.getElementById('bonus3').innerText = topThreeNegatives[2] ? `${(topThreeNegatives[2].bonus_percent / 100).toFixed(2).replace('.', ',')}%` : '';
                document.getElementById('impact3').innerText = topThreeNegatives[2] ? convertPower(topThreeNegatives[2].newpower) : '';
                document.getElementById('set3').innerText = topThreeNegatives[2] ? (topThreeNegatives[2].is_in_set ? 'Sim' : 'Não') : '';

                // Função para contar as repetições de miner_id
                function countRepetitions(minerIds) {
                    const counts = minerIds.reduce((acc, id) => {
                        acc[id] = (acc[id] || 0) + 1;
                        return acc;
                    }, {});

                    return counts;
                }

                // Array com os miner_id das 3 máquinas
                const minerIds = [
                    topThreeNegatives[0].miner_id,
                    topThreeNegatives[1] ? topThreeNegatives[1].miner_id : null,
                    topThreeNegatives[2] ? topThreeNegatives[2].miner_id : null
                ].filter(id => id !== null); // Filtrar IDs nulos

                // Contar as repetições
                const counts = countRepetitions(minerIds);

                // Verificar se há mais de um merge para cada miner
                const mergeResults = topThreeNegatives.map(miner => counts[miner.miner_id] > 1 ? 'Sim' : 'Não');

                // Atualizar a tabela com o status de merge
                document.getElementById('merge1').innerText = mergeResults[0] || 'Não';
                document.getElementById('merge2').innerText = mergeResults[1] || 'Não';
                document.getElementById('merge3').innerText = mergeResults[2] || 'Não';
                
            } else {
                alert('Não há resultados negativos próximos de zero.');
            }
            
        } catch (error) {
            console.error('Erro ao buscar dados do perfil:', error);
            alert('Erro ao buscar dados do perfil.');
        }
    });
});
