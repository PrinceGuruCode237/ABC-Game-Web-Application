document.addEventListener("DOMContentLoaded", () => {
  // Retrieve all the variables for the DOM manipulation
  const body = document.body;
  const options = document.querySelectorAll(".option");
  const hamburgerMenuEl = document.querySelector(".hamburger");
  const menuBarEl = document.querySelector(".menu-bar");
  const closeMenuEl = document.getElementById("close");
  const soundControlEl = document.querySelector(".sounds");
  const resetBtn = document.getElementById("reset");
  const pauseBtn = document.getElementById("pause");
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

  // Control the sound
  soundControlEl.addEventListener("click", () =>
    soundControlEl.classList.toggle("mute")
  );

  const Options = [
    { lowercase: String.fromCharCode(97 + Math.floor(Math.random() * 26)) },
    { uppercase: String.fromCharCode(65 + Math.floor(Math.random() * 26)) },
    { numbers: String.fromCharCode(48 + Math.floor(Math.random() * 10)) },
    {
      symbols: "!@#$%^&*()_+-=[]{}|;':\",./?".charAt(
        Math.floor(Math.random() * 21)
      ),
    },
  ];

  function getRandomCharacter(level) {
    const availableOptions = Options.slice(0, level + 1); // Select options based on level
    const randomIndex = Math.floor(Math.random() * availableOptions.length);
    const selectedOption = availableOptions[randomIndex];

    // Choose a random property from the selected option
    const keys = Object.keys(selectedOption);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    return selectedOption[randomKey];
  }

  // Example usage:
  let intervalId;
  const level = 0; // Include lowercase and uppercase characters
  function Start() {
    intervalId = setInterval(() => {
      const randomChar = getRandomCharacter(level);
      // console.log(randomChar);
    }, 1000);
  }

  Start();
});
