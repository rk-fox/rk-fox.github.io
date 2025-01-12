let clickCount = 0;

document.getElementById('searchButton').addEventListener('click', function() {
  clickCount++;

  if (clickCount === 2) {
    // Recuperar os valores do localStorage apenas após o segundo clique
    const minersPower2 = localStorage.getItem('minersPower2');
    const totalbonusPercent2 = localStorage.getItem('totalbonusPercent2');
    const total_orig2 = localStorage.getItem('total_orig2');
    const subimpactArray = JSON.parse(localStorage.getItem('subimpactArray'));

    console.log(minersPower2);  // Vai exibir o valor de minersPower2
    console.log(totalbonusPercent2);  // Vai exibir o valor de totalbonusPercent2
    console.log(total_orig2);  // Vai exibir o valor de total_orig2
    console.log(subimpactArray);  // Vai exibir o valor de subimpactArray
  }
});
