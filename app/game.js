// document.addEventListener("DOMContentLoaded", () => {
//   // Elements for DOM manipulation
//   const GameArea = document.querySelector(".game");
//   const boardEl = document.querySelector(".showcase");
//   const startGameEl = document.querySelector(".start");
//   const containerStart = document.querySelector(".container.start");
//   const gameAreaEl = document.querySelector(".game-area");
//   const soundEl = document.querySelector("#sound");
//   const noSoundEl = document.querySelector("#no-sound");
//   const scoreEl = document.getElementById("score");
//   const body = document.body;

//   let gameStarted = false;
//   let score = 0;
//   let generationSpeed = 1000;
//   const generatedLetters = [];
//   const backgroundColor = [
//     "#A02334",
//     "#8344F6",
//     "#08004F",
//     "#1E1E1E",
//     "#005B44",
//     "#FFC75F",
//     "#FF9671",
//     "#E3A5C7",
//     "#FFAF00",
//     "#F5004F",
//     "#000000",
//     "#fff",
//     "#73BD3B",
//     "#9CA986",
//     "#CA413A",
//     "#F69A2B",
//   ];

//   // let velo = 15;

//   // Function to hide the welcome content (press the space bar)
//   function startGame() {
//     startGameEl.classList.add("hide");
//     gameAreaEl.classList.add("show");
//     body.classList.add("changeLevel");
//     body.classList.add("levelOne");
//   }

//   // Generate the letter and start moving it
//   function generateLetter() {
//     const randomColor = Math.floor(Math.random() * backgroundColor.length);
//     const randomLetter = String.fromCharCode(
//       97 + Math.floor(Math.random() * 26)
//     );
//     const letter = document.createElement("div");
//     letter.classList.add("letter");
//     letter.classList.add("zigzag");

//     letter.style.backgroundColor = backgroundColor[randomColor];
//     letter.style.color = randomColor === 11 ? "#000" : "#fff";
//     letter.style.boxShadow = `0 0px 3px 0 ${backgroundColor[randomColor]}`;
//     letter.innerText = randomLetter;
//     letter.style.top = "0%";
//     letter.style.left = `${Math.random() * 90}%`;

//     const letterExists = Array.from(GameArea.children).some(
//       (child) => child.innerText === randomLetter
//     );

//     if (!letterExists) {
//       const letterObj = {
//         letter: randomLetter,
//         letterEl: letter,
//         velocity: 2, // Adjust velocity as needed
//       };
//       generatedLetters.push(letterObj);
//       GameArea.appendChild(letter);
//       moveLetter(letterObj);
//     }
//   }

//   let isMoving = false;
//   let frameId;

//   // Function to move the letter with smooth animation
//   function moveLetter(letterObj) {
//     // if (!isMoving) {
//     //   return;
//     // }
//     const letter = letterObj.letterEl;
//     let topPosition = 0;

//     function animate() {
//       topPosition += letterObj.velocity;
//       letter.style.top = `${topPosition}px`;
//       if (isGameOver(letter)) {
//         letter.remove();
//         console.log("Game Overn with ", letter.innerText);
//         generatedLetters.splice(generatedLetters.indexOf(letterObj), 1);
//       } else {
//         frameId = requestAnimationFrame(animate);
//       }
//     }

//     frameId = requestAnimationFrame(animate);
//   }

//   // Function to check if the letter has reached the bottom of the game area
//   function isGameOver(letter) {
//     const letterRect = letter.getBoundingClientRect();
//     const gameAreaRect = GameArea.getBoundingClientRect();
//     return letterRect.bottom > 525;
//   }

//   // Function to check if the pressed letter matches any of the generated letters
//   function checkLetter(letter) {
//     let isMatched = false;
//     for (let i = 0; i < generatedLetters.length; i++) {
//       if (letter === generatedLetters[i].letter) {
//         // clearInterval(generatedLetters[i].intervalId);
//         generatedLetters[i].letterEl.remove();
//         generatedLetters.splice(i, 1);
//         isMatched = true;
//         break;
//       }
//     }

//     if (isMatched) {
//       score++;
//       console.log("Got it!");
//     } else {
//       console.log("Miss it");
//       score--;
//     }

//     updateScore();
//   }

//   // Function to update and format the score
//   function updateScore() {
//     if (score <= 0) score = 0;
//     scoreEl.innerText = formatScore(score);
//   }

//   function formatScore(score) {
//     if (score >= 1_000_000) {
//       scoreEl.style.fontSize = "18px";
//       return (score / 1_000_000).toFixed(1) + "M"; // e.g., "1.2M"
//     } else if (score >= 1_000) {
//       scoreEl.style.fontSize = "18px";
//       return (score / 1_000).toFixed(1) + "K"; // e.g., "1.2K"
//     } else {
//       return score.toString();
//     }
//   }

//   // Debounce the keypress event to avoid multiple responses
//   let isProcessingKey = false;

//   document.addEventListener("keypress", (e) => {
//     if (!isProcessingKey) {
//       isProcessingKey = true;
//       const userInput = e.key;
//       if (userInput !== " ") {
//         checkLetter(userInput);
//       }
//       updateScore();
//       setTimeout(() => {
//         isProcessingKey = false;
//       }, 100);
//     }
//   });

//   // Start the game when the user presses the space bar
//   document.addEventListener("keypress", (e) => {
//     if (e.key === " " && !gameStarted) {
//       gameStarted = true;
//       startGame();
//       const start = setInterval(generateLetter, generationSpeed);
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // Elements for DOM manipulation
  let start;
  const GameArea = document.querySelector(".game");
  const boardEl = document.querySelector(".showcase");
  const startGameEl = document.querySelector(".start");
  const containerStart = document.querySelector(".container.start");
  const gameAreaEl = document.querySelector(".game-area");
  const soundEl = document.querySelector("#sound");
  const noSoundEl = document.querySelector("#no-sound");
  const scoreEl = document.getElementById("score");
  const body = document.body;
  let gameStarted = false;
  let score = 0;
  let isGameOver = false;
  let generationSpeed = 2000;
  const generatedLetters = [];
  let frameAnimationIds = {};
  let frameId;
  let currentLevel = 0;
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

  let characterCase = {
    index: 0,
    option: "lowercase",
  };

  const options = [
    { lowercase: String.fromCharCode(97 + Math.floor(Math.random() * 26)) },
    { uppercase: String.fromCharCode(65 + Math.floor(Math.random() * 26)) },
    { numbers: String.fromCharCode(48 + Math.floor(Math.random() * 10)) },
    {
      symbols: "!@#$%^&*()_+-=[]{}|;':\",./?".charAt(
        Math.floor(Math.random() * 21)
      ),
    },
  ];

  // console.log(options[0].lowercase);
  // Starting the game by hiding the start menu
  function startGame() {
    startGameEl.classList.add("hide");
    gameAreaEl.classList.add("show");
    body.classList.add("changeLevel");
    body.classList.add("levelOne");
  }
  let pauseIsPress = false;
  const pauseBtn = document.getElementById("pause");
  pauseBtn.addEventListener("click", () => {
    pauseIsPress = true;
    stopGame();
  });

  function isPause() {
    if (pauseIsPress) {
      stopGame();
    }
  }

  // format the score in case it gets big
  function formatScore(score) {
    if (score >= 1_000_000) {
      scoreEl.style.fontSize = "18px";
      return (score / 1_000_000).toFixed(1) + "M"; // for example it can be 1.2M
    } else if (score >= 1_000) {
      scoreEl.style.fontSize = "18px";
      return (score / 1_000).toFixed(1) + "K"; //or 1.2K
    } else {
      return score.toString(); // or "1, 200"
    }
  }

  // update the score
  function updateScore() {
    if (score <= 0) {
      score = 0;
    }

    scoreEl.innerText = formatScore(score);
  }

  // Function to change the level
  function changeLevel() {
    if (score === 10) {
      body.classList.remove("levelTwo");
      body.classList.add("levelThree");
      currentLevel = 1;
      setTimeout(() => {
        currentLevel = 0;
      }, 30000);
    }
  }

  // function to show the level
  function showlevel(level) {
    const showcase = document.querySelector(".showcase");
    showcase.classList.add("showlevel");
    showcase.innerText = level;
    setTimeout(() => {
      showcase.classList.remove("showlevel");
    }, 2000);
  }
  function generateLetter(level) {
    if (isGameOver || pauseIsPress) return;
    const options = [
      { lowercase: String.fromCharCode(97 + Math.floor(Math.random() * 26)) },
      { uppercase: String.fromCharCode(65 + Math.floor(Math.random() * 26)) },
      { numbers: String.fromCharCode(48 + Math.floor(Math.random() * 10)) },
      {
        symbols: "!@#$%^&*()_+-=[]{}|;':\",./?".charAt(
          Math.floor(Math.random() * 21)
        ),
      },
    ];
    const availOptions = options.slice(0, level + 1);
    const randomIndexChoice = Math.floor(Math.random() * availOptions.length);
    const selecteOption = availOptions[randomIndexChoice];
    const keyList = Object.keys(selecteOption);
    const randonK = keyList[Math.floor(Math.random() * keyList.length)];
    const randomLetter = selecteOption[randonK];
    const randomColorIndex = Math.floor(Math.random() * backgroundColor.length);
    const letterEl = document.createElement("div");
    letterEl.classList.add("letter");
    letterEl.classList.add("zigzag");
    letterEl.innerText = randomLetter;
    letterEl.style.top = "0%";
    letterEl.style.left = `${Math.random() * 99}%`;
    if (randomColorIndex === 11) {
      letterEl.style.color = "#000";
    }
    letterEl.style.backgroundColor = `${backgroundColor[randomColorIndex]}`;

    // checking if the letter is already in the game area
    const letterExists = Array.from(GameArea.children).some(
      (letter) => letter.innerText === randomLetter
    );

    if (!letterExists) {
      const letterObject = {
        letter: randomLetter,
        letterEl,
        velocity: 20,
      };
      generatedLetters.push(letterObject);
      GameArea.appendChild(letterEl);
      moveLetter(letterObject);
    }

    console.log(generatedLetters);
  }

  function checkLetter(userInput) {
    // if (pauseIsPress || isGameOver) return;
    let isCorrect = false;
    let index;
    for (let i = 0; i < generatedLetters.length; i++) {
      if (userInput === generatedLetters[i].letter) {
        let letterEl = generatedLetters[i].letterEl;
        index = i;
        letterEl.classList.add("pop");
        generatedLetters.splice(i, 1);
        setTimeout(() => {
          GameArea.removeChild(letterEl);
        }, 500);
        isCorrect = true;
        break;
      }
    }

    if (isCorrect) {
      console.log(userInput, index);
      score++;
      console.log("Got it!");
    } else {
      score--;
      trigger();
      console.log("Miss it!");
    }
    updateScore();
  }

  // Make the letter move in the game area
  const maxVelocity = 200;
  let tolerance = 0.45;
  function moveLetter(letterObj) {
    if (letterObj.velocity < 100) {
      tolerance = 0.35;
    } else if (letterObj.velocity < 140) {
      tolerance = 0.4;
    } else if (letterObj.velocity < 50) {
      tolerance = 0.25;
    } else if (letterObj.velocity <= 20) {
      tolerance = 0.1;
    }
    const letter = letterObj.letterEl;
    let topPosition = 0;
    const borderSize = 15;
    let remainingDistance;
    letterObj.velocity = Math.min(letterObj.velocity, maxVelocity);
    const errorTolerance = letterObj.velocity * tolerance;
    let lastTimestamp = performance.now();

    function animate(timestamp) {
      const gameAreaHeight = GameArea.clientHeight;
      const effectiveHeight = gameAreaHeight + borderSize;
      const deltaTime = timestamp - lastTimestamp || 16;
      topPosition += (letterObj.velocity * deltaTime) / 1000;
      letter.style.top = `${topPosition}px`;
      remainingDistance = effectiveHeight - topPosition - letter.clientHeight;
      // console.log(letter.innerText, remainingDistance, topPosition);
      if (remainingDistance < -errorTolerance) {
        if (GameArea.contains(letter)) {
          isGameOver = true;
          stopGame();
          letter.remove();
          console.log(letter.innerText, "Game Over");
        }
      } else {
        frameId = requestAnimationFrame(animate);
        frameAnimationIds[letterObj.letter] = frameId;
      }

      lastTimestamp = timestamp;
    }

    // console.log(letter.innerText, remainingDistance);

    frameId = requestAnimationFrame(animate);
    frameAnimationIds[letterObj] = frameId;

    // console.log(letter.innerText, frameAnimationIds[letter]);
  }

  // checking if the letter typed is the correct one

  function trigger() {
    GameArea.classList.add("wrong");
    setTimeout(() => {
      GameArea.classList.remove("wrong");
    }, 100);
  }

  function stopGame() {
    stopAllAnimaton();
    clearInterval(startGenerate());
  }

  function stopAllAnimaton() {
    for (key in frameAnimationIds) {
      cancelAnimationFrame(frameAnimationIds[key]);
    }
    frameAnimationIds = {};
  }

  function startGenerate() {
    const start = setInterval(() => {
      generateLetter(currentLevel);
    }, generationSpeed);
    return start;
  }

  // check if the letter has reached the bottom of the game area
  // function checkLetterBottom(letter){

  // }
  // Listen to the key that the user types and make sure there's no multiple key press
  let isProcessingKey = false;
  document.addEventListener("keypress", (e) => {
    if (!isProcessingKey) {
      isProcessingKey = true;
      const userInput = e.key;
      if (userInput != " ") {
        checkLetter(userInput);
      }
      setTimeout(() => {
        isProcessingKey = false;
      }, 10);
    }
  });

  // checking the space bar to start
  document.addEventListener("keypress", (e) => {
    const spaceBar = e.key;
    if (spaceBar === " " && !gameStarted) {
      gameStarted = true;
      startGame();
      startGenerate();
      showlevel("Level 1");
    } else if (spaceBar === " " && gameStarted) {
      pauseIsPress = true;
      stopGame();
      console.log("Bar press for pausing");
    }
  });
});
