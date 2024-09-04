document.addEventListener('DOMContentLoaded', () => {
    const fileUrl = 'historico.xlsm'; // Caminho para o arquivo no servidor
    let workbook;

    // Função para carregar o arquivo Excel
    async function loadWorkbook() {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo Excel');
            }
            const arrayBuffer = await response.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);
            workbook = XLSX.read(data, { type: 'array' });
            console.log('Arquivo Excel carregado com sucesso.');
        } catch (error) {
            console.error('Erro ao ler o arquivo Excel:', error);
        }
    }

    loadWorkbook(); // Carregue o arquivo Excel quando o DOM estiver pronto

    // Função para abrir o popup com o gráfico
    window.openPopup = function(userId) {
        if (!workbook) {
            alert('Por favor, aguarde o carregamento do arquivo Excel.');
            return;
        }

        const sheet = workbook.Sheets['Planilha3'];
        if (!sheet) {
            alert('Planilha3 não encontrada.');
            return;
        }

        // Encontra a linha do usuário com base no userId na coluna B
        const userRow = Object.keys(sheet).find(cell => cell.startsWith('B') && sheet[cell].v == userId);
        if (!userRow) {
            alert('Usuário não encontrado.');
            return;
        }

        const rowNumber = parseInt(userRow.substring(1)); // Pega o número da linha do usuário
        const labels = [];
        const dataMinerPower = [];
        const dataBonus = [];
        const dataTotalPower = [];

        let col = 3; // Coluna D (index 3)
        let foundData = false;

        while (true) {
            const cellDate = sheet[XLSX.utils.encode_cell({ r: 0, c: col })]; // Data na linha 1
            const cellMinerPower = sheet[XLSX.utils.encode_cell({ r: rowNumber - 1, c: col })]; // Miners Power na linha do usuário
            const cellBonus = sheet[XLSX.utils.encode_cell({ r: rowNumber - 1, c: col + 1 })]; // Bonus Power na linha do usuário
            const cellTotalPower = sheet[XLSX.utils.encode_cell({ r: rowNumber - 1, c: col + 2 })]; // Total Power na linha do usuário

            // Verifique se as células de Miner Power, Bonus e Total Power existem
            if (!cellMinerPower && !cellBonus && !cellTotalPower) {
                break; // Sai do loop se todas as células estiverem faltando
            }

            // Adicione o rótulo da data para o eixo X
            if (cellDate) {
                const dateValue = cellDate.v;
                let label = 'Data não encontrada';
                if (typeof dateValue === 'number') {
                    try {
                        const date = XLSX.SSF.parse_date_code(dateValue);
                        if (date) {
                            label = `${String(date.d).padStart(2, '0')}/${String(date.m).padStart(2, '0')}/${date.y}`;
                        }
                    } catch (e) {
                        console.error('Erro ao converter a data:', e);
                    }
                } else {
                    label = dateValue;
                }
                labels.push(label);
            }

            // Adicione os valores aos arrays
            dataMinerPower.push(cellMinerPower ? cellMinerPower.v : 0);
            dataBonus.push(cellBonus ? cellBonus.v : 0);
            dataTotalPower.push(cellTotalPower ? cellTotalPower.v : 0);

            // Avança para a próxima coluna de dados
            col += 3;
            foundData = true;
        }

        if (!foundData) {
            alert('Nenhum dado encontrado.');
            return;
        }

        const ctx = document.getElementById('userChart').getContext('2d');

        // Verifica se o gráfico já foi criado e remove se necessário
        if (window.userChart && window.userChart.destroy) {
            window.userChart.destroy();
        }

        // Cria um novo gráfico
        window.userChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Miner Power',
                        data: dataMinerPower,
                        borderColor: 'blue',
                        fill: false
                    },
                    {
                        label: 'Bonus Power',
                        data: dataBonus,
                        borderColor: 'green',
                        fill: false
                    },
                    {
                        label: 'Total Power',
                        data: dataTotalPower,
                        borderColor: 'red',
                        fill: false
                    }
                ]
            }
        });

        const popup = document.getElementById('popup');
        if (popup) {
            popup.style.display = 'flex';
        } else {
            console.error('Elemento popup não encontrado.');
        }
    };

    // Função para fechar o popup
    window.closePopup = function() {
        const popup = document.getElementById('popup');
        if (popup) {
            popup.style.display = 'none';
        } else {
            console.error('Elemento popup não encontrado.');
        }
    };

    // Adiciona o evento de fechar o popup ao botão de fechar
    const closeButton = document.getElementById('close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', window.closePopup);
    } else {
        console.error('Botão de fechar não encontrado.');
    }
});
