const playerOne = document.querySelector('.playerOne');
const playerTwo = document.querySelector('.playerTwo');
const submit = document.querySelector('.submit');
const grid = document.querySelector('.grid');
const table = document.querySelector('.table');
const header = document.querySelector('.header');
const main = document.querySelector('.main');
var playerTwoInput = document.querySelector('.playerTwoInput');
const playerTwoForm = document.querySelector('#playerTwoForm');

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

const squares = document.querySelectorAll('.square'); 

let currentPlayer = 'X'; 
const createGrid = () => {
    const grid = Array.from(Array(3), () => new Array(3).fill(''));
  
    const gridContainer = document.querySelector('.grid');
  
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
    if (grid.children.length > 0) {
        while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
 }  
}

window.onload = () => {
    playerOne.innerHTML = localStorage.getItem('player');
    loadGame();
}

submit.addEventListener('click', addPlayer);
