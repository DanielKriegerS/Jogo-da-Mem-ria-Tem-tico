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

  toggleMenuAndLogin(event);
});

  inputOne.addEventListener('input', validateInput);
  inputTwo.addEventListener('input', validateInput);