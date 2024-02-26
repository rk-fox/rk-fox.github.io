// Adicione qualquer funcionalidade JavaScript aqui, se necessário
function compararItens() {
    // Obter os elementos das listas suspensas
    var itemEsquerda = document.getElementById("itemEsquerda").value;
    var itemDireita = document.getElementById("itemDireita").value;

    // Verificar se ambos os itens foram selecionados
    if (itemEsquerda !== "" && itemDireita !== "") {
        // Aqui você pode implementar sua lógica de comparação com base nos dados dos itens
        // Substitua as mensagens de exemplo com sua lógica real
        var resultado = "Resultado: " + itemEsquerda + " vs " + itemDireita;
        document.getElementById("resultado").textContent = resultado;
    } else {
        // Se um dos itens não foi selecionado, limpe o resultado
        document.getElementById("resultado").textContent = "";
    }
}
