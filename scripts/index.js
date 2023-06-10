const gameModeSelect = document.getElementById("gameMode");
const playerLoginContainer = document.querySelector(".players__login");
const isInGame = false;
gameModeSelect.addEventListener("change", () => {
  if (gameModeSelect.value === "vs") {
    setTimeout(() => {
        window.location.href = './pages/login.html';
      }, 2000);
  } 
});
localStorage.clear();
localStorage.setItem('isInGame', isInGame);