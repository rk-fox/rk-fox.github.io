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
    const minersPower = userData.miners;
    const bonusPercent = userData.bonus_percent / 100;
    const bonusPower = minersPower * bonusPercent;
    const racksPower = userData.racks;
    const totalPower = minersPower + bonusPower + racksPower;
    const powerGain = totalPower - initialPower;
    const progressPercentage = (powerGain / initialPower) * 100;
    let positionChangeContent = '-';
    let positionChangeStyle = '';
    let progressBarClass = '';

    if (positionChange > 0) {
        positionChangeContent = `▲ ${positionChange}`;
        positionChangeStyle = 'color: green; font-weight: bold;';
    } else if (positionChange < 0) {
        positionChangeContent = `▼ ${Math.abs(positionChange)}`;
        positionChangeStyle = 'color: red; font-weight: bold;';
    }

    if (progressPercentage < 0) {
        progressBarClass = 'negative';
    }

    let rankContent = rank;
    if (rank === 1) {
        rankContent = `<img src="images/ouro.png" alt="Ouro" style="width: 30px; height: 30px; vertical-align: middle;">`;
    } else if (rank === 2) {
        rankContent = `<img src="images/prata.png" alt="Prata" style="width: 30px; height: 30px; vertical-align: middle;">`;
    } else if (rank === 3) {
        rankContent = `<img src="images/bronze.png" alt="Bronze" style="width: 30px; height: 30px; vertical-align: middle;">`;
    }

    row.innerHTML = `
        <td data-label="Rank">${rankContent}</td>
        <td data-label="Posição" style="${positionChangeStyle}">${positionChangeContent}</td>
        <td data-label="Nick">
            <img src="${avatarUrl}" alt="Avatar de ${user.name}" style="width: 30px; height: 30px; border-radius: 50%; vertical-align: middle; margin-right: 8px;">
            ${user.name}
        </td>
        <td data-label="Miners">${convertPower(minersPower)}</td>
        <td data-label="Bônus (%)">${bonusPercent.toFixed(2)}%</td>
        <td data-label="Bônus">${convertPower(bonusPower)}</td>
        <td data-label="Racks">${convertPower(racksPower)}</td>
        <td data-label="Poder Total">${convertPower(totalPower)}</td>
        <td data-label="Progresso">
            <div style="text-align: center; font-size: 0.75rem;">${progressPercentage.toFixed(2)}%</div>
            <div class="progress-bar-container">
                <div class="progress-bar ${progressBarClass}" style="width: ${Math.abs(progressPercentage).toFixed(2)}%;">
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
        const totalPowerA = b.userData.miners + b.userData.miners * (b.userData.bonus_percent / 100) + b.userData.racks;
        const totalPowerB = a.userData.miners + a.userData.miners * (a.userData.bonus_percent / 100) + a.userData.racks;
        return totalPowerA - totalPowerB;
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
