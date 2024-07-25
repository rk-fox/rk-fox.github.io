document.getElementById('searchButton').addEventListener('click', function() {
    const linkInput = document.getElementById('linkInput').value.trim();
    if (linkInput) {
        const url = `https://rollercoin.free.mockoapp.net/get?url=${encodeURIComponent(linkInput)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const profileData = JSON.parse(data.contents);
                if (profileData.success) {
                    const miners = profileData.data.miners;
                    const bonusPercent = profileData.data.bonus_percent / 100;
                    const totalPower = profileData.data.total;

                    document.getElementById('miners').textContent = miners.toFixed(2);
                    document.getElementById('bonusPercent').textContent = (bonusPercent * 100).toFixed(2);
                    document.getElementById('bonus').textContent = (miners * bonusPercent).toFixed(2);
                    document.getElementById('totalPower').textContent = totalPower.toFixed(2);
                } else {
                    alert('Erro ao obter dados do perfil.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
                alert('Erro ao buscar os dados.');
            });
    } else {
        alert('Por favor, insira o link da sala.');
    }
});

document.getElementById('calculateButton').addEventListener('click', function() {
    // Pegue os valores atuais
    let miners = parseFloat(document.getElementById('miners').textContent) || 0;
    let bonusPercent = parseFloat(document.getElementById('bonusPercent').textContent) || 0;
    let totalPower = parseFloat(document.getElementById('totalPower').textContent) || 0;

    // Pegue os valores de entrada do usuário
    let sellPower = parseFloat(document.getElementById('sellPower').value) || 0;
    let sellBonus = parseFloat(document.getElementById('sellBonus').value) || 0;
    let buyPower = parseFloat(document.getElementById('buyPower').value) || 0;
    let buyBonus = parseFloat(document.getElementById('buyBonus').value) || 0;

    // Calcule os novos valores
    let newMiners = miners - sellPower + buyPower;
    let newBonuspercent = bonusPercent - sellBonus + buyBonus;
    let newBonus = newMiners * newBonuspercent / 100;
    let newPower = newMiners + newBonus;

    // Atualize os resultados na tabela
    document.getElementById('newMiners').textContent = newMiners.toFixed(2);
    document.getElementById('newBonuspercent').textContent = newBonuspercent.toFixed(2);
    document.getElementById('newBonus').textContent = newBonus.toFixed(2);

    // Determine a cor e a seta para o newPower
    let powerChange = document.getElementById('powerChange');
    if (newPower > totalPower) {
        document.getElementById('newPower').textContent = newPower.toFixed(2);
        document.getElementById('newPower').style.color = 'green';
        powerChange.innerHTML = '↑';
        powerChange.style.color = 'green';
    } else if (newPower < totalPower) {
        document.getElementById('newPower').textContent = newPower.toFixed(2);
        document.getElementById('newPower').style.color = 'red';
        powerChange.innerHTML = '↓';
        powerChange.style.color = 'red';
    } else {
        document.getElementById('newPower').textContent = newPower.toFixed(2);
        document.getElementById('newPower').style.color = 'black';
        powerChange.innerHTML = '';
    }
});
