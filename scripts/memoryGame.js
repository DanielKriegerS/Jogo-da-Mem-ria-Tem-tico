const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const pause = document.querySelector('.pause');
const play = document.querySelector('.play');
const highscore = document.querySelector('.highscore');
const table = document.querySelector('#leaderboard');
let score;
let players = [];
let loop;
let isPaused = false;

class Player {
    constructor(name, time) {
      this.name = name;
      this.time = time;
    }
  }

  const actualPlayer = new Player();

  function createPlayer(playerName, playerTime) {
     playerName = spanPlayer.innerHTML;
     playerTime = score;
     actualPlayer.name = playerName;
     actualPlayer.time = playerTime;
    players.push(actualPlayer);
    localStorage.setItem('players', JSON.stringify(players));
    updateLeaderboard();
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
        alert(`Parabéns, ${spanPlayer.innerHTML}, você venceu! O tempo foi: ${timer.innerHTML} segundos.`);
        score = timer.innerHTML;
        getHighscore();   
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

function updateLeaderboard() {
const sortedPlayers = JSON.parse(localStorage.getItem('players')).sort((a, b) => a.time - b.time);

  for (let i = 0; i < sortedPlayers.length && i < 10; i++) {
    const player = sortedPlayers[i];
    const row = table.rows[i+2];

    const position = row.cells[0];
    const name = row.cells[1];
    const time = row.cells[2];

    position.innerHTML = i + 1;
    name.innerHTML = player.name;
    time.innerHTML = player.time;
  }
  loadGame();
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
    createPlayer(actualPlayer.name, actualPlayer.time);
    if (actualPlayer.time < result) {
        result = actualPlayer.time;
        highPlayer = localStorage.getItem('highPlayer');
        highscore.innerHTML = `${highPlayer} | ${this.highscore}`;
        localStorage.setItem('highPlayer', highPlayer);
        localStorage.setItem('highscore', actualPlayer.time);
    } else {
        alert(`Foi por pouco, mais sorte na próxima.`);
    }
    
    updateLeaderboard();
}

const backToLogin = () => {
    window.location = '../pages/login.html';
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('playerOne');
    startTimer();
    loadGame();
}

pause.addEventListener('click', pauseTimer);
play.addEventListener('click', continueTimer);
