const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');
const menu = document.querySelector('.menu ul');

const validateInput = ({target}) => {
    if (target.value.length > 2){
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
}

const openMenu = (event) => {
    event.preventDefault();
  if (menu.style.visibility === 'hidden') {
    menu.style.visibility = 'visible';
    menu.style.opacity = 1;
  } else {
    menu.style.visibility = 'hidden';
    menu.style.opacity = 0;
  }
};



  input.addEventListener('input', validateInput);
  form.addEventListener('submit', openMenu);
  button.addEventListener('click', () => {
    const player = input.value;
    localStorage.setItem('player', player);
  });