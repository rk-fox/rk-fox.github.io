// Função para converter o poder para a unidade apropriada
function convertPower(power) {
    const absPower = Math.abs(power);
    let convertedPower;

    if (absPower >= 1e9) {
        convertedPower = (absPower / 1e9).toFixed(3).replace('.', ',') + ' EHs';
    } else if (absPower >= 1e6) {
        convertedPower = (absPower / 1e6).toFixed(3).replace('.', ',') + ' PHs';
    } else if (absPower >= 1e3) {
        convertedPower = (absPower / 1e3).toFixed(3).replace('.', ',') + ' THs';
    } else {
        convertedPower = absPower.toFixed(3) + ' GHs';
    }

    return power < 0 ? '-' + convertedPower : convertedPower;
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
    const bonusPower = minersPower * bonusPercent / 100;
    const racksPower = userData.racks;
    const totalPower = minersPower + (minersPower * bonusPercent / 100) + racksPower;
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
        rankContent = `<img src="images/ouro.png" alt="Ouro" style="width: 35px; height: 35px; vertical-align: middle;">`;
    } else if (rank === 2) {
        rankContent = `<img src="images/prata.png" alt="Prata" style="width: 35px; height: 35px; vertical-align: middle;">`;
    } else if (rank === 3) {
        rankContent = `<img src="images/bronze.png" alt="Bronze" style="width: 35px; height: 35px; vertical-align: middle;">`;
    }

    row.innerHTML = `
        <td data-label="Rank" class="table-cell-center" style="height: 73px; vertical-align: middle;">${rankContent}</td>
        <td data-label="Posição" style="${positionChangeStyle}">${positionChangeContent}</td>
        <td data-label="Nick">
            <img src="${avatarUrl}" alt="Avatar de ${user.name}" style="width: 35px; height: 35px; border-radius: 50%; vertical-align: middle; margin-right: 8px;">
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
            <a href="https://rollercoin.com/p/${user.link}" class="btn-home" target="_blank">
                <img src="images/botao-home.png" alt="Botão Home" class="btn-home-img" style="width: 35px; height: 35px;">
            </a>
        </td>
        <td data-label="Farm">
            <a href="https://wminerrc.github.io/calculator/index.html?user=${user.link}" class="btn-home" target="_blank">
                <img src="images/calculadora.png" alt="Calculadora" class="btn-home-img" style="width: 35px; height: 35px; border-radius: 0;">
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

// Função para buscar dados do usuário com tentativas adicionais
async function fetchUserDataWithRetry(userId, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        const userData = await fetchUserData(userId);
        if (userData) {
            return userData;
        }
        console.log(`Tentativa ${attempt} falhou. Tentando novamente em ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    return null;
}

// Função para buscar e exibir os dados de todos os usuários
async function fetchAndDisplayAllUsers() {
    const initialPowerData = await loadExcelData();
    const userDataArray = [];
    const totalUsers = initialPowerData.length;
    const loadingBar = document.getElementById('loadingBar');
    const loadingProgress = document.getElementById('loadingProgress');

    loadingBar.style.display = 'flex';

    for (let i = 0; i < totalUsers; i++) {
        const user = initialPowerData[i];
        const userData = await fetchUserDataWithRetry(user.id);

        if (!userData) {
            alert("Erro de carregamento, por favor atualize o site");
            loadingBar.style.display = 'none';
            return;
        }

        userDataArray.push({ user, userData, initialPower: user.inicial, previousPosition: user.posicao });

        const progress = ((i + 1) / totalUsers) * 100;
        loadingProgress.style.width = `${progress}%`;
    }

    loadingBar.style.display = 'none';

    // Ordena os dados pelo Poder Total
    userDataArray.sort((a, b) => {
        const totalPowerA = b.userData.miners + (b.userData.miners * b.userData.bonus_percent / 10000) + b.userData.racks;
        const totalPowerB = a.userData.miners + (a.userData.miners * a.userData.bonus_percent / 10000) + a.userData.racks;
        return totalPowerA - totalPowerB;
    });

    // Adiciona os dados ordenados à tabela
    userDataArray.forEach((userDataObj, index) => {
        const rank = index + 1;
        const positionChange = userDataObj.previousPosition ? userDataObj.previousPosition - rank : 0;
        addDataToTable(userDataObj.user, userDataObj.userData, userDataObj.initialPower, rank, positionChange);
    });
}

// Chama a função para buscar e exibir os dados dos usuários ao carregar a página
document.addEventListener('DOMContentLoaded', fetchAndDisplayAllUsers);
