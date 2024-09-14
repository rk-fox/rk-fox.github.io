document.addEventListener('DOMContentLoaded', () => {
    // Função para converter poder
    function convertPower(value) {
        const absValue = Math.abs(value); // Obter o valor absoluto
        if (absValue >= 1e3) {
            return (value / 1e3).toFixed(3).replace('.', ',') + ' THs';
        }
        return value.toFixed(3).replace('.', ',') + ' GHs';
    }

    // Função para converter poder (apenas na exibição de miner em GHs)
    function convertPower2(value) {
        const absValue = Math.abs(value); // Obter o valor absoluto
        if (absValue >= 1e3) {
            return (value / 1e3).toFixed(3).replace('.', ',') + ' THs';
        }
        return value.toFixed(3).replace('.', ',') + ' GHs'; // Corrigido: adicionar "GHs" em vez de "GHs" para valores abaixo de 1e3
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
                alert('Erro ao obter o nome de usuário.');
                return; // Corrigido: Alterado para mensagem mais precisa sobre erro de nome de usuário
            }

            // Exibir avatar e mensagem de boas-vindas
            const avatarUrl = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${avatarId}.png`;
            document.getElementById('avatar').src = avatarUrl;
            document.getElementById('avatar').style.display = 'block'; // Tornar a imagem visível
            document.getElementById('welcomeMessage').innerText = `Olá, ${userName}!`;

            // Buscar dados de user-power-data usando avatarId
            const powerDataResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
            const powerData = await powerDataResponse.json();
            const powerContents = JSON.parse(powerData.contents);
            const miners = powerContents.data.miners;
            let bonusPercent = powerContents.data.bonus_percent;

            // Processar bonus_percent
            bonusPercent = parseFloat((bonusPercent / 100).toFixed(2)); // Dividir por 100 e garantir que é um número

            // Calcular Poder Total
            const total_orig = miners * (1 + bonusPercent); // Corrigido: Remover divisão adicional por 100, pois bonusPercent já é um decimal

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
            const selectedOption = document.querySelector('input[name="option"]:checked')?.value; // Corrigido: Usar optional chaining para evitar erro caso nenhum radio button esteja selecionado

            if (!selectedOption) {
                alert('Por favor, selecione uma opção.');
                return;
            }

            // Filtrar minerData com base na opção selecionada
            let filteredMiners = minerData;
            if (selectedOption === 'op1') {
                filteredMiners = minerData.filter(miner => miner.slots === 1);
            } else if (selectedOption === 'op2') {
                filteredMiners = minerData.filter(miner => miner.slots === 2);
            }

            // Passo 1: Contar a frequência de cada miner_id
            const minerIdCounts = filteredMiners.reduce((counts, miner) => {
                counts[miner.miner_id] = (counts[miner.miner_id] || 0) + 1;
                return counts;
            }, {});

            // Passo 2: Calcular newpower para cada miner e armazenar os três menores valores negativos próximos de 0
            const results = filteredMiners.map(miner => {
                const count = minerIdCounts[miner.miner_id];
                let newBonusPercent = bonusPercent; 
                if (count === 1) {
                    newBonusPercent = bonusPercent - (miner.bonus_percent / 100); // Corrigido: Mover declaração da variável newBonusPercent para fora do bloco if
                }
                const newpower = (((miners - miner.power) * (1 + newBonusPercent)) - total_orig) * count;
                
                return {
                    ...miner,
                    newpower: newpower
                };
            });

            const negativeResults = results.filter(result => result.newpower < 0);
            const sortedResults = negativeResults.sort((a, b) => b.newpower - a.newpower);
            const topThreeNegatives = sortedResults.slice(0, 3);

            console.log(topThreeNegatives);

            // Preencher os dados na tabela HTML
            if (topThreeNegatives.length > 0) {
                topThreeNegatives.forEach((result, index) => {
                    document.getElementById(`nome${index + 1}`).innerText = result.name || '';
                    document.getElementById(`img${index + 1}`).src = `https://static.rollercoin.com/static/img/market/miners/${result.filename}.gif?v=1`;
                    document.getElementById(`img${index + 1}`).style.display = 'block'; // Tornar a imagem visível
                    document.getElementById(`poder${index + 1}`).innerText = convertPower2(result.power);
                    document.getElementById(`bonus${index + 1}`).innerText = `${(result.bonus_percent).toFixed(2).replace('.', ',')}%`;
                    document.getElementById(`impact${index + 1}`).innerText = convertPower(result.newpower);
                    document.getElementById(`set${index + 1}`).innerText = result.is_in_set ? 'Sim' : 'Não';
                });

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
                    topThreeNegatives[0]?.miner_id,
                    topThreeNegatives[1]?.miner_id,
                    topThreeNegatives[2]?.miner_id
                ].filter(id => id !== undefined); // Corrigido: Filtrar IDs indefinidos

                // Contar as repetições
                const counts = countRepetitions(minerIds);

                // Verificar se há mais de um merge
                const merge = Object.values(counts).some(count => count > 1);

                // Atualizar a tabela com o status de merge
                [1, 2, 3].forEach(index => {
                    document.getElementById(`merge${index}`).innerText = merge ? 'Sim' : 'Não';
                });
                
            } else {
                alert('Não há resultados negativos próximos de zero.');
            }
            
        } catch (error) {
            console.error('Erro ao buscar dados do perfil:', error);
            alert('Erro ao buscar dados do perfil.');
        }
    });
});
