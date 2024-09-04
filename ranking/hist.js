document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    let workbook;

    // Função para ler o arquivo Excel
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            workbook = XLSX.read(data, { type: 'array' });
        };

        reader.readAsArrayBuffer(file);
    });

    // Função para abrir o popup com o gráfico
    window.openPopup = function(userId) {
        if (!workbook) {
            alert('Por favor, carregue o arquivo Excel primeiro.');
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

        const rowNumber = parseInt(userRow.substring(1));
        const labels = [];
        const dataMinerPower = [];
        const dataBonus = [];
        const dataTotalPower = [];

        let col = 4; // Começa na coluna D
        while (sheet[XLSX.utils.encode_cell({ r: rowNumber - 1, c: col })]) {
            labels.push(`Medição ${col}`);
            dataMinerPower.push(sheet[XLSX.utils.encode_cell({ r: rowNumber - 1, c: col })].v);
            dataBonus.push(sheet[XLSX.utils.encode_cell({ r: rowNumber - 1, c: col + 1 })].v);
            dataTotalPower.push(sheet[XLSX.utils.encode_cell({ r: rowNumber - 1, c: col + 2 })].v);
            col += 3;
        }

        const ctx = document.getElementById('userChart').getContext('2d');
        new Chart(ctx, {
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
                        label: 'Bonus (%)',
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
        popup.style.display = 'flex';
    };

    // Função para fechar o popup
    window.closePopup = function() {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    };

    // Adiciona o evento de fechar o popup ao botão de fechar
    document.getElementById('close-btn').addEventListener('click', window.closePopup);
});

