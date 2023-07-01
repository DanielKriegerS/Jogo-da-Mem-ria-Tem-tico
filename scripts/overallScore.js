const winnerMG = document.querySelector('.winnerMG');
const winnerTTT = document.querySelector('.winnerTTT');
const winnerCS = document.querySelector('.winnerCS');
const memoryGame = document.querySelector('.memoryGame');
const ticTacToe = document.querySelector('.ticTacToe');
const restart = document.querySelector('.restart__button');
let turns;
let scoreO;
let scoreX;

function showWinners () {
    if (localStorage.getItem('winnerMG')){
        winnerMG.innerHTML = localStorage.getItem('winnerMG');
    } else {
        winnerMG.innerHTML = 'Sem vencedor ainda';
    }
    if (localStorage.getItem('winnerTTT')){
        winnerTTT.innerHTML = localStorage.getItem('winnerTTT');
    } else {
        winnerTTT.innerHTML = 'Sem vencedor ainda';
    }
    if (localStorage.getItem('winnerCS')){
        winnerCS.innerHTML = localStorage.getItem('winnerCS');
    } else {
        winnerCS.innerHTML = 'Sem vencedor ainda';
    }
}

function checkGames () {
    if (localStorage.getItem('isMGEnded') === 'true'){
        memoryGame.classList.add('ended');
    }
    if (localStorage.getItem('isTTTEnded') === 'true'){
        ticTacToe.classList.add('ended');
    }
    if (localStorage.getItem('isMGEnded') === 'true' && localStorage.getItem('isTTTEnded') === 'true'){
        restart.removeAttribute('disabled');
    }
}

restart.addEventListener('click', function() {
    window.location.href = '../index.html';
  });

function attTTT(){ 
    turns = localStorage.getItem('turnedTimes');
    scoreO = localStorage.getItem('ScoreO');
    scoreX = localStorage.getItem('scoreX');
}

window.onload = () => {
    if (localStorage.getItem('playerOne') !== null && 
    localStorage.getItem('playerTwo') !== null && 
    localStorage.getItem('playerInTurn') !== null) {
        showWinners();
        checkGames();
    } else {
    const message = 'Os players não estão corretamente definidos.';
    alert(message);
    setTimeout(() => {
      window.location.href = './login.html';
    }, 1000);
  }
  if (localStorage.getItem('isInGame') == 'Tic Tac Toe') {
    attTTT();    
  }
}