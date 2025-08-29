// ------- atualização da tabela -------
function atualizarTabela(poderAtual, cryptoPrices) { // Recebe cryptoPrices como parâmetro
  // guardas
  if (!urlLiga) {
    console.warn("urlLiga não definida ainda.");
    return;
  }
  if (!dadosTempos || !dadosTempos.duration || !dadosTempos.blockReward || !dadosTempos.totalPower) {
    console.warn("dadosTempos ainda não foi preenchido.");
    return;
  }
  // ... (outras guardas continuam iguais) ...

  const moedasAtivas = ligaMoedasMap[urlLiga] ?? {};
  const duration = dadosTempos.duration;
  const blockReward = dadosTempos.blockReward;
  const totalPower = dadosTempos.totalPower;

  for (const [moeda, balanceKey] of Object.entries(moedasAtivas)) {
    // ... (seus cálculos de tempoSec, bloco, poderRede, fblk, fdia, fmes continuam os mesmos) ...
    const tempoSec = Number(duration[`${moeda}tempo`]);
    const bloco = Number(blockReward[`${moeda}bloco`]);
    const poderRede = Number(totalPower[`${moeda}poderrede`]);
    
    const tempoMin = isFinite(tempoSec) && tempoSec > 0 ? (tempoSec / 60) : null;
    const fblk = (isFinite(bloco) && isFinite(poderRede) && poderRede !== 0 && isFinite(poderAtual)) ?
      (poderAtual / (poderRede + poderAtual)) * bloco :
      null;
    const fdia = (isFinite(tempoSec) && tempoSec > 0 && isFinite(fblk)) ?
      (86400 / tempoSec) * fblk :
      null;
    const fmes = isFinite(fdia) ? (fdia * 30) : null;
        
    // ... (seu cálculo de saqueTexto continua o mesmo) ...
    let saqueTexto = "X";
    if (!["RLT", "RST", "LTC"].includes(moeda)) {
      // ... (cálculo de saque aqui)
    }

    // ⭐ ATUALIZAÇÃO DA ESCRITA NA TABELA
    setCell(`${moeda}tempo`, tempoMin, 2);
    setCell(`${moeda}bloco`, bloco, 8);
    setText(`${moeda}saque`, saqueTexto);

    // Usa a nova função para as células de farm
    setComplexCell(`${moeda}fblk`, fblk, 8, moeda, cryptoPrices);
    setComplexCell(`${moeda}fdia`, fdia, 6, moeda, cryptoPrices);
    setComplexCell(`${moeda}fmes`, fmes, 6, moeda, cryptoPrices);
  }
  console.log("Tabela atualizada com valores convertidos!");
}
