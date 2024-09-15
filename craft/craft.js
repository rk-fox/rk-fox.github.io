function calcular() {
            const xpDesejado = parseFloat(document.getElementById('xp-desejado').value);
            const xpRltCraft = parseFloat(document.getElementById('xp-rlt-craft').value);
            const xpRltMarket = parseFloat(document.getElementById('xp-rlt-market').value);

            // Peca Craft 1
            const quantidadeCraft1 = parseFloat(document.getElementById('quantidade-craft1').value);
            const precoPecaCraft1 = parseFloat(document.getElementById('preco-peca-craft1').value);
            const precoCraft1 = parseFloat(document.getElementById('preco-craft1').value);
            const precoSpeed1 = parseFloat(document.getElementById('preco-speed1').value);
            const cash1 = parseFloat(document.getElementById('cash1').value);

            // Peca Craft 2
            const quantidadeCraft2 = parseFloat(document.getElementById('quantidade-craft2').value);
            const precoPecaCraft2 = parseFloat(document.getElementById('preco-peca-craft2').value);
            const precoCraft2 = parseFloat(document.getElementById('preco-craft2').value);
            const precoSpeed2 = parseFloat(document.getElementById('preco-speed2').value);
            const cash2 = parseFloat(document.getElementById('cash2').value);

            // Peca Craft 3
            const quantidadeCraft3 = parseFloat(document.getElementById('quantidade-craft3').value);
            const precoPecaCraft3 = parseFloat(document.getElementById('preco-peca-craft3').value);
            const precoCraft3 = parseFloat(document.getElementById('preco-craft3').value);
            const precoSpeed3 = parseFloat(document.getElementById('preco-speed3').value);
            const cash3 = parseFloat(document.getElementById('cash3').value);

            const tabela = document.getElementById('resultado-tabela').getElementsByTagName('tbody')[0];
            tabela.innerHTML = '';  // Limpa a tabela existente

            for (let i = 1; i <= 100; i++) {
                const multi = i;

                // Cálculo para Craft 1
                const divisorCraft1 = ((quantidadeCraft1 * precoPecaCraft1 * xpRltMarket) + ((precoCraft1 + precoSpeed1) * xpRltCraft)) * multi;
                const valorCraft1 = Math.ceil(xpDesejado / divisorCraft1);
                const custoCraft1 = ((quantidadeCraft1 * precoPecaCraft1) + precoCraft1 + precoSpeed1) * valorCraft1;
                const exchangeCraft1 = custoCraft1 * 0.68;
                const cashCraft1 = valorCraft1 * cash1;

                // Cálculo para Craft 2
                const divisorCraft2 = ((quantidadeCraft2 * precoPecaCraft2 * xpRltMarket) + ((precoCraft2 + precoSpeed2) * xpRltCraft)) * multi;
                const valorCraft2 = Math.ceil(xpDesejado / divisorCraft2);
                const custoCraft2 = ((quantidadeCraft2 * precoPecaCraft2) + precoCraft2 + precoSpeed2) * valorCraft2;
                const exchangeCraft2 = custoCraft2 * 0.68;
                const cashCraft2 = valorCraft2 * cash2;

                // Cálculo para Craft 3
                const divisorCraft3 = ((quantidadeCraft3 * precoPecaCraft3 * xpRltMarket) + ((precoCraft3 + precoSpeed3) * xpRltCraft)) * multi;
                const valorCraft3 = Math.ceil(xpDesejado / divisorCraft3);
                const custoCraft3 = ((quantidadeCraft3 * precoPecaCraft3) + precoCraft3 + precoSpeed3) * valorCraft3;
                const exchangeCraft3 = custoCraft3 * 0.68;
                const cashCraft3 = valorCraft3 * cash3;

                // Adiciona uma nova linha à tabela
                const novaLinha = tabela.insertRow();

                novaLinha.insertCell(0).textContent = multi;
                novaLinha.insertCell(1).textContent = valorCraft1;
                novaLinha.insertCell(2).textContent = exchangeCraft1.toFixed(2);
                novaLinha.insertCell(3).textContent = custoCraft1.toFixed(2);
                novaLinha.insertCell(4).textContent = cashCraft1.toFixed(2);
                novaLinha.insertCell(5).textContent = valorCraft2;
                novaLinha.insertCell(6).textContent = exchangeCraft2.toFixed(2);
                novaLinha.insertCell(7).textContent = custoCraft2.toFixed(2);
                novaLinha.insertCell(8).textContent = cashCraft2.toFixed(2);
                novaLinha.insertCell(9).textContent = valorCraft3;
                novaLinha.insertCell(10).textContent = exchangeCraft3.toFixed(2);
                novaLinha.insertCell(11).textContent = custoCraft3.toFixed(2);
                novaLinha.insertCell(12).textContent = cashCraft3.toFixed(2);
            }
}
