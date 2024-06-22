// Adicione qualquer funcionalidade JavaScript aqui, se necessário
// Informações sobre os itens
var itens = {
    fullMoonDragon: { nome: "Full Moon Dragon", poder: 1722000, bonus: 1.00 },
    veniVidiVici: { nome: "VeniVidiVici", poder: 950000, bonus: 1.00 },
    cupOfPower: { nome: "Cup Of Power", poder: 4965000, bonus: 1.00 },
    chunxiRoad: { nome: "Chunxi Road", poder: 1150000, bonus: 6.00 },
    cryptoNeko: { nome: "Crypto-NeKo", poder: 902000, bonus: 4.00 }
};

function compararItens() {
    // Obter os elementos das listas suspensas
    var itemEsquerda = document.getElementById("itemEsquerda").value;
    var itemDireita = document.getElementById("itemDireita").value;

    // Verificar se ambos os itens foram selecionados
    if (itemEsquerda !== "" && itemDireita !== "") {
        // Obter as informações dos itens selecionados
        var infoEsquerda = itens[itemEsquerda];
        var infoDireita = itens[itemDireita];

        // Realizar a comparação com base nos dados dos itens
        var resultado = "Comparação:\n" +
            infoEsquerda.nome + " vs " + infoDireita.nome + "\n" +
            "Poder: " + infoEsquerda.poder + " vs " + infoDireita.poder + "\n" +
            "Bônus: " + infoEsquerda.bonus + "% vs " + infoDireita.bonus + "%";

        // Exibir o resultado
        document.getElementById("resultado").textContent = resultado;
    } else {
        // Se um dos itens não foi selecionado, limpe o resultado
        document.getElementById("resultado").textContent = "";
    }
}
