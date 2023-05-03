const playerOne = document.querySelector('.playerOne');
const playerTwo = document.querySelector('.playerTwo');
const submit = document.querySelector('.submit');
const table = document.querySelector('.table');
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const grid = Array.from(Array(3), () => new Array(3).fill(''));
const gridContainer = document.querySelector('.grid');
const playerTwoForm = document.querySelector('#playerTwoForm');
const squares = document.querySelectorAll('.square'); 
let currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;

localStorage.setItem('scoreX', scoreX);
localStorage.setItem('scoreO', scoreO);

var playerTwoInput = document.querySelector('.playerTwoInput');

const addPlayer = () => {
    if(playerTwoInput){
        var inputValue = playerTwoInput.value;
        localStorage.setItem('playerTwo', inputValue);
        playerTwo.innerHTML = localStorage.getItem('playerTwo');
        createGrid();
    }    
}

playerTwoForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  if (playerTwoInput.value !== '') {
    main.classList.remove('main--hidden');
    header.classList.add('header--hidden');
  } else {
    main.classList.add('main--hidden');
    header.classList.remove('header--hidden');
  }
});

function checkEndGame() {
  for (let i = 0; i < 3; i++) {
    if (grid[i][0] !== '' && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
      if(grid[i][0] == "X"){
        scoreX++;
        localStorage.setItem('scoreX', scoreX);
      } else{
        scoreO++;
        localStorage.setItem('scoreO', scoreO);
      }
    }
  }

  for (let j = 0; j < 3; j++) {
    if (grid[0][j] !== '' && grid[0][j] === grid[1][j] && grid[1][j] === grid[2][j]) {
      if(grid[0][j] == 'X'){
        scoreX++;
        localStorage.setItem('scoreX', scoreX);
      } else{
        scoreO++;
        localStorage.setItem('scoreO', scoreO);
      }
    }
  }

  if (grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    if(grid[0][0] == 'X'){
      scoreX++;
      localStorage.setItem('scoreX', scoreX);
    } else{
      scoreO++;
      localStorage.setItem('scoreO', scoreO);
    }
  }
  if (grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    if(grid[0][2] == 'X'){
      scoreX++;
      localStorage.setItem('scoreX', scoreX);
    } else{
      scoreO++;
      localStorage.setItem('scoreO', scoreO);
    }
  }
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
            checkEndGame();
          }
        });
      }
    }
  };

squares.forEach(square => {
  square.addEventListener('click', () => {
    if (square.textContent === '') {
      square.textContent = currentPlayer; 
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

const loadGame = () => {
    if (gridContainer.children.length > 0) {
        while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
 }  
}

const backToLogin = () => {
  window.location = '../index.html';
}

window.onload = () => {
    playerOne.innerHTML = localStorage.getItem('player');
    loadGame();
}

submit.addEventListener('click', addPlayer);
