const winnerMG = document.querySelector('.winnerMG');
const winnerTTT = document.querySelector('.winnerTTT');
const winnerCS = document.querySelector('.winnerCS');
const memoryGame = document.querySelector('.memoryGame');
const ticTacToe = document.querySelector('.ticTacToe');

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
    } else {
        return;
    }
    if (localStorage.getItem('isTTTEnded') === 'true'){
        ticTacToe.classList.add('ended');
    } else {
        return;
    }
}

window.onload = () => {
    showWinners();
    checkGames();
}