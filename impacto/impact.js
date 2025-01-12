let result = [];
let imageId;
let minersPower;
let totalbonusPercent;
let total_orig;
let subimpactArray;

// Função para converter valores de poder (GH, TH, PH)
function convertPower(value) {
    const absValue = Math.abs(value); // Obter o valor absoluto
    const numericValue = parseFloat(value); // Garantir que o valor seja um número

    if (absValue >= 1e9) {
        return (numericValue / 1e9).toFixed(3).replace('.', ',') + ' Ehs';
    }
    if (absValue >= 1e6) {
        return (numericValue / 1e6).toFixed(3).replace('.', ',') + ' Phs';
    }
    if (absValue >= 1e3) {
        return (numericValue / 1e3).toFixed(3).replace('.', ',') + ' Ths';
    }
    return numericValue.toFixed(3).replace('.', ',') + ' Ghs';
}

function openPopup(event) {
    const popup = document.getElementById("popup");
    popup.style.display = "flex"; // Exibe o popup

    // Identifica qual imagem foi clicada
    const clickedImage = event.target; // Obtem a imagem clicada
    imageId = clickedImage.id;

    // Remove os 3 primeiros caracteres de imageId
    imageId = imageId.substring(3);

    // Atualiza o conteúdo de #popup-left
    const popupLeft = document.getElementById("popup-left");
    if (popupLeft) {
    // Copia os dados existentes da página para preencher o popup
        const imgSrc = document.getElementById(`img${imageId}`)?.src || "";
        const nomeText = document.getElementById(`nome${imageId}`)?.innerText || "N/A";
        const poderText = document.getElementById(`poder${imageId}`)?.innerText || "N/A";
        const bonusText = document.getElementById(`bonus${imageId}`)?.innerText || "N/A";
        const impactText = document.getElementById(`impact${imageId}`)?.innerText || "N/A";
    // Preenche o popup com os dados extraídos
        popupLeft.innerHTML = `
            <table style="margin-top: 60px;">
                <tbody>
                    <tr>
                        <td>Miner:</td>
                        <td>
                            <div>
                                <img src="${imgSrc}" style="margin: auto; width: 120px; height: auto;">
                            </div>
                            <div>
                                <span style="margin-top: 2px;">${nomeText}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Poder:</td>
                        <td>${poderText}</td>
                    </tr>
                    <tr>
                        <td>Bônus:</td>
                        <td>${bonusText}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">Impacto:</td>
                        <td style="font-weight: bold">${impactText}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}


// Função para fechar o popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none"; // Oculta o popup
    // Obtém a referência para a div com id 'new' e limpa o conteúdo
            const newDiv = document.getElementById("new");
            if (newDiv) {
                newDiv.innerHTML = '';
            }
}

// Adiciona o evento de clique para as imagens com a classe "popup-trigger"
document.querySelectorAll(".popup-trigger").forEach(item => {
    item.addEventListener("click", openPopup);
});

async function loadGoogleSheetData() {
    const sheetId = "171LSMNAiJ74obfmLzueKtzuyu7Bg9Ql5dBWQ1GkjQTI"; //baseada na minha copy of Database (precisa que eu atualize)
    const sheetName = "Database";
    const range = "C4:AP"; // Inclui as colunas C até AP
    const apiKey = "AIzaSyBP12YfPrz9MhCH3J7boeondSm7HYVCUvA"; // Substitua pela sua API Key

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values) {
            console.error("Nenhum dado encontrado na planilha.");
            return [];
        }


// Extraímos apenas as colunas desejadas e exibimos o resultado
result = data.values.map(row => [
    row[0], 
    row[1] && row[1] !== "-" && row[1] !== "#N/A" ? row[1]*1000 : row[1],
    //row[1] && row[1] !== "-" && row[1] !== "#N/A" ? row[1].replace(/[.,]/g, '') : row[1],
    row[2] ? row[2].replace('.', ',') : '',
    row[23] && row[23] !== "-" && row[23] !== "#N/A" ? row[23]*1000 : row[23],
    //row[23] && row[23] !== "-" && row[23] !== "#N/A" ? row[23].replace(/[.,]/g, '') : row[23],
    row[28] ? row[28].replace('.', ',') : '',
    row[24] && row[24] !== "-" && row[24] !== "#N/A" ? row[24]*1000 : row[24],
    //row[24] && row[24] !== "-" && row[24] !== "#N/A" ? row[24].replace(/[.,]/g, '') : row[24],
    row[29] ? row[29].replace('.', ',') : '',
    row[25] && row[25] !== "-" && row[25] !== "#N/A" ? row[25]*1000 : row[25],
    //row[25] && row[25] !== "-" && row[25] !== "#N/A" ? row[25].replace(/[.,]/g, '') : row[25],
    row[30] ? row[30].replace('.', ',') : '',
    row[26] && row[26] !== "-" && row[26] !== "#N/A" ? row[26]*1000 : row[26],
    //row[26] && row[26] !== "-" && row[26] !== "#N/A" ? row[26].replace(/[.,]/g, '') : row[26],
    row[31] ? row[31].replace('.', ',') : '',
    row[27] && row[27] !== "-" && row[27] !== "#N/A" ? row[27]*1000 : row[27],
    //row[27] && row[27] !== "-" && row[27] !== "#N/A" ? row[27].replace(/[.,]/g, '') : row[27],
    row[32] ? row[32].replace('.', ',') : '',
    row[38] && row[38] !== "-" && row[38] !== "#N/A" ? row[38]*1000 : row[38],
    //row[38] && row[38] !== "-" && row[38] !== "#N/A" ? row[38].replace(/[.,]/g, '') : row[38],
    row[39] ? row[39].replace('.', ',') : '',
]);

        // Exibindo o resultado no console
        console.log(result);

        // Chama a função para preencher os dropdowns após o carregamento de dados
        populateDropdowns();

    } catch (error) {
        console.error("Erro ao carregar dados da planilha:", error);
    }
}

// Função para processar os dados e preencher os dropdowns
async function populateDropdowns() {
    if (result.length === 0) return; // Verifica se result está vazio

    // Preenche o dropdown de nomes
    populateNameDropdown(result);

    // Adiciona o evento de mudança no nome da miner
    const nameDropdown = document.getElementById("name-dropdown");
    nameDropdown.addEventListener("change", (event) => {
        const selectedMinerName = event.target.value;

        // Encontra o miner selecionado no array result
        const selectedMinerRow = result.find(row => row[0] === selectedMinerName); // row[0] contém o nome

        if (selectedMinerRow) {
            const classifications = [""]; // Começa com "Comum" para todos

            // Verifica as classificações específicas e adiciona ao array de classificações
if (selectedMinerRow[1] !== "-" && selectedMinerRow[1] !== "#N/A") classifications.push("Common");   // Começa com "Comum" para todos
if (selectedMinerRow[3] !== "-" && selectedMinerRow[3] !== "#N/A") classifications.push("Uncommon");   // Coluna Z
if (selectedMinerRow[5] !== "-" && selectedMinerRow[5] !== "#N/A") classifications.push("Rare");      // Coluna AA
if (selectedMinerRow[7] !== "-" && selectedMinerRow[7] !== "#N/A") classifications.push("Epic");     // Coluna AB
if (selectedMinerRow[9] !== "-" && selectedMinerRow[9] !== "#N/A") classifications.push("Legendary");  // Coluna AC
if (selectedMinerRow[11] !== "-" && selectedMinerRow[11] !== "#N/A") classifications.push("Unreal");   // Coluna AD
if (selectedMinerRow[13] !== "-" && selectedMinerRow[13] !== "#N/A") classifications.push("Legacy");   // Coluna AO


            // Preenche o dropdown de classificações
            populateClassificationDropdown(classifications);
        }
    });
}

// Função para tratar e formatar o nome do arquivo
function formatFilename(name) {
    return name.trim()
        .replace(/'/g, '')         // Remove o apóstrofo simples (')
        .replace(/’/g, '')         // Remove o apóstrofo (’)
        .replace(/\+/g, 'plus')    // Substitui o + por "plus"
        .replace(/-/g, '_')        // Substitui o hífen (-) por underline (_)
        .replace(/\s+/g, '_')      // Substitui o espaço por underline (_)
        .replace(/,/g, '')         // Remove a vírgula
        .replace(/\./g, '')        // Remove o ponto
        .toLowerCase();            // Converte tudo para minúsculas
}


function populateNameDropdown(result) {
    const nameDropdown = document.getElementById("name-dropdown");
    nameDropdown.innerHTML = ""; // Limpa o dropdown

    // Cria uma div para "Miner:" e o input (name-dropdown)
    const minerDiv = document.createElement("div");
    const minerLabel = document.createElement("label");
    minerLabel.innerText = "Miner:";  // Definindo o texto "Miner:"
    minerDiv.appendChild(minerLabel);  // Adiciona o rótulo ao minerDiv

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Filtrar nomes...";
    input.className = "filter-input";
    minerDiv.appendChild(input);  // Adiciona o input ao minerDiv

    nameDropdown.appendChild(minerDiv);  // Adiciona minerDiv ao container principal

    // Criação do datalist para o nome
    const datalist = document.createElement("datalist");
    datalist.id = "names-list";
    result.forEach(row => {
        const name = row[0]; // Nome
        if (name) {
            const option = document.createElement("option");
            option.value = name;
            datalist.appendChild(option);
        }
    });

    // Adiciona o datalist ao nível do input (para "Miner:")
    nameDropdown.appendChild(datalist);
    input.setAttribute("list", "names-list"); // Associa o datalist ao input
}

function populateClassificationDropdown(classifications) {
    const classificationDropdown = document.getElementById("classification-dropdown");
    classificationDropdown.innerHTML = ""; // Limpa o dropdown

    // Cria a div para "Level:" e o dropdown de classificação
    const levelDiv = document.createElement("div");
    const levelLabel = document.createElement("label");
    levelLabel.innerText = "Level:";  // Definindo o texto "Level:"
    levelDiv.appendChild(levelLabel);  // Adiciona o rótulo ao levelDiv

    // Adiciona as opções de classificação disponíveis para a miner selecionada
    classifications.forEach(classification => {
        const option = document.createElement("option");
        option.value = classification;
        option.textContent = classification;
        classificationDropdown.appendChild(option);
    });

    // Adiciona a div do Level ao container principal
  //  nameDropdown.appendChild(levelDiv);  // Adiciona levelDiv ao container principal
}



// Adiciona o evento de mudança para a classificação
const classificationDropdown = document.getElementById("classification-dropdown");
classificationDropdown.addEventListener("change", updateNewContent);


// Função para atualizar o conteúdo na div "new"
function updateNewContent() {
    const nameDropdown = document.getElementById("name-dropdown");
    const classificationDropdown = document.getElementById("classification-dropdown");
    const newDiv = document.getElementById("new");

    // Obter valores selecionados
    const selectedName = nameDropdown.querySelector("input")?.value;
    const selectedClassification = classificationDropdown.value;

    if (!selectedName || !selectedClassification) {
        newDiv.innerHTML = "<p>Selecione um nome e uma classificação.</p>";
        return;
    }

    // Encontrar a linha correspondente no array result
    const selectedMinerRow = result.find(row => row[0] === selectedName);

    if (!selectedMinerRow) {
        newDiv.innerHTML = "<p>Miner não encontrado nos dados.</p>";
        return;
    }

    // Mapear as classificações para os índices corretos
    const classificationMap = {
        "Common": [0, 1, 2],
        "Uncommon": [0, 3, 4],
        "Rare": [0, 5, 6],
        "Epic": [0, 7, 8],
        "Legendary": [0, 9, 10],
        "Unreal": [0, 11, 12],
        "Legacy": [0, 13, 14]
    };

    const indices = classificationMap[selectedClassification];
    if (!indices) {
        newDiv.innerHTML = "<p>Classificação inválida.</p>";
        return;
    }
    
    const nameText = selectedMinerRow[indices[0]] || "N/A";
    let poderText = selectedMinerRow[indices[1]] || "N/A";
    const bonusText = selectedMinerRow[indices[2]] || "N/A";

    const powerValue = parseInt(poderText, 10); // Converte para número
    const bonusTextWithoutPercentage = bonusText.slice(0, -1).replace(',', '.'); // Remove o último caractere (%)
    const bonusValue = parseFloat(bonusTextWithoutPercentage); // Converte para número

    // Calculando o novo impacto
    let imageIdInt = parseInt(imageId, 10);
    imageIdInt = imageIdInt - 1;

    //console.log(subimpactArray[imageIdInt]);
    //console.log(subimpactArray[imageIdInt].power);
    let podervelho = subimpactArray[imageIdInt].power;
    //console.log(subimpactArray[imageIdInt].bonus);
    let bonusvelho = subimpactArray[imageIdInt].bonus;
    bonusvelho = parseFloat(subimpactArray[imageIdInt].bonus);
    //console.log(total_orig);
    //console.log(minersPower);
    let somaminer = minersPower;
    //console.log(totalbonusPercent);
    let somabonus = totalbonusPercent;
    
    let newImpact = (((somaminer - podervelho + powerValue) * (1 + ((somabonus - bonusvelho + bonusValue)/100))) - ((somaminer * (1 + (somabonus/100)))));
    newImpact = Math.round(newImpact);
    let newImpactarrumado = convertPower(newImpact); 

    poderText = convertPower(poderText); 
    

    // Formatando o nome para o filename
    const filename = formatFilename(selectedName);

    // Atualizar o conteúdo do elemento "new" com os dados da tabela
    newDiv.innerHTML = `
        <table>
            <tbody>
                <tr>
                    <td>Miner:</td>
                    <td>
                        <div>
                            <img src="https://static.rollercoin.com/static/img/market/miners/${filename}.gif?v=1" style="width: 120px; height: auto;">
                        </div>
                        <div>
                            ${selectedClassification} ${nameText}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Poder:</td>
                    <td>${poderText}</td>
                </tr>
                <tr>
                    <td>Bônus:</td>
                    <td>${bonusText}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold">Novo Impacto:</td>
                    <td style="font-weight: bold">${newImpactarrumado}</td>
                </tr>
            </tbody>
        </table>
    `;
}


// Função para limpar o campo de texto quando clicado
function clearInputOnClick() {
    document.addEventListener('focus', (event) => {
        // Verifica se o elemento focado é o input correto
        if (event.target && event.target.matches('.filter-input')) {
            event.target.value = ''; // Limpa o conteúdo do campo de texto

            // Obtém a referência para a div com id 'new' e limpa o conteúdo
            const newDiv = document.getElementById("new");
            if (newDiv) {
                newDiv.innerHTML = '';
            }
        }
    }, true); // Use captura para garantir que o evento "focus" seja capturado corretamente
}

// Inicializa o script ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    clearInputOnClick(); // Adiciona o evento para limpar o campo de texto
    loadGoogleSheetData(); // Agora chama loadGoogleSheetData que por sua vez chama populateDropdowns
});

// Obter os elementos do botão e do campo de entrada
const searchButton = document.getElementById('searchButton');
const linkInput = document.getElementById('linkInput');

// Adicionar um ouvinte de evento ao campo de entrada para capturar a tecla Enter
linkInput.addEventListener('keydown', function(event) {
    // Verificar se a tecla pressionada foi a tecla Enter (código 13 ou 'Enter')
    if (event.key === 'Enter') {
        event.preventDefault(); // Evitar o comportamento padrão (como submissão de formulário, se aplicável)
        searchButton.click(); // Executar o clique no botão
    }
});

// Função para carregar scripts dinamicamente
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Função para verificar o atributo is_can_be_sold_on_mp
  function checkSellable(minerId) {
    // Procurar o miner_id em cada dataset
    const datasets = [window.basic_miners, window.merge_miners, window.old_merge_miners];
    for (const dataset of datasets) {
      const miner = dataset.find((m) => m.miner_id === minerId);
      if (miner) {
        return miner.is_can_be_sold_on_mp || false;
      }
    }
    return false;
  }

  // Carregar os scripts e adicionar o atributo sellable
  async function addSellableToMiners(miners) {
    try {
      // URLs dos scripts
      const scripts = [
        'https://wminerrc.github.io/calculator/data/basic_miners.js',
        'https://wminerrc.github.io/calculator/data/merge_miners.js',
        'https://wminerrc.github.io/calculator/data/old/merge_miners.js',
      ];

      // Carregar os scripts dinamicamente
      await Promise.all(scripts.map((url) => loadScript(url)));

      // Adicionar atributo sellable aos miners
      miners.forEach((miner) => {
        miner.sellable = checkSellable(miner.miner_id);
      });

      //console.log('Miners com atributo sellable:', miners);
    } catch (error) {
      console.error('Erro ao carregar scripts ou processar miners:', error);
    }
  }

// Função para calcular o bônus extra com base nos IDs específicos
function applyBonusAdjustment(miners, targetIds, fullSetBonus, partialSetBonus) {
  // Filtra as miners do grupo específico
  const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));

  // Define o impacto adicional com base na quantidade de IDs encontrados
  const bonusAdjustment =
    matchingMiners.length === 4
      ? fullSetBonus
      : matchingMiners.length >= 2
      ? partialSetBonus
      : 0;

  // Aplica o ajuste no bônus de cada miner correspondente
  matchingMiners.forEach(miner => {
    miner.setBonus += bonusAdjustment;
  });
}

// Função para calcular o bônus extra com base nos IDs específicos
function applyImpact4Adjustment(miners, targetIds, fullSet4Impact, partialSet4Impact) {
  // Filtra as miners do grupo específico
  const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));

  // Define o impacto adicional com base na quantidade de IDs encontrados
  const impact4Adjustment =
    matchingMiners.length === 4
      ? fullSet4Impact
      : matchingMiners.length >= 2
      ? partialSet4Impact
      : 0;

  // Aplica o ajuste no bônus de cada miner correspondente
  matchingMiners.forEach(miner => {
    miner.setImpact += impact4Adjustment;
  });
}

// Função para calcular o bônus extra com base nos IDs específicos
function applyImpact3Adjustment(miners, targetIds, fullSet3Impact, partialSet3Impact) {
  // Filtra as miners do grupo específico
  const matchingMiners = miners.filter(miner => targetIds.includes(miner.miner_id));

  // Define o impacto adicional com base na quantidade de IDs encontrados
  const impact3Adjustment =
    matchingMiners.length === 3
      ? fullSet3Impact
      : matchingMiners.length === 2
      ? partialSet3Impact
      : 0;

  // Aplica o ajuste no bônus de cada miner correspondente
  matchingMiners.forEach(miner => {
    miner.setImpact += impact3Adjustment;
  });
}


function getLevelDescription(level, type) {
        switch (level) {
            case 0: return { text: 'Common', color: '' };
            case 1:
            if (type === 'merge') {
                return { text: 'Uncommon', color: '#2bff00' };
            } else if (type === 'old_merge') {
                return { text: 'Legacy', color: '#ecab4e' };
            }
            break;
            case 2: return { text: 'Rare', color: '#00eaff' };
            case 3: return { text: 'Epic', color: '#ff00bb' };
            case 4: return { text: 'Legendary', color: '#fffb00' };
            case 5: return { text: 'Unreal', color: '#ff0000' };
            default: return { text: 'Unknown', color: '' };
        }
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const userLink = document.getElementById('linkInput').value;

    if (!userLink) {
        alert('Por favor, digite o link da sala.');
        return;
    }

    try {
        const profileResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userLink}`); 
        const profileData = await profileResponse.json();
        const userName = profileData.data.name; 
        const avatarId = profileData.data.avatar_id;

        if (!avatarId || !userName) {
            alert('Erro ao obter o avatar_id ou nome.');
            return;
        }

        const avatarUrl = `https://avatars.rollercoin.com/static/avatars/thumbnails/50/${avatarId}.png`;
        document.getElementById('avatar').src = avatarUrl;
        document.getElementById('avatar').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Olá, ${userName}!`;

        const powerDataResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
        const powerData = await powerDataResponse.json();
        minersPower = powerData.data.miners;
        totalbonusPercent = powerData.data.bonus_percent;

        totalbonusPercent = parseFloat((totalbonusPercent / 100).toFixed(2));

        total_orig = minersPower * (1 + (totalbonusPercent / 100));

        //console.log("Miners Power:", convertPower(minersPower));
        //console.log("Miners Bonus:", totalbonusPercent + '%');
        //console.log("Total Power:", convertPower(total_orig));

        // Fazendo uma requisição à API para obter dados dinâmicos
        fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/game/room-config/${avatarId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
          })
          .then(jsonData => {
    // Extraindo dados de data.miners
            let miners = [];
            const minerCount = {}; // Para contar repetições
            
    // Primeiro, conta todas as repetições gerais
jsonData.data.miners.forEach(miner => {
  const key = `${miner.miner_id}_${miner.level}`;
  if (!minerCount[key]) {
    minerCount[key] = { count: 0, firstAssigned: false }; // Adiciona flag para controlar a primeira ocorrência
  }
  minerCount[key].count++; // Incrementa o contador total para essa combinação
});

// Em seguida, monta a lista final com as informações desejadas
jsonData.data.miners.forEach(miner => {
  const key = `${miner.miner_id}_${miner.level}`;
  const totalRepetitions = minerCount[key].count; // Total de repetições geral
  const isFirst = !minerCount[key].firstAssigned; // Verifica se é a primeira ocorrência

  miners.push({
    miner_id: miner.miner_id,
    user_rack_id: miner.placement.user_rack_id,
    name: miner.name,
    width: miner.width,
    level: miner.level,
    power: miner.power,
    formattedPower: convertPower(miner.power), // Formata o valor de power para exibição
    filename: miner.filename,
    bonus_percent: isFirst ? miner.bonus_percent / 100 : 0, // Apenas a primeira mantém o bônus dividido por 100
    is_in_set: miner.is_in_set,
    repetitions: isFirst ? "Não" : totalRepetitions, // "Não" para a primeira, total para as subsequentes
    setImpact: 0, // Adiciona o atributo com valor inicial 0
    setBonus: 0, // Adiciona o atributo com valor inicial 0
    type: miner.type,
  });

  minerCount[key].firstAssigned = true; // Marca a primeira ocorrência como já atribuída
});

async function main() {
  // Adiciona atributo `sellable`
  await addSellableToMiners(miners);

  // Filtro baseado na opção selecionada (width)
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    let filteredWidth;
    if (selectedOption.value === 'op1') {
      filteredWidth = miners.filter(miner => miner.width === 1);
    } else if (selectedOption.value === 'op2') {
      filteredWidth = miners.filter(miner => miner.width === 2);
    } else if (selectedOption.value === 'op3') {
      filteredWidth = miners.filter(miner => miner.width === 1 || miner.width === 2); // Inclui width 1 e 2
    } else {
      filteredWidth = miners; // Sem filtro
    }

    // Atualizar o array global mantendo referências
    miners.length = 0;
    miners.push(...filteredWidth);
  }

  // Filtro baseado na opção selecionada para "neg" (sellable)
  const selectedNegOption = document.querySelector('input[name="neg"]:checked');
  if (selectedNegOption) {
    let filteredNeg;
    if (selectedNegOption.value === 'op1') {
      filteredNeg = miners.filter(miner => miner.sellable === true); // Negociável
    } else if (selectedNegOption.value === 'op2') {
      filteredNeg = miners.filter(miner => miner.sellable === false); // Inegociável
    } else if (selectedNegOption.value === 'op3') {
      filteredNeg = miners.filter(miner => miner.sellable === true || miner.sellable === false); // Inclui ambos
    } else {
      filteredNeg = miners; // Sem filtro
    }

    // Atualizar o array global mantendo referências
    miners.length = 0;
    miners.push(...filteredNeg);
  }

  // Exemplo de atualização do DOM ou console log
 //console.log(miners);


}

// Chama a função assíncrona
main().then(() => {

            
    // Aplicando ajustes nos bônus para os dois grupos de IDs específicos
    applyBonusAdjustment(miners, 
      ["66f1c200e0dd3530daa2eadf", "66f1c1b9e0dd3530daa2e9df", "66f1c18fe0dd3530daa2e8dd", "66f1c1dee0dd3530daa2ea96"], 
      10, // 10% para todas as 4
      5   // 5% para 2 ou 3
    );
    applyBonusAdjustment(miners, 
      ["6687cf817643815232d65da6", "6687cfd57643815232d65e39", "6687cf557643815232d65d5c", "6687cfae7643815232d65def"], 
      7,  // 7% para todas as 4
      2   // 2% para 2 ou 3
    );
    // Aplicando ajustes no impacto para os seis grupos de IDs específicos
    applyImpact3Adjustment(miners, 
      ["67338357d9b2852bde4b077d", "67338298d9b2852bde4afb0d", "67338415d9b2852bde4b0dc6"], 
      15000000, // 10% para todas as 3
      7500000   // 5% para 2
    );
    applyImpact3Adjustment(miners, 
      ["66c31b17b82bcb27662d302b", "66c31aecb82bcb27662d2f53", "66c31b3eb82bcb27662d30d8"], 
      10000000,  // 7% para todas as 3
      5000000   // 2% para 2
    );
    applyImpact3Adjustment(miners, 
      ["66ead1cde0dd3530da969ea9", "66ead191e0dd3530da969e5f", "66ead1fbe0dd3530da969ef3"], 
      8000000,  // 7% para todas as 3
      5000000   // 2% para 2
    );
    applyImpact4Adjustment(miners, 
      ["6687cea87643815232d65882", "6687cefd7643815232d65d11", "6687ce4e7643815232d65297", "6687ced67643815232d65cc8"], 
      3000000,  // 7% para todas as 4
      2000000   // 2% para 2 ou 3
    );
    applyImpact4Adjustment(miners, 
      ["6687cd307643815232d64077", "6687cdc47643815232d64726", "6687ccfc7643815232d6402d", "6687cd837643815232d640c1"], 
      2500000,  // 7% para todas as 4
      1500000   // 2% para 2 ou 3
    );
    applyImpact4Adjustment(miners, 
      ["674df56acbe1e47b27075ab6", "674df5c5cbe1e47b27075b51", "674df539cbe1e47b27075a68", "674df599cbe1e47b27075b04"], 
      25000000,  // 7% para todas as 4
      10000000   // 2% para 2 ou 3
    );
    
    // Extraindo dados de data.racks
    const racks = jsonData.data.racks.map(rack => ({
      _id: rack._id,
      room_level: rack.placement.room_level,
      x: rack.placement.x,
      y: rack.placement.y
    }));

    // Associando miner.placement.user_rack_id com rack._id
    miners.forEach(miner => {
      const rack = racks.find(r => r._id === miner.user_rack_id);
      if (rack) {
        miner.room_level = rack.room_level;
        miner.rack_x = rack.x;
        miner.rack_y = rack.y;
      }
    });

    // Simulando a remoção de miners e calculando o impacto no total
    let minerImpacts = miners.map(miner => {
      const remainingPower = minersPower - miner.power;
      const remainingBonusPercent = totalbonusPercent - miner.bonus_percent;
      const newAdjustedPower = remainingPower * ((100 + remainingBonusPercent - miner.setBonus) / 100);
      const impact = (newAdjustedPower - total_orig) - miner.setImpact; // Alteração na fórmula do impacto
      
      return { 
        ...miner, 
        impact, 
        formattedImpact: convertPower((impact)) // Formata o impacto
      };
    });

    
    // Ordenando os miners pelo impacto (negativo mais próximo de zero até o mais distante)
    minerImpacts.sort((a, b) => b.impact - a.impact); // Ajuste na ordenação

        // Exibindo os dados no console
    //console.log("Miner Impacts (sorted):", minerImpacts.map(impact => ({
    //name: impact.name,
      //level: impact.level,
      //power: impact.formattedPower, // Exibe o valor formatado
      //bonus_percent: impact.bonus_percent,
      //setBonus: impact.setBonus,
      //setImpact: impact.setImpact,
      //formattedImpact: impact.formattedImpact, // Exibe o impacto formatado
      //room_level: impact.room_level, // Novo dado de rack
      //rack_x: impact.rack_x,         // Novo dado de rack
      //rack_y: impact.rack_y,          // Novo dado de rack
      //type: impact.type,
    //})));

const top10NegativeResults = minerImpacts.slice(0, 10);

const clearAllFields = () => {
    for (let j = 1; j <= 10; j++) {
        document.getElementById(`nome${j}`).innerHTML = '';
        document.getElementById(`img${j}`).src = '';
        document.getElementById(`img${j}`).style.display = 'none';
        document.getElementById(`sell${j}`).innerText = '';
        document.getElementById(`poder${j}`).innerText = '';
        document.getElementById(`bonus${j}`).innerText = '';
        document.getElementById(`impact${j}`).innerText = '';
        document.getElementById(`set${j}`).innerText = '';
        document.getElementById(`merge${j}`).innerText = '';
        document.getElementById(`rack${j}`).innerText = '';
    }
};

    clearAllFields();

    subimpactArray = []
    
      const updateElement = (index, miner) => {
          
    if (miner) {
        const levelInfo = getLevelDescription(miner.level, miner.type);
        const levelSpan = `<span style="color: ${levelInfo.color}; font-weight: bold;">${levelInfo.text}</span> ${miner.name}`;
        document.getElementById(`nome${index}`).innerHTML = levelSpan;
        document.getElementById(`img${index}`).src = `https://static.rollercoin.com/static/img/market/miners/${miner.filename}.gif?v=1`;
        document.getElementById(`img${index}`).style.display = 'block';
        const sellElement = document.getElementById(`sell${index}`);
        sellElement.innerText = miner.sellable ? 'Negociável' : 'Inegociável';
        sellElement.style.color = miner.sellable ? '' : 'red';
        document.getElementById(`poder${index}`).innerText = convertPower(miner.power);
        document.getElementById(`bonus${index}`).innerText = `${(miner.bonus_percent).toFixed(2).replace('.', ',')}%`;
        document.getElementById(`impact${index}`).innerText = convertPower(miner.impact);
        if (miner.setBonus > 0) {
            document.getElementById(`set${index}`).innerText = `${(miner.setBonus).toFixed(2).replace('.', ',')}%`;
        } else if (miner.setImpact > 0) {
            document.getElementById(`set${index}`).innerText = convertPower(miner.setImpact);
        } else {
            document.getElementById(`set${index}`).innerText = miner.is_in_set ? 'Sim' : 'Não';
        }
        document.getElementById(`merge${index}`).innerText = miner.repetitions;
        document.getElementById(`rack${index}`).innerText = `Sala: ${miner.room_level + 1}, Linha: ${miner.rack_y + 1}, Rack: ${miner.rack_x + 1}`;

        // Armazenando os dados no array
        subimpactArray.push({
            name: miner.name,
            power: miner.power,
            bonus: miner.bonus_percent.toFixed(2),
        });
        
    } else {
        document.getElementById(`nome${index}`).innerText = '';
    }
};    
   
            top10NegativeResults.forEach((miner, i) => updateElement(i + 1, miner));
          })})
          } catch (error) {
        console.error("Erro ao obter dados da API:", error);
    }
});
