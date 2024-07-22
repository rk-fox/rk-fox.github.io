// Função para converter o poder para a unidade apropriada
function convertPower(power) {
    if (power >= 1e9) {
        return (power / 1e9).toFixed(2) + ' EH';
    } else if (power >= 1e6) {
        return (power / 1e6).toFixed(2) + ' PH';
    } else {
        return power.toFixed(2) + ' TH';
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
function addDataToTable(user, userData, initialPower) {
    const tableBody = document.querySelector('#rankingTable tbody');
    const row = document.createElement('tr');

    const avatarUrl = `https://avatars.rollercoin.com/static/avatars/thumbnails/48/${user.id}.png?v=1652150400524`;

    const powerGain = userData.total - initialPower;
    const progressPercentage = (powerGain / initialPower) * 100;

    row.innerHTML = `
        <td data-label="Avatar"><img src="${avatarUrl}" alt="Avatar de ${user.name}"></td>
        <td data-label="Nome do Personagem">${user.name}</td>
        <td data-label="Miners">${userData.miners}</td>
        <td data-label="Bônus (%)">${userData.bonus_percent.toFixed(2)}</td>
        <td data-label="Bônus">${userData.bonus.toFixed(2)}</td>
        <td data-label="Racks">${userData.racks}</td>
        <td data-label="Total (Poder)">${convertPower(userData.total)}</td>
        <td data-label="Progresso">
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${progressPercentage.toFixed(2)}%;">
                    ${progressPercentage.toFixed(2)}%
                </div>
            </div>
            <div>${convertPower(powerGain)}</div>
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
    for (const user of initialPowerData) {
        const userData = await fetchUserData(user.id);
        if (userData) {
            addDataToTable(user, userData, user.inicial);
        }
    }
}

// Inicia a busca e exibição dos dados ao carregar a página
window.onload = fetchAndDisplayAllUsers;
