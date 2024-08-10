////////////////// Game Logic ///////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  // Elements for the DOM manipulation
  const GameArea = document.querySelector(".game");
  const boardEl = document.querySelector(".showcase");
  const startGameEl = document.querySelector(".start");
  const containerStart = document.querySelector(".container.start");
  const gameAreaEl = document.querySelector(".game-area");
  const soundEl = document.querySelector("#sound");
  const noSoundEl = document.querySelector("#no-sound");
  const scoreEl = document.getElementById("score");
  let gameStarted = false;
  const body = document.body;
  let score = 0;
  let generationSpeed = 3000;
  let defaultTimeStamp = 200;
  const generatedLetters = [];
  const backgroundColor = [
    "#A02334",
    "#8344F6",
    "#08004F",
    "#1E1E1E",
    "#005B44",
    "#FFC75F",
    "#FF9671",
    "#E3A5C7",
    "#FFAF00",
    "#F5004F",
    "#000000",
    "#fff",
    "#73BD3B",
    "#9CA986",
    "#CA413A",
    "#F69A2B",
  ];

  // function to hide the welcome content (press the space bar)
  function startGame() {
    startGameEl.classList.add("hide");
    gameAreaEl.classList.add("show");
    body.classList.add("changeLevel");
    body.classList.add("levelOne");
  }

  function bounce(letter) {
    letter.classList.add("entrance");
    setTimeout(() => {
      letter.classList.add("entrance");
    }, 10);
  }

  // Generate the letter
  function generateLetter() {
    if (!gameStarted) {
      // if the game has started don't generate
      return;
    }
    const randomColor = Math.floor(Math.random() * backgroundColor.length);
    const randomLetter = String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    );
    const letter = document.createElement("div");
    letter.classList.add("letter");
    letter.classList.add("zigzag");
    if (randomColor === 11) {
      letter.style.color = "#000";
    }
    letter.style.backgroundColor = backgroundColor[randomColor];
    letter.style.boxShadow = `0 0px 3px 0 ${backgroundColor[randomColor]}`;
    letter.innerText = randomLetter;
    letter.style.top = "0%";
    letter.style.left = `${Math.random() * 90}%`;
    // Checking if the letter is already in the game area so that we don't have duplicate
    const letterGenerateOnArea = Array.from(GameArea.children); // Taking all the letters already generated then converting into an array
    const letterExist = letterGenerateOnArea.some(
      (letter) => letter.innerText === randomLetter
    );

    if (!letterExist) {
      generatedLetters.push({
        letter: randomLetter,
        letterEl: letter,
        position: 0,
      });
      GameArea.appendChild(letter);
      moveLetter(letter); // Calling the moving function to move the letter once it is created
    }

    // console.log(generatedLetters);
    updateScore();
  }

  document.addEventListener("keypress", (e) => {
    const userInput = e.key;
    if (userInput != " ") {
      checkLetter(userInput);
    }
    updateScore();
  });

  // Make the letter move
  function moveLetter(letter) {
    let topPosition = 0; // Define the move of the letter and it increases
    const move = setInterval(() => {
      topPosition++;
      letter.style.top = `${topPosition}%`;
      if (topPosition > 89) {
        if (GameArea.contains(letter)) {
          clearInterval(move);
          GameArea.removeChild(letter);
        }
      }
      // console.log(letter.innerText, topPosition);
    }, defaultTimeStamp);

    return move;
  }

  // Check the letter if it is correct
  function checkLetter(letter) {
    let isMatched = false;
    for (let i = 0; i < generatedLetters.length; i++) {
      if (letter === generatedLetters[i].letter) {
        generatedLetters[i].letterEl.remove();
        generatedLetters.splice(i, 1);
        isMatched = true;
        break;
      }
    }

    if (isMatched) {
      score++;
      console.log("Got it!");
    } else {
      console.log("Miss it");
      score--;
    }
  }

  // handling large score
  function formatScore(score) {
    if (score >= 1_000_000) {
      scoreEl.style.fontSize = "18px";
      return (score / 1_000_000).toFixed(1) + "M"; // e.g., "1.2M"
    } else if (score >= 1_000) {
      scoreEl.style.fontSize = "18px";
      return (score / 1_000).toFixed(1) + "K"; // e.g., "1.2K"
    } else {
      return score.toString();
    }
  }

  function updateScore() {
    if (score <= 0) {
      score = 0;
    }
    scoreEl.innerText = formatScore(score);
  }

  // Start the game when the user clicks on the space bar
  document.addEventListener("keypress", (e) => {
    const spaceKeyBoard = e.key;
    if (spaceKeyBoard === " " && !gameStarted) {
      gameStarted = true;
      startGame();
      const start = setInterval(generateLetter, generationSpeed);
    }
  });
});
