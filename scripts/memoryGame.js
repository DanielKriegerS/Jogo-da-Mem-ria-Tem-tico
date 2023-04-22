const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const pause = document.querySelector('.pause');
const play = document.querySelector('.play');
const highscore = document.querySelector('.highscore');
const table = document.querySelector('#leaderboard');
let players = [];
let loop;
let isPaused = false;

class Player {
    constructor(name, time) {
      this.name = name;
      this.time = time;
    }
  }

  function createPlayer() {
    const actualPlayer = new Player(localStorage.getItem('Player.name'), timer.innerHTML);
    players.push(actualPlayer);
    localStorage.setItem('players', JSON.stringify(players));
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

function sortPlayers() {
    players.sort((a, b) => a.time - b.time);
  }
  
  function createTable() {
    const header = table.createTHead();
    const row = header.insertRow();
    const positionHeader = row.insertCell();
    const nameHeader = row.insertCell();
    const timeHeader = row.insertCell();
    positionHeader.textContent = 'Posição';
    nameHeader.textContent = 'Nome';
    timeHeader.textContent = 'Tempo';

    for (let i = 0; i < 10; i++) {
        const row = table.insertRow();
        const position = row.insertCell(0);
        const name = row.insertCell(1);
        const time = row.insertCell(2);
        position.innerHTML = i + 1;
        name.innerHTML = '';
        time.innerHTML = '';
    }
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

    if (timer.innerHTML < result) {
        result = timer.innerHTML;
        highPlayer = spanPlayer.innerHTML;
        highscore.innerHTML = `${highPlayer} | ${result}`;
        localStorage.setItem('highPlayer', highPlayer);
        localStorage.setItem('highscore', result);
    } else {
        alert(`Foi por pouco, mais sorte na próxima.`);
    }
    loadGame();
}

const backToLogin = () => {
    window.location = '../index.html';
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    createTable();
    loadGame();
}

pause.addEventListener('click', pauseTimer);
play.addEventListener('click', continueTimer);
