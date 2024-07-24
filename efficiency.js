// Função para processar e exibir os dados
async function processAndDisplayData() {
    const linkInput = document.getElementById('linkInput').value;
    if (!linkInput) {
        alert('Por favor, insira o link da sala.');
        return;
    }

    try {
        // Requisição para obter os dados do perfil
        const profileResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/public-user-profile-data/${linkInput}`);
        const profileData = await profileResponse.json();
        
        // Verificar se a resposta contém os dados esperados
        if (!profileData || !profileData.data || !profileData.data.avatar_id) {
            throw new Error('Dados do perfil não encontrados.');
        }

        const avatarId = profileData.data.avatar_id;

        // Requisição para obter os dados de poder do usuário
        const powerResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
        const powerData = await powerResponse.json();

        // Verificar se a resposta contém os dados esperados
        if (!powerData || !powerData.data) {
            throw new Error('Dados de poder não encontrados.');
        }

        // Extraindo dados necessários
        const miners = powerData.data.miners;
        const bonusPercent = powerData.data.bonus_percent / 100;
        const bonus = miners * bonusPercent / 100;
        const totalPower = miners + bonus;

        // Exibir os dados na página
        document.getElementById('miners').textContent = convertPower(miners);
        document.getElementById('bonusPercent').textContent = bonusPercent.toFixed(2) + '%';
        document.getElementById('bonus').textContent = convertPower(bonus);
        document.getElementById('totalPower').textContent = convertPower(totalPower);

    } catch (error) {
        console.error('Erro ao processar os dados:', error);
        alert('Erro ao processar os dados. Verifique o console para mais detalhes.');
    }
}

// Função para converter o poder para a unidade apropriada
function convertPower(power) {
    const absPower = Math.abs(power);
    let convertedPower;

    if (absPower >= 1e9) {
        convertedPower = (absPower / 1e9).toFixed(2) + ' EHs';
    } else if (absPower >= 1e6) {
        convertedPower = (absPower / 1e6).toFixed(2) + ' PHs';
    } else if (absPower >= 1e3) {
        convertedPower = (absPower / 1e3).toFixed(2) + ' THs';
    } else {
        convertedPower = absPower.toFixed(2) + ' GHs';
    }

    return power < 0 ? '-' + convertedPower : convertedPower;
}

// Adicionar o event listener ao botão Pesquisar
document.getElementById('searchButton').addEventListener('click', processAndDisplayData);
