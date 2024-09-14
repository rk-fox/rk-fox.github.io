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

            // Calcular newpower para cada miner e armazenar todos os mineradores negativos
            const results = filteredMiners.map(miner => {
                const newBonusPercent = bonusPercent - (miner.bonus_percent / 100);
                const newpower = (((miners - miner.power) * (1 + (newBonusPercent / 100))) - total_orig);
                
                return {
                    ...miner,
                    newpower: newpower
                };
            });

            const negativeResults = results.filter(result => result.newpower < 0);

            // Logar todos os mineradores negativos no console
            console.log('Mineradores com valores negativos:');
            negativeResults.forEach(miner => {
                console.log(`Nome: ${miner.name}`);
                console.log(`Poder: ${convertPower2(miner.power)}`);
                console.log(`Bônus: ${(miner.bonus_percent / 100).toFixed(2).replace('.', ',')}%`);
                console.log(`Impacto: ${convertPower(miner.newpower)}`);
                console.log(`Está em conjunto: ${miner.is_in_set ? 'Sim' : 'Não'}`);
                console.log('---');
            });

            // Exibir informações dos mineradores negativos no HTML (caso haja)
            if (negativeResults.length > 0) {
                document.getElementById('nome1').innerText = negativeResults[0]?.name || '';
                document.getElementById('img1').src = `https://static.rollercoin.com/static/img/market/miners/${negativeResults[0].filename}.gif?v=1`;
                document.getElementById('img1').style.display = 'block';  // Tornar a imagem visível
                document.getElementById('poder1').innerText = negativeResults[0] ? convertPower2(negativeResults[0].power) : '';
                document.getElementById('bonus1').innerText = negativeResults[0] ? `${(negativeResults[0].bonus_percent / 100).toFixed(2).replace('.', ',')}%` : '';
                document.getElementById('impact1').innerText = negativeResults[0] ? convertPower(negativeResults[0].newpower) : '';
                document.getElementById('set1').innerText = negativeResults[0] ? (negativeResults[0].is_in_set ? 'Sim' : 'Não') : '';
                
                document.getElementById('nome2').innerText = negativeResults[1]?.name || '';
                document.getElementById('img2').src = `https://static.rollercoin.com/static/img/market/miners/${negativeResults[1].filename}.gif?v=1`;
                document.getElementById('img2').style.display = 'block';  // Tornar a imagem visível
                document.getElementById('poder2').innerText = negativeResults[1] ? convertPower2(negativeResults[1].power) : '';
                document.getElementById('bonus2').innerText = negativeResults[1] ? `${(negativeResults[1].bonus_percent / 100).toFixed(2).replace('.', ',')}%` : '';
                document.getElementById('impact2').innerText = negativeResults[1] ? convertPower(negativeResults[1].newpower) : '';
                document.getElementById('set2').innerText = negativeResults[1] ? (negativeResults[1].is_in_set ? 'Sim' : 'Não') : '';
                
                document.getElementById('nome3').innerText = negativeResults[2]?.name || '';
                document.getElementById('img3').src = `https://static.rollercoin.com/static/img/market/miners/${negativeResults[2].filename}.gif?v=1`;
                document.getElementById('img3').style.display = 'block';  // Tornar a imagem visível
                document.getElementById('poder3').innerText = negativeResults[2] ? convertPower2(negativeResults[2].power) : '';
                document.getElementById('bonus3').innerText = negativeResults[2] ? `${(negativeResults[2].bonus_percent / 100).toFixed(2).replace('.', ',')}%` : '';
                document.getElementById('impact3').innerText = negativeResults[2] ? convertPower(negativeResults[2].newpower) : '';
                document.getElementById('set3').innerText = negativeResults[2] ? (negativeResults[2].is_in_set ? 'Sim' : 'Não') : '';

                // Função para contar as repetições de miner_id
                function countRepetitions(minerIds) {
                    const counts = minerIds.reduce((acc, id) => {
                        acc[id] = (acc[id] || 0) + 1;
                        return acc;
                    }, {});

                    return counts;
                }

                // Array com os miner_id dos mineradores negativos
                const minerIds = negativeResults.map(result => result.miner_id);

                // Contar as repetições
                const counts = countRepetitions(minerIds);

                // Logar contagens de repetições no console
                console.log('Contagem de repetições de miner_id:');
                Object.entries(counts).forEach(([id, count]) => {
                    console.log(`Miner ID: ${id}, Repetições: ${count}`);
                });

                // Verificar se há mais de um merge
                const merge = Object.values(counts).some(count => count > 1);

                // Atualizar a tabela com o status de merge
                document.getElementById('merge1').innerText = merge ? 'Sim' : 'Não';
                document.getElementById('merge2').innerText = merge ? 'Sim' : 'Não';
                document.getElementById('merge3').innerText = merge ? 'Sim' : 'Não';

                // Exibir aviso no console se houver múltiplas repetições
                if (merge) {
                    console.log('Aviso: Existem mineradores duplicados.');
                    document.getElementById('result').innerText = 'Aviso: Existem mineradores duplicados.';
                } else {
                    console.log('Nenhum minerador duplicado encontrado.');
                    document.getElementById('result').innerText = 'Nenhum minerador duplicado encontrado.';
                }
            } else {
                console.log('Nenhum minerador negativo encontrado.');
                document.getElementById('result').innerText = 'Nenhum minerador negativo encontrado.';
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Ocorreu um erro ao buscar os dados.');
        }
    });
});
