const inputOne = document.querySelector('.player-one__input');
const inputTwo = document.querySelector('.player-two__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');
const menu = document.querySelector('.menu ul');
const login = document.querySelector('.players__login');

function validateInput () {
  if (inputOne.value.length > 2 && inputTwo.value.length > 2){
    button.removeAttribute('disabled');
} else {
    button.setAttribute('disabled', '');
}
}

const toggleMenuAndLogin = (event) => {
  event.preventDefault();
  if (menu.style.visibility === 'hidden') {
    menu.style.visibility = 'visible';
    menu.style.opacity = 1;

    login.style.visibility = 'hidden';
    login.style.opacity = 0;
  } else {
    menu.style.visibility = 'hidden';
    menu.style.opacity = 0;

    login.style.visibility = 'visible';
    login.style.opacity = 1;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const playerOne = inputOne.value;
  localStorage.setItem('playerOne', playerOne);
  const playerTwo = inputTwo.value;
  localStorage.setItem('playerTwo', playerTwo);
  let isInGame = false;
  localStorage.setItem('isInGame', isInGame);
  localStorage.setItem('playerInTurn', playerOne);
  toggleMenuAndLogin(event);
});

  inputOne.addEventListener('input', validateInput);
  inputTwo.addEventListener('input', validateInput);

  inputOne.addEventListener('mouseenter', () => {
    inputOne.classList.add('input-hover');
    inputOne.classList.add('placeholder-hover');
    inputOne.setAttribute('placeholder', 'Máx 3 chars.');
  });
  
  inputOne.addEventListener('mouseleave', () => {
    inputOne.classList.remove('input-hover');
    inputOne.classList.remove('placeholder-hover');
    inputOne.setAttribute('placeholder', 'Player One');
  });
  
  inputTwo.addEventListener('mouseenter', () => {
    inputTwo.classList.add('input-hover');
    inputTwo.classList.add('placeholder-hover');
    inputTwo.setAttribute('placeholder', 'Máx 3 chars.');
  });
  
  inputTwo.addEventListener('mouseleave', () => {
    inputTwo.classList.remove('input-hover');
    inputTwo.classList.remove('placeholder-hover');
    inputTwo.setAttribute('placeholder', 'Player Two');
  });

  window.onload = () => {
   if (localStorage.getItem('isInGame') !== null){
    window.location.href = 'overallScore.html'; 
   }
}