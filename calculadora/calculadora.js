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
