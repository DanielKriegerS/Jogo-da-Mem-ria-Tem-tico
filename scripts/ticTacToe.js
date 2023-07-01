const playerOne = document.querySelector('.playerOne');
const playerTwo = document.querySelector('.playerTwo');
const playerOneSide = document.querySelector('.playerOneSide');
const playerTwoSide = document.querySelector('.playerTwoSide');
const submit = document.querySelector('.submit');
const table = document.querySelector('.table');
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const grid = Array.from(Array(3), () => new Array(3).fill(''));
const gridContainer = document.querySelector('.grid');
const playerTwoForm = document.querySelector('#playerTwoForm');
const turns = document.querySelector('.turns');
const playerOneScore = document.querySelector('.scoreOne');
const playerTwoScore = document.querySelector('.scoreTwo');
let isBoardFull = false;
let winner = false;
let turnedTimes;
var currentPlayer = 'X';


const playerTurn = () => {
  isBoardFull = true;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] == '') {
        isBoardFull = false; 
        break;
      }
    }
  }
    if(currentPlayer == 'X'){
      playerOneSide.classList.add('turnOne');
      playerTwoSide.classList.remove('turnTwo');
    } else {
      playerOneSide.classList.remove('turnOne');
      playerTwoSide.classList.add('turnTwo');
    } 
    
    checkEndGame();
}

function checkEndGame() {
  winner = false;
  for (let i = 0; i < 3; i++) {
    if (grid[i][0] !== '' && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
      if(grid[i][0] == 'X'){
        let scoreX = parseInt(localStorage.getItem('scoreX')) + 1;
        localStorage.setItem('scoreX', scoreX);
      } else{
        let scoreO = parseInt(localStorage.getItem('scoreO')) + 1;
        localStorage.setItem('scoreO', scoreO);
      } 
      winner = true;
      loadScore();
      return;
    }
    
  }

  for (let j = 0; j < 3; j++) {
    if (grid[0][j] !== '' && grid[0][j] === grid[1][j] && grid[1][j] === grid[2][j]) {
      if(grid[0][j] == 'X'){
        let scoreX = parseInt(localStorage.getItem('scoreX')) + 1;
        localStorage.setItem('scoreX', scoreX);
      } else{
        let scoreO = parseInt(localStorage.getItem('scoreO')) + 1;
        localStorage.setItem('scoreO', scoreO);
      }
      winner = true;
      loadScore();
      return;
    }
  }

  if (grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    if(grid[0][0] == 'X'){
      let scoreX = parseInt(localStorage.getItem('scoreX')) + 1;
      localStorage.setItem('scoreX', scoreX);
    } else{
      let scoreO = parseInt(localStorage.getItem('scoreO')) + 1;
      localStorage.setItem('scoreO', scoreO); 
    }
    winner = true;
    loadScore();
    return;
  }

  if (grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    if(grid[0][2] == 'X'){
      let scoreX = parseInt(localStorage.getItem('scoreX')) + 1;
      localStorage.setItem('scoreX', scoreX);
    } else{
      let scoreO = parseInt(localStorage.getItem('scoreO')) + 1;
      localStorage.setItem('scoreO', scoreO);
    }
    winner = true;
    loadScore();
    return;
  }

  checkDraw();
}

function checkDraw() {
  if (isBoardFull && winner == false) {
    alert('Empate!');
    loadScore();
  }
  return;
}

function loadScore() {
  let scoreO = parseInt(localStorage.getItem('scoreO'));
  let scoreX = parseInt(localStorage.getItem('scoreX'));

  playerOneScore.innerHTML = scoreX;
  console.log(playerOneScore);
  playerTwoScore.innerHTML = scoreO;
  console.log(playerTwoScore);
  resetGame();
}

const createGrid = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const button = document.createElement('button');
        button.className = 'square';
        button.dataset.row = row;
        button.dataset.col = col;
        button.textContent = grid[row][col];
        gridContainer.appendChild(button);
        button.addEventListener('click', () => {
          if (button.textContent === '') {
            button.textContent = currentPlayer;
            grid[row][col] = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerTurn();
          } 
        });
      }
    }
  };

const loadGame = () => {
    if (gridContainer.children.length > 0) {
        while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
  }
  playerTurn(); 
}

const resetGame = () => {
  if (winner || isBoardFull) {
    const buttons = document.querySelectorAll('.square');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].textContent = '';
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[i][j] = '';
      }
    }
    turnedTimes = localStorage.getItem('turnedTimes') - 1;
    localStorage.setItem('turnedTimes', turnedTimes);
    turns.innerHTML = localStorage.getItem('turnedTimes');
    checkWinner();
  }
}

function checkWinner () {
  if (localStorage.getItem('scoreO') === '5'){
    localStorage.setItem('winnerTTT', localStorage.getItem('playerTwo'));
    localStorage.setItem('isTTTEnded', 'true');
    localStorage.setItem('isInGame', 'false');
    window.location = '../pages/overallScore.html';
  } else if (localStorage.getItem('scoreX') === '5'){
    localStorage.setItem('winnerTTT', localStorage.getItem('playerOne'));
    localStorage.setItem('isTTTEnded', 'true');
    localStorage.setItem('isInGame', 'false');
    window.location = '../pages/overallScore.html';
  } else if (turnedTimes === 0) {
    let scoreX = parseInt(localStorage.getItem('scoreX'));
    let scoreO = parseInt(localStorage.getItem('scoreO'));
  if (scoreX > scoreO) {
    localStorage.setItem('winnerTTT', localStorage.getItem('playerOne'));
  } else if (scoreO > scoreX) {
    localStorage.setItem('winnerTTT', localStorage.getItem('playerTwo'));
  } else {
    localStorage.setItem('winnerTTT', 'EMPATE');
  }
  localStorage.setItem('isTTTEnded', 'true');
  localStorage.setItem('isInGame', 'false');
  window.location = '../pages/overallScore.html';
  }
}

function loadCurrentGame (){
  playerOne.innerHTML = localStorage.getItem('playerOne');
  playerTwo.innerHTML = localStorage.getItem('playerTwo');
  turns.innerHTML = parseInt(localStorage.getItem('turnedTimes'));
  playerOneScore.innerHTML = parseInt(localStorage.getItem('scoreX'));
  playerTwoScore.innerHTML = parseInt(localStorage.getItem('scoreO'));
  console.log('OI')
}



const backToLogin = () => {
  if(localStorage.getItem('isInGame') === 'MemoryGame'){
    window.location = '../pages/overallScore.html';
  } else{
    window.location = '../pages/login.html';
  }
}

window.onload = () => {
if(localStorage.getItem('isInGame') == 'false') {
  if (localStorage.getItem('playerOne') !== null && 
  localStorage.getItem('playerTwo') !== null && 
  localStorage.getItem('playerInTurn') !== null) {
    playerOne.innerHTML = localStorage.getItem('playerOne');
    playerTwo.innerHTML = localStorage.getItem('playerTwo');
    localStorage.setItem('isInGame', 'Tic Tac Toe');
    localStorage.setItem('turnedTimes', 10);
    localStorage.setItem('scoreX', 0);
    localStorage.setItem('scoreO', 0);
    loadGame();
    createGrid();
  } else {
    let message = 'Os players não estão corretamente definidos.';
    alert(message);
    setTimeout(() => {
    window.location.href = './login.html';
    }, 1000);
  }
} else if (localStorage.getItem('isInGame') != 'Tic Tac Toe'){
  let message = 'Já há um jogo em andamento, acabe ' + localStorage.getItem('isInGame');
  alert(message);
  setTimeout(() => {
    window.location.href = './login.html';
    }, 1000);
} else {
  loadCurrentGame();
  createGrid();
}
  
if (localStorage.getItem('isTTTEnded') === 'true'){
  let message = 'Esse jogo já foi encerrado.';
  alert(message); 
  setTimeout(() => {
      window.location.href = './overallScore.html';
  }, 1000);
}
}