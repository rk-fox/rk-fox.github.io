const userIds = [
  '61e852b4dc27dc001969efa3',
  '61fa83b690e1e40027ebefca',
    // Adicione mais IDs aqui
];

const apiUrl = 'https://rollercoin.com/api/profile/user-power-data/';

async function fetchUserData(id) {
    const response = await fetch(`${apiUrl}${id}`);
    const data = await response.json();
    return data;
}

async function getAllUserData() {
    const userDataArray = [];
    for (const id of userIds) {
        try {
            const userData = await fetchUserData(id);
            if (userData.success) {
                userDataArray.push({
                    id: id,
                    games: userData.data.games,
                    miners: userData.data.miners,
                    total: userData.data.total,
                    bonus: userData.data.bonus,
                    racks: userData.data.racks,
                    bonus_percent: userData.data.bonus_percent,
                });
            }
        } catch (error) {
            console.error(`Erro ao buscar dados para o ID ${id}:`, error);
        }
    }
    return userDataArray;
}

function sortUserData(userDataArray) {
    return userDataArray.sort((a, b) => b.total - a.total);
}

function displayRanking(userDataArray) {
    const rankingDiv = document.getElementById('ranking');
    userDataArray.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <h2>Posição: ${index + 1}</h2>
            <p>ID: ${user.id}</p>
            <p>Jogos: ${user.games}</p>
            <p>Mineradores: ${user.miners}</p>
            <p>Total: ${user.total}</p>
            <p>Bônus: ${user.bonus}</p>
            <p>Racks: ${user.racks}</p>
            <p>Percentual de Bônus: ${user.bonus_percent}%</p>
        `;
        rankingDiv.appendChild(userDiv);
    });
}

async function main() {
    const userDataArray = await getAllUserData();
    const sortedUserData = sortUserData(userDataArray);
    displayRanking(sortedUserData);
}

main();
