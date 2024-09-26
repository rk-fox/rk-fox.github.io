function calcular() {
            const xpDesejado = parseFloat(document.getElementById('xp-desejado').value);
            const xpRltCraft = parseFloat(document.getElementById('xp-rlt-craft').value);
            const xpRltMarket = parseFloat(document.getElementById('xp-rlt-market').value);

            // Peca Craft 1
            const quantidadeMiner1 = parseFloat(document.getElementById('quantidade-miner1').value);
            const precoMiner1 = parseFloat(document.getElementById('preco-miner1').value);
            const quantidadeCraft1 = parseFloat(document.getElementById('quantidade-craft1').value);
            const precoPecaCraft1 = parseFloat(document.getElementById('preco-peca-craft1').value);
            const precoCraft1 = parseFloat(document.getElementById('preco-craft1').value);
            const precoSpeed1 = parseFloat(document.getElementById('preco-speed1').value);
            const cash1 = parseFloat(document.getElementById('cash1').value);

            const tabela = document.getElementById('resultado-tabela').getElementsByTagName('tbody')[0];
            tabela.innerHTML = '';  // Limpa a tabela existente

            for (let i = 1; i <= 100; i++) {
                const multi = i;

                // Cálculo para Craft 1
                const divisorCraft1 = ((((quantidadeCraft1 * precoPecaCraft1)+(quantidadeMiner1 * precoMiner1)) * xpRltMarket) + ((precoCraft1 + precoSpeed1) * xpRltCraft)) * multi;
                const valorCraft1 = Math.ceil(xpDesejado / divisorCraft1);
                const custoCraft1 = (((quantidadeCraft1 * precoPecaCraft1) + (quantidadeMiner1 * precoMiner1) + precoCraft1 + precoSpeed1) * valorCraft1);
                const cashCraft1 = valorCraft1 * cash1;
                const saldoCraft1 = cashCraft1 - custoCraft1;

                // Adiciona uma nova linha à tabela
                const novaLinha = tabela.insertRow();

                novaLinha.insertCell(0).textContent = multi;
                novaLinha.insertCell(1).textContent = valorCraft1;
                novaLinha.insertCell(2).textContent = custoCraft1.toFixed(2);
                novaLinha.insertCell(3).textContent = cashCraft1.toFixed(2);
                novaLinha.insertCell(4).textContent = saldoCraft1.toFixed(2);
            }
}
