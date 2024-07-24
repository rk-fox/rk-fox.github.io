// Função para converter o poder para a unidade apropriada
function convertPower(power) {
    const absPower = Math.abs(power);
    let convertedPower;

    if (absPower >= 1e6) {
        convertedPower = (absPower / 1e6).toFixed(2) + ' PHs';  // PHs para valores acima de 1e6
    } else if (absPower >= 1e3) {
        convertedPower = (absPower / 1e3).toFixed(2) + ' THs';  // THs para valores acima de 1e3
    } else {
        convertedPower = absPower.toFixed(2) + ' GHs';  // GHs para valores abaixo de 1e3
    }

    return power < 0 ? '-' + convertedPower : convertedPower;
}

// Função para buscar dados do perfil do usuário
async function fetchUserProfile(link) {
    const profileUrl = `https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/public-user-profile-data/${link}`;
    const profileResponse = await fetch(profileUrl);
    const profileData = await profileResponse.json();
    const avatarId = profileData.contents.data.avatar_id;
    return avatarId;
}

// Função para buscar dados de poder do usuário
async function fetchUserPowerData(avatarId) {
    const powerUrl = `https://rollercoin.free.mockoapp.net/get?url=https://rollercoin.com/api/profile/user-power-data/${avatarId}`;
    const powerResponse = await fetch(powerUrl);
    const powerData = await powerResponse.json();
    return powerData.contents.data;
}

// Função para processar e exibir os dados
async function processAndDisplayData() {
    const linkInput = document.querySelector('#linkInput').value.trim();
    const avatarId = await fetchUserProfile(linkInput);
    const powerData = await fetchUserPowerData(avatarId);

    const miners = powerData.miners;
    const bonusPercent = powerData.bonus_percent / 100;
    const bonusPower = (miners * bonusPercent) / 100;
    const totalPower = miners + bonusPower;

    document.querySelector('#miners').textContent = convertPower(miners);
    document.querySelector('#bonus-percent').textContent = `${bonusPercent.toFixed(2)}%`;
    document.querySelector('#bonus').textContent = convertPower(bonusPower);
    document.querySelector('#total-power').textContent = convertPower(totalPower);
}

// Adiciona evento de clique ao botão Pesquisar
document.querySelector('#searchButton').addEventListener('click', processAndDisplayData);
