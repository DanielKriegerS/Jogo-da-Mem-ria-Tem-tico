const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const pause = document.querySelector('.pause');
const play = document.querySelector('.play');
const highscore = document.querySelector('.highscore');
const table = document.querySelector('#leaderboard');
const playerAName = document.querySelector('.playerAName');
const playerBName = document.querySelector('.playerBName');
const playerAPont = document.querySelector('.playerAPont');
const playerBPont = document.querySelector('.playerBPont');
let score;
let players = [];
let loop;
let isPaused = false;
let playerInTurn;

class Player {
    constructor(name, time) {
      this.name = name;
      this.time = time;
    }
  }

  function createPlayer(playerName, playerTime) {
    const player = new Player(playerName, playerTime);
    if(localStorage.getItem('playerInTurn') === localStorage.getItem('playerOne')){
        playerAPont.innerHTML = localStorage.getItem('playerAPont');
       
    } else {
        playerBPont.innerHTML = localStorage.getItem('playerBPont');
    }
    return player;
  }
  
  function turnPlayer(){
    if(localStorage.getItem('playerInTurn') === localStorage.getItem('playerOne')){
    localStorage.setItem('playerInTurn', localStorage.getItem('playerTwo'));
    spanPlayer.innerHTML = localStorage.getItem('playerTwo');
  } else {
    localStorage.setItem('playerInTurn', localStorage.getItem('playerOne'));
    spanPlayer.innerHTML = localStorage.getItem('playerOne');
  } 
   loadGame();
  }

const characters = [
    'all-doc-card',
    'amy',
    'angel',
    'boes face',
    'clara',
    'dallek',
    'doc-10s',
    'doc-12s',
    'doctor-smith',
    'missy',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 2){
        clearInterval(this.loop);
        alert(`Parabéns, ${localStorage.getItem('playerInTurn')}, você venceu! O tempo foi: ${timer.innerHTML} segundos.`);
        score = parseInt(timer.innerHTML);
        calculateScore(localStorage.getItem('playerInTurn'), score);
    }   
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card'); 

        firstCard = '';
        secondCard = ''; 

        checkEndGame();
    } else {

        setTimeout(() =>      {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');  
            
            firstCard = '';
            secondCard = '';    
        }, 500);

    }
}

const revealCard = ({target}) => {
   

    if (!target.parentNode.classList.toString().includes("grid")) {
        if (isPaused) {
            return;
        }
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    if (firstCard === ''){

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {
        
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode; 
        checkCards();
        checkEndGame();
    }
}
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../assets/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
} 

const loadGame = () => {

    if (grid.children.length > 0) {
        while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
 }

    const duplicateCharacters = [
        ... characters, ... characters
    ]

    const shuffledArray = duplicateCharacters.sort(() =>
        Math.random() -0.5
    );

    duplicateCharacters.forEach((character) => {
        
        const card = createCard(character);
        grid.appendChild(card);

    });

    startTimer();
    
    playerAName.innerHTML = localStorage.getItem('playerOne');
    playerBName.innerHTML = localStorage.getItem('playerTwo');
    playerAPont.innerHTML = localStorage.getItem('playerAPont');
    playerBPont.innerHTML = localStorage.getItem('playerBPont');
}

const startTimer = () => {
    timer.innerHTML = 0;

    if (loop) {
        return;
    }

    loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

const pauseTimer = () => {
    clearInterval(loop);
    loop = null;
    isPaused = true;
}

const continueTimer = () => {
    if (loop) {
        return;
    }

    loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
    isPaused = false;
}

const getHighscore = () =>{
    let result = localStorage.getItem('highscore') || 100000000;
    let highPlayer;
    if (localStorage.getItem() < result) {
        result = actualPlayer.time;
        highPlayer = localStorage.getItem('highPlayer');
        highscore.innerHTML = `${highPlayer} | ${this.highscore}`;
        localStorage.setItem('highPlayer', highPlayer);
        localStorage.setItem('highscore', actualPlayer.time);
    } else {
        alert(`Foi por pouco, mais sorte na próxima.`);
    }   
}

function calculateScore(playerName, playerScore) {
    if (playerName === localStorage.getItem('playerOne')) {
      if (parseInt(localStorage.getItem('playerAPont')) !== 0) {
        if (playerScore > parseInt(localStorage.getItem('playerAPont'))) {
          console.log('Não foi dessa vez');
        } else {
          localStorage.setItem('playerAPont', playerScore.toString());
          playerAName.innerHTML = localStorage.getItem('playerAPont');
        }
        turnPlayer();
      } else {
        localStorage.setItem('playerAPont', playerScore.toString());
        playerAName.innerHTML = localStorage.getItem('playerAPont');
        turnPlayer();
      }
    } else {
      if (parseInt(localStorage.getItem('playerBPont')) !== 0) {
        if (playerScore > parseInt(localStorage.getItem('playerBPont'))) {
          console.log('Não foi dessa vez');
        } else {
          localStorage.setItem('playerBPont', playerScore.toString());
          playerBName.innerHTML = localStorage.getItem('playerBPont');
        }
        turnPlayer();
      } else {
        localStorage.setItem('playerBPont', playerScore.toString());
        playerBName.innerHTML = localStorage.getItem('playerBPont');
        turnPlayer();
      }
    }
  }

const backToLogin = () => {
    window.location = '../pages/login.html';
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('playerOne');
    playerInTurn = localStorage.getItem('playerOne');
    localStorage.setItem('playerInTurn', playerInTurn);
    createPlayer(localStorage.getItem('playerOne'), parseInt(localStorage.getItem('playerAPont')));
    createPlayer(localStorage.getItem('playerTwo'), parseInt(localStorage.getItem('playerBPont')));
    startTimer();
    loadGame();
}

pause.addEventListener('click', pauseTimer);
play.addEventListener('click', continueTimer);
