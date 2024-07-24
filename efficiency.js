function calculateEfficiency() {
    const miners = parseFloat(document.getElementById('miners').value) || 0;
    const bonus = parseFloat(document.getElementById('bonus').value) || 0;
    const racks = parseFloat(document.getElementById('racks').value) || 0;

    // Calcula o Bônus em poder
    const bonusPower = miners * (bonus / 100);
    const totalPower = miners + bonusPower + racks;

    // Calcula a eficiência (este exemplo assume que a eficiência é o totalPower dividido por um valor fixo)
    const efficiency = (totalPower / 1000000) * 100; // Exemplo de cálculo

    document.getElementById('totalPower').textContent = convertPower(totalPower);
    document.getElementById('efficiency').textContent = efficiency.toFixed(2) + '%';
}

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
