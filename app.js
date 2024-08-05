let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissor"];
  const randonIdx = Math.floor(Math.random() * 3); //in general Math.random give us any random output between 0 to 1, so we multiplied it with 2 to get number between 0 to 2 as we have only 3 walue in out array and Math.floor is used to remove all the element after decimal
  return options[randonIdx];
};

const dramGame = () => {
  msg.innerText = "Game Draw 🤝, Play Again 🎮 ";
  msg.style.backgroundColor = "rgb(23, 1, 18)";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! 👍 ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Lose! 👎 ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  //generate compute choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    //Draw Game
    dramGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      //scissor,paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissor
      userWin = compChoice === "scissor" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

function resetScore() {
  const isConfirmed = confirm("Are you sure you want to reset the score");

  if (isConfirmed) {
    score.losses = 0;
    score.moves = 0;
    score.ties = 0;
    score.wins = 0;
    saveScore(); // Save the reset score
    showScore();
  }
}

document.querySelector(".reset-button").addEventListener("click", resetScore);
let isAutoPlaying = false;
let id;

//using setInterval, which runs a function in every set interval.
function autoPlay() {
  if (!isAutoPlaying) {
    id = setInterval(() => {
      let moves = ["rock", "paper", "scissor"];
      let randomMove = moves[Math.floor(Math.random() * moves.length)];
      handleButtonClick(randomMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".auto-play-button").innerHTML = "Stop";
  } else {
    clearInterval(id);
    document.querySelector(".auto-play-button").innerHTML = "Auto Play";
    isAutoPlaying = false;
  }
}

document.querySelector(".auto-play-button").addEventListener("click", autoPlay);
