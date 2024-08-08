document.addEventListener("DOMContentLoaded", () => {
  // Retrieve all the variables for the DOM manipulation
  const gameAreaEl = document.querySelector(".game-area");
  const startGameEl = document.querySelector(".start");

  /////////// ---------- Listening the space keyboard event --- ////////////
  document.addEventListener("keypress", (e) => {
    const spaceKeyBoard = e.key;
    if (spaceKeyBoard === " ") {
      startGameEl.classList.add("hide");
      gameAreaEl.classList.add("show");
    }
  });
});
