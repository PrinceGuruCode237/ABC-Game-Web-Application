document.addEventListener("DOMContentLoaded", () => {
  // Retrieve all the variables for the DOM manipulation
  const gameAreaEl = document.querySelector(".game-area");
  const startGameEl = document.querySelector(".start");
  const body = document.body;

  /////////// ---------- Listening the space keyboard event to start the game --- ////////////
  document.addEventListener("keypress", (e) => {
    const spaceKeyBoard = e.key;
    if (spaceKeyBoard === " ") {
      startGameEl.classList.add("hide");
      gameAreaEl.classList.add("show");
      body.classList.add("levelOne");
    }
  });
});
