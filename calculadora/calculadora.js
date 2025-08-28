    const linkSala = document.getElementById("linkSala");
    const poderConta = document.getElementById("poderConta");
    const unidadePoder = document.getElementById("unidadePoder");

    // Desativa o outro input quando um é preenchido
    linkSala.addEventListener("input", () => {
      if (linkSala.value.trim() !== "") {
        poderConta.disabled = true;
        unidadePoder.disabled = true;
      } else {
        poderConta.disabled = false;
        unidadePoder.disabled = false;
      }
    });

    poderConta.addEventListener("input", () => {
      if (poderConta.value.trim() !== "") {
        linkSala.disabled = true;
      } else {
        linkSala.disabled = false;
      }
    });

    function calcular() {
      if (linkSala.value.trim() === "" && poderConta.value.trim() === "") {
        alert("Preencha um dos campos antes de calcular!");
        return;
      }
      if (linkSala.value.trim() !== "" && poderConta.value.trim() !== "") {
        alert("Apenas um campo deve ser preenchido!");
        return;
      }
      if (poderConta.value.trim() !== "") {
        alert(`Poder informado: ${poderConta.value} ${unidadePoder.value}`);
      } else {
        alert(`Link informado: ${linkSala.value}`);
      }
    }

document.getElementById('searchButton').addEventListener('click', async () => {
    const userSala = document.getElementById('linkInput').value;

    try {
        const profileResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/public-user-profile-data/${userSala}`); 
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
        document.getElementById('welcomeMessage').innerText = `${userName}!`;

        const powerDataResponse = await fetch(`https://summer-night-03c0.rk-foxx-159.workers.dev/?https://rollercoin.com/api/profile/user-power-data/${avatarId}`);
        const powerData = await powerDataResponse.json();
        ligaAtual = powerData.data.max_power;
        poderAtual = powerData.data.current_power;


        console.log("Liga Atual:", ligaAtual);
        console.log("Poder Atual:", poderAtual);
        

