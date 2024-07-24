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

// Função para processar e exibir os dados
async function processAndDisplayData() {
    const roomLink = document.getElementById('roomLink').value;
    if (!roomLink) {
        alert('Por favor, digite o link da sala.');
        return;
    }

    try {
        // Obtendo avatar_id
        const profileResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/public-user-profile-data/${roomLink}`);
        const profileData = await profileResponse.json();

        // Verificar se a resposta contém os dados esperados
        if (!profileData || !profileData.data || !profileData.data.avatar_id) {
            throw new Error('Dados do perfil não encontrados.');
        }

        const avatarId = profileData.data.avatar_id;

        // Obtendo dados de power
        const powerResponse = await fetch(`https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
        const powerData = await powerResponse.json();

        // Verificar se a resposta contém os dados esperados
        if (!powerData || !powerData.data) {
            throw new Error('Dados de poder não encontrados.');
        }

        const miners = powerData.data.miners;
        const bonusPercent = powerData.data.bonus_percent / 100;
        const bonus = miners * bonusPercent / 10000;
        const totalPower = miners + bonus;

        document.getElementById('minersValue').textContent = convertPower(miners);
        document.getElementById('bonusPercentValue').textContent = (bonusPercent * 100).toFixed(2);
        document.getElementById('bonusValue').textContent = convertPower(bonus);
        document.getElementById('totalPowerValue').textContent = convertPower(totalPower);
    } catch (error) {
        console.error('Erro ao processar os dados:', error);
        alert('Ocorreu um erro ao processar os dados. Verifique o link da sala e tente novamente.');
    }
}
