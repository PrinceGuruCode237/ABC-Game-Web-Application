////////////////// Game Logic ///////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  // Elements for the DOM manipulation
  const GameArea = document.querySelector(".game");
  const boardEl = document.querySelector(".showcase");
  const score = 0;
  let defaultSpeed = 200;
  let defaultTimeStamp = 50;
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
  function generateLetter() {
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
    GameArea.appendChild(letter);
    moveLetter(letter);
  }

  function moveLetter(letter) {
    let topPosition = 0;
    const move = setInterval(() => {
      topPosition++;
      letter.style.top = `${topPosition}%`;
      console.log(topPosition);

      if (topPosition > 89) {
        // clearInterval(move);
        GameArea.removeChild(letter);
      }
    }, 100);
  }

  const generate = setInterval(generateLetter, 3000);
});
