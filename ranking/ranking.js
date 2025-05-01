// Função para converter o poder para a unidade apropriada
function convertPower2(totalValue) {
    const absPower = Math.abs(totalValue);
    let convertedPower2;

    if (absPower >= 1e12) {
        convertedPower2 = (absPower / 1e12).toFixed(3).replace('.', ',') + ' ZHs';
    } else if (absPower >= 1e9) {
        convertedPower2 = (absPower / 1e9).toFixed(3).replace('.', ',') + ' EHs';
    } else if (absPower >= 1e6) {
        convertedPower2 = (absPower / 1e6).toFixed(3).replace('.', ',') + ' PHs';
    } else if (absPower >= 1e3) {
        convertedPower2 = (absPower / 1e3).toFixed(3).replace('.', ',') + ' THs';
    } else {
        convertedPower2 = absPower.toFixed(3) + ' GHs';
    }

    return totalValue < 0 ? '-' + convertedPower2 : convertedPower2;
}

// Função para converter o poder para a unidade apropriada
function convertPower(power) {
    const absPower = Math.abs(power);
    let convertedPower;

    if (absPower >= 1e12) {
        convertedPower = (absPower / 1e12).toFixed(3).replace('.', ',') + ' ZHs';
    } else if (absPower >= 1e9) {
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

// Lista de criptomoedas
const cryptos = ["RLT", "RST", "XRP_SMALL", "TRX_SMALL", "DOGE_SMALL", "SAT", "ETH_SMALL", "BNB_SMALL", "MATIC_SMALL", "SOL_SMALL", "LTC_SMALL"];

// Base da URL
const baseUrl = "https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/mining/network-info-by-day";

// Obtém a data atual
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

// Função para obter o valor de uma moeda
async function fetchValue(crypto) {
  // Certifique-se de que os parâmetros estão codificados corretamente
  const params = {
    from: formattedDate,
    to: formattedDate,
    currency: crypto,
    groupBy: "total_power",
  };

  // Monta a URL com encodeURIComponent
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const url = `${baseUrl}?${queryString}`;
    
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.success && data.data.length > 0) {
      return data.data[0].value || 0; // Retorna o valor ou 0 se não existir
    } else {
      console.error(`Sem dados para ${crypto}:`, data.error);
      return 0;
    }
  } catch (error) {
    console.error(`Erro ao acessar o link ${url}:`, error);
    return 0;
  }
}

// Função principal para somar os valores
async function calculateTotalValue() {
  let totalValue = 0;
  for (const crypto of cryptos) {
    const value = await fetchValue(crypto);
    totalValue += value;
  }

  // Preencher a célula com a classe 'poder-total'
  const poderTotalCell = document.querySelector('.poder-total');
  if (poderTotalCell) {
    poderTotalCell.textContent = `${convertPower2(totalValue)}`; // Correção aqui
  }

    return(totalValue);
    
}

// Função para obter o valor de initialPower da célula A2 na Planilha 2
async function getInitialPower() {
    try {
        const response = await fetch('historico.xlsm');
        if (!response.ok) {
            throw new Error('Erro ao carregar historico.xlsm: ' + response.statusText);
        }
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[1]; // Segunda planilha (índice 1)
        const sheet = workbook.Sheets[sheetName];
        
        // Verifica se a célula A2 existe e retorna o valor
        const cellA2 = sheet['A2'];
        if (cellA2 && cellA2.v) {
            return parseFloat(cellA2.v); // Retorna o valor como número
        } else {
            throw new Error('Célula A2 na Planilha 2 não encontrada ou vazia.');
        }
    } catch (error) {
        console.error('Erro ao obter initialPower:', error);
        return null; // Retorna nulo em caso de erro
    }
}

// Função para calcular e preencher a célula 'progresso'
function updateProgress(totalValue, initialPower) {
    const powerGain = totalValue - initialPower;
    const progressPercentage = (powerGain / initialPower) * 100;

    let progressBarClass = '';

    // Define a classe da barra de progresso se a porcentagem for negativa
    if (progressPercentage < 0) {
        progressBarClass = 'negative';
    }

    // Preenche a célula de progresso
    const progressoCell = document.querySelector('.progresso');
    if (progressoCell) {
        progressoCell.innerHTML = `
            <div style="text-align: center; font-size: 0.75rem;">${progressPercentage.toFixed(2)}%</div>
            <div class="progress-bar-container" style="background-color: #f3f3f3; border-radius: 5px;">
                <div class="progress-bar ${progressBarClass}" style="width: ${Math.abs(progressPercentage).toFixed(2)}%;"></div>
            </div>
        `;
    }
}

// Função para integrar o cálculo do progresso com os valores obtidos
async function updateProgressWithInitialPower(totalValue) {
    const initialPower = await getInitialPower();
    if (initialPower !== null) {
        updateProgress(totalValue, initialPower);
    } else {
        console.error('Não foi possível obter o valor de initialPower para calcular o progresso.');
    }
}

// Chamando a função com o totalValue já calculado
calculateTotalValue().then(totalValue => {
    updateProgressWithInitialPower(totalValue);
});


// Função para buscar dados do usuário
async function fetchUserData(userId) {
    const baseUrl = "https://rollercoin.com/api/profile/user-power-data/";
    const url = `${baseUrl}${userId}`;
    const encodedUrl = encodeURIComponent(url);

    try {
        const response = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?${encodedUrl}`);

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const responseData = await response.json();
        console.log('Resposta da API:', responseData); // Verifique a resposta

        // Agora você pode acessar os dados diretamente de responseData.data
        if (responseData.success) {
            return responseData.data; // Retorna os dados diretamente
        } else {
            console.error('Erro: A resposta não indica sucesso.', responseData);
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar dados dos usuários:', error);
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
        <td data-label="Hist">
            <img src="images/bt_hist.png" alt="Calculadora" class="btn-sala-img" style="width: 35px; height: 35px; border-radius: 0;" id="btn-hist-${user.id}">
        </td>    
    `;

    tableBody.appendChild(row);
}

// Função para abrir o popup com base no ID do usuário
function openPopup(userId) {
    // Atualize o conteúdo do popup com base no ID do usuário
    const popupContent = document.querySelector('.popup-content p');
    popupContent.textContent = `Conteúdo específico para o usuário ${userId}`;
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
}

// Função para fechar o popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

// Função para carregar dados do Excel
async function loadExcelData() {
    try {
        const response = await fetch('historico.xlsm');
        if (!response.ok) {
            throw new Error('Erro ao carregar historico.xlsm: ' + response.statusText);
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
async function fetchUserDataWithRetry(userId, retries = 8, delay = 375) {
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

// Função para atualizar a barra de progresso
function updateProgressBar(progress, total) {
    const progressBar = document.getElementById('progress-bar');
    const percentage = (progress / total) * 100;
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage.toFixed(2)}%`;
}

// Função para buscar e exibir os dados de todos os usuários
async function fetchAndDisplayAllUsers() {
    const initialPowerData = await loadExcelData();
    const userDataArray = [];
    const totalUsers = initialPowerData.length;
    let loadedUsers = 0;

    for (const user of initialPowerData) {
        const userData = await fetchUserDataWithRetry(user.id);
        if (userData) {
            userDataArray.push({ user, userData, initialPower: user.inicial, previousPosition: user.posicao });
            loadedUsers++;
            updateProgressBar(loadedUsers, totalUsers);
        } else {
            alert(`Erro ao carregar dados do usuário ID: ${user.id}. Pressione F5!`);
            return;
        }
    }

    if (userDataArray.length < initialPowerData.length) {
        alert("Erro de carregamento, por favor atualize o site");
        return;
    }

    // Ordena os dados pelo Poder Total
    userDataArray.sort((a, b) => {
        const totalPowerA = b.userData.miners + (b.userData.miners * b.userData.bonus_percent / 10000) + b.userData.racks;
        const totalPowerB = a.userData.miners + (a.userData.miners * a.userData.bonus_percent / 10000) + a.userData.racks;
        return totalPowerA - totalPowerB;
    });

    // Adiciona os dados ordenados à tabela e calcula a mudança de posição
    userDataArray.forEach((userEntry, index) => {
        const newRank = index + 1;
        const positionChange = userEntry.previousPosition - newRank;
        addDataToTable(userEntry.user, userEntry.userData, userEntry.initialPower, newRank, positionChange);
    });

    // Adiciona os event listeners para os botões do popup
    userDataArray.forEach(userEntry => {
        const btnHist = document.getElementById(`btn-hist-${userEntry.user.id}`);
        if (btnHist) {
            btnHist.addEventListener('click', () => openPopup(userEntry.user.id));
        }
    });

    // Atualiza o elemento <h3> com o número de membros e o total de poder
    const totalPowerSum = userDataArray.reduce((sum, userEntry) => {
        const totalPower = userEntry.userData.miners +
                           (userEntry.userData.miners * userEntry.userData.bonus_percent / 10000) +
                           userEntry.userData.racks;
        return sum + totalPower;
    }, 0);

    const totalInitialPower = userDataArray.reduce((sum, userEntry) => {
        return sum + parseFloat(userEntry.initialPower); // Garante que os valores sejam numéricos
    }, 0);

    const growthPercentage = ((totalPowerSum / totalInitialPower) - 1) * 100;
    const formattedGrowth = growthPercentage.toFixed(2).replace('.', ',') + '%'; // Formata como porcentagem

    const convertedPower = convertPower2(totalPowerSum);

    const membersInfoElement = document.querySelector('h3');
    membersInfoElement.textContent = `${userDataArray.length} Membros - Total de Poder: ${convertedPower} - Crescimento: ${formattedGrowth} - Referência: 01/05/2025`;
}

// Adiciona o event listener para fechar o popup
document.getElementById('close-btn').addEventListener('click', closePopup);
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('popup')) {
        closePopup();
    }
});

// Chama a função para buscar e exibir todos os usuários ao carregar a página
window.addEventListener('load', fetchAndDisplayAllUsers);
