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

                // Verificar se há mais de um merge
                const merge = Object.values(counts).some(count => count > 1);

                // Atualizar a tabela com o status de merge
                document.getElementById('merge1').innerText = merge ? 'Sim' : 'Não';
                document.getElementById('merge2').innerText = merge ? 'Sim' : 'Não';
                document.getElementById('merge3').innerText = merge ? 'Sim' : 'Não';
                
            } else {
                alert('Não há resultados negativos próximos de zero.');
            }
            
        } catch (error) {
            console.error('Erro ao buscar dados do perfil:', error);
            alert('Erro ao buscar dados do perfil.');
        }
    });
});

