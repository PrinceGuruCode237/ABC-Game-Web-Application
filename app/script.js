document.addEventListener("DOMContentLoaded", () => {
  // Retrieve all the variables for the DOM manipulation
  const gameAreaEl = document.querySelector(".game-area");
  const startGameEl = document.querySelector(".start");
  const body = document.body;
  const options = document.querySelectorAll(".option");
  const hamburgerMenuEl = document.querySelector(".hamburger");
  const menuBarEl = document.querySelector(".menu-bar");
  const closeMenuEl = document.getElementById("close");

  /////////// ---------- Listening the space keyboard event to start the game --- ////////////
  document.addEventListener("keypress", (e) => {
    const spaceKeyBoard = e.key;
    if (spaceKeyBoard === " ") {
      startGameEl.classList.add("hide");
      gameAreaEl.classList.add("show");
      body.classList.add("changeLevel");
      body.classList.add("levelOne");
    }
  });
  // Adding a tick on the suboptions (uppercase, lowercase, numbers and symbols)
  options.forEach((option) => {
    option.addEventListener("click", () => option.classList.toggle("checked"));
  });

  console.log(menuBarEl);
  hamburgerMenuEl.addEventListener("click", () => {
    menuBarEl.classList.add("show");
  });

  // Toggle the menubar on the click of the close Button
  closeMenuEl.addEventListener("click", () =>
    menuBarEl.classList.remove("show")
  );

  // Toggle the menubar on the click of the backdrop
  body.addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-bar")) {
      menuBarEl.classList.remove("show");
    }
  });
});
