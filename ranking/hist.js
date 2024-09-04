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

        const userRow = Object.keys(sheet).find(cell => cell.startsWith('B') && sheet[cell].v == userId);
        if (!userRow) {
            alert('Usuário não encontrado.');
            return;
        }

        const rowNumber = parseInt(userRow.substring(1)) - 1; // Ajuste o índice para a base 0
        const labels = [];
        const dataMinerPower = [];
        const dataBonus = [];
        const dataTotalPower = [];

        let col = 4; // Começa na coluna D
        let foundData = false;

        while (true) {
            const cellMinerPower = sheet[XLSX.utils.encode_cell({ r: rowNumber, c: col })];
            const cellBonus = sheet[XLSX.utils.encode_cell({ r: rowNumber, c: col + 1 })];
            const cellTotalPower = sheet[XLSX.utils.encode_cell({ r: rowNumber, c: col + 2 })];

            // Verifique se as células existem
            if (!cellMinerPower || !cellBonus || !cellTotalPower) {
                break; // Sai do loop se qualquer célula estiver faltando
            }

            // Adicione os valores aos arrays
            dataMinerPower.push(cellMinerPower.v || 0); // Use 0 se o valor for indefinido
            dataBonus.push(cellBonus.v || 0); // Use 0 se o valor for indefinido
            dataTotalPower.push(cellTotalPower.v || 0); // Use 0 se o valor for indefinido

            // Adicione o rótulo para o eixo X
            const dateCell = sheet[XLSX.utils.encode_cell({ r: rowNumber, c: col - 1 })];
            let label = `Medição ${col}`; // Valor padrão se a data não for encontrada
            if (dateCell) {
                const dateValue = dateCell.v;
                if (typeof dateValue === 'number') {
                    try {
                        const date = XLSX.SSF.parse_date_code(dateValue);
                        if (date) {
                            label = `${date.y}-${date.m}-${date.d}`;
                        }
                    } catch (e) {
                        console.error('Erro ao converter a data:', e);
                    }
                } else {
                    label = dateValue;
                }
            }
            labels.push(label);

            // Avança para a próxima coluna de dados
            col = col + 3;
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
