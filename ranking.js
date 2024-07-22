// Função para converter o poder para a unidade apropriada
function convertPower(power) {
    if (power >= 1e9) {
        return (power / 1e9).toFixed(2) + ' EHs';
    } else if (power >= 1e6) {
        return (power / 1e6).toFixed(2) + ' PHs';
    } else if (power >= 1e3) {
        return (power / 1e3).toFixed(2) + ' THs';
    } else {
        return power.toFixed(2) + ' GHs';
    }
}

// Função para buscar dados do usuário
async function fetchUserData(userId) {
    const baseUrl = "https://rollercoin.com/api/profile/user-power-data/";
    const url = `${baseUrl}${userId}`;
    const encodedUrl = encodeURIComponent(url);

    try {
        const response = await fetch(`https://rollercoin.free.mockoapp.net/get?url=${encodedUrl}`);

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const responseData = await response.json();
        const data = JSON.parse(responseData.contents).data; // Parseia a string JSON dos dados
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        return null;
    }
}

// Função para adicionar dados à tabela
function addDataToTable(user, userData, initialPower, rank, positionChange) {
    const tableBody = document.querySelector('#rankingTable tbody');
    const row = document.createElement('tr');

    const avatarUrl = `https://avatars.rollercoin.com/static/avatars/thumbnails/48/${user.id}.png?v=1652150400524`;
    const totalPower = userData.miners + userData.bonus + userData.racks;
    const powerGain = totalPower - initialPower;
    const progressPercentage = (powerGain / initialPower) * 100;
    const positionChangeClass = positionChange > 0 ? 'up' : positionChange < 0 ? 'down' : '';
    const positionChangeIcon = positionChange > 0 ? '▲' : positionChange < 0 ? '▼' : '';

    row.innerHTML = `
        <td data-label="Rank">${rank}</td>
        <td data-label="Posição" class="${positionChangeClass}">${positionChangeIcon}</td>
        <td data-label="Nick">
            <img src="${avatarUrl}" alt="Avatar de ${user.name}" style="width: 30px; height: 30px; border-radius: 50%; vertical-align: middle; margin-right: 8px;">
            ${user.name}
        </td>
        <td data-label="Miners">${convertPower(userData.miners)}</td>
        <td data-label="Bônus (%)">${(userData.bonus_percent / 100).toFixed(2)}%</td>
        <td data-label="Bônus">${convertPower(userData.bonus)}</td>
        <td data-label="Racks">${convertPower(userData.racks)}</td>
        <td data-label="Poder Total">${convertPower(totalPower)}</td>
        <td data-label="Progresso">
            <div class="progress-bar-container">
                <div class="progress-text">${progressPercentage.toFixed(2)}%</div> <!-- Texto acima da barra -->
                <div class="progress-bar" style="width: ${progressPercentage.toFixed(2)}%;">
                    <!-- Texto gerado dinamicamente com ::after no CSS -->
                </div>
            </div>
            <div style="text-align: center; font-size: 0.75rem;">${convertPower(powerGain)}</div>
        </td>
        <td data-label="Link">
            <a href="${user.link}" class="btn-home" target="_blank">
                <img src="images/botao-home.png" alt="Botão Home" class="btn-home-img">
            </a>
        </td>
    `;

    tableBody.appendChild(row);
}

// Função para carregar dados do Excel
async function loadExcelData() {
    try {
        const response = await fetch('historico.xlsx');
        if (!response.ok) {
            throw new Error('Erro ao carregar historico.xlsx: ' + response.statusText);
        }
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        return jsonData;
    } catch (error) {
        console.error('Erro ao carregar dados do Excel:', error);
        return [];
    }
}

// Função para buscar e exibir os dados de todos os usuários
async function fetchAndDisplayAllUsers() {
    const initialPowerData = await loadExcelData();
    const userDataArray = [];

    for (const user of initialPowerData) {
        const userData = await fetchUserData(user.id);
        if (userData) {
            userDataArray.push({ user, userData, initialPower: user.inicial, previousPosition: user.posicao });
        }
    }

    // Ordena os dados pelo Poder Total
    userDataArray.sort((a, b) => {
        const totalPowerA = a.userData.miners + a.userData.bonus + a.userData.racks;
        const totalPowerB = b.userData.miners + b.userData.bonus + b.userData.racks;
        return totalPowerB - totalPowerA;
    });

    // Adiciona os dados ordenados à tabela
    userDataArray.forEach((item, index) => {
        const rank = index + 1;
        const positionChange = item.previousPosition - rank;
        addDataToTable(item.user, item.userData, item.initialPower, rank, positionChange);
    });
}

// Inicia a busca e exibição dos dados ao carregar a página
window.onload = fetchAndDisplayAllUsers;
