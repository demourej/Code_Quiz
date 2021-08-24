var secondsLeft = 41;
var questions = [
  "Which of this are not programming languages",
  "Which of the following is not a data type",
  "The condition in an if/else statement is enclosed between",
  "String values must be enclosed within _________",
  "A very useful tool used during development and debugging for printing content to the debugger is:",
];
var options = [
  "cobol",
  "PHP",
  "Excel",
  "Ruby on Rails",
  "Integer",
  "Key",
  "String",
  "Number",
  "Quotes",
  "Parentheses",
  "Square Brackets",
  "Curly Brackets",
  "Commas",
  "Parentheses",
  "console.log()",
  "Quotes",
  "console.log()",
  "Terminal",
  "For loops",
  "Javascript",
];
var answers = [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0];
var score;

var playButton = document.getElementById("Play");
var content = document.getElementById("content");
var timer = document.getElementById("timer");
var question = document.getElementById("question");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var scoring = document.getElementById("scoring");
var initials = document.getElementById("initials");
var sumbit = document.getElementById("submit");
var highscoresList = document.getElementById("highscoresList");
var highscoresSection = document.getElementById("highscores");
var clear = document.getElementById("clear");
var playAgain = document.getElementById("playAgain");
var myButton = document.getElementById("myButton");

answer1.style.display = "none";
answer2.style.display = "none";
answer3.style.display = "none";
answer4.style.display = "none";
initials.style.display = "none";
sumbit.style.display = "none";
highscoresSection.style.display = "none";

playButton.addEventListener("click", function (event) {
  content.textContent = "";
  start();
  quiz();
});

function start() {
  content.textContent = "";
  playButton.style.display = "none";
  answer1.style.display = "inline";
  answer2.style.display = "inline";
  answer3.style.display = "inline";
  answer4.style.display = "inline";

  question.textContent = questions[0];
  answer1.textContent = options[0];
  answer2.textContent = options[1];
  answer3.textContent = options[2];
  answer4.textContent = options[3];

  score = 0;
}

var timerInterval;

function checkAnswer(i, aux, timerInterval) {
  if (answers[i * 4 + aux] == 1) {
    score++;
    scoring.textContent = "Correct!";
  } else {
    secondsLeft = secondsLeft - 10;
    scoring.textContent = "Incorrect!";
  }
  i++;
  if (i == questions.length) {
    clearInterval(timerInterval);
    endQuiz();
    return;
  } else {
    question.textContent = questions[i];
    answer1.textContent = options[i * 4];
    answer2.textContent = options[i * 4 + 1];
    answer3.textContent = options[i * 4 + 2];
    answer4.textContent = options[i * 4 + 3];
  }
  return i;
}

function quiz() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft + " seconds";

    if (secondsLeft <= 0) {
      // Stops execution of action at set interval
      content.textContent = "Time's up!";
      clearInterval(timerInterval);
      // Calls function end game
      endQuiz();
    }
  }, 1000);

  var i = 0;

  answer1.addEventListener("click", function () {
    i = checkAnswer(i, 0, timerInterval);
  });

  answer2.addEventListener("click", function () {
    i = checkAnswer(i, 1, timerInterval);
  });

  answer3.addEventListener("click", function () {
    i = checkAnswer(i, 2, timerInterval);
  });

  answer4.addEventListener("click", function () {
    i = checkAnswer(i, 3, timerInterval);
  });
}

function endQuiz() {
  question.textContent = "Game over!";
  timer.textContent = "";
  answer1.style.display = "none";
  answer2.style.display = "none";
  answer3.style.display = "none";
  answer4.style.display = "none";
  scoring.textContent = "Score: " + score;
  initials.style.display = "inline";
  initials.textContent = "Type your initials";
  sumbit.style.display = "inline";
  timer.textContent = "";
  highscoresSection.style.display = "inline-block";
}

var highscores = [];

function initialsList() {
  highscoresList.innerHTML = "";

  highscores.sort(({ score: a }, { score: b }) => b - a);

  for (var i = 0; i < highscores.length; i++) {
    var highscore = highscores[i];

    var li = document.createElement("li");
    li.textContent =
      i + 1 + ". " + highscore.initials + " | " + highscore.score;
    li.setAttribute("data-index", i);

    highscoresList.appendChild(li);
  }
}

function init() {
  var storedScores = JSON.parse(localStorage.getItem("highscores"));
  console.log(storedScores);

  if (storedScores !== null) {
    highscores = storedScores;
  }

  initialsList();
}

sumbit.addEventListener("click", function (event) {
  var scoreText = initials.value.trim();

  var scores = {
    initials: scoreText,
    score: score,
  };

  if (scoreText === "") {
    return;
  }

  highscores.push(scores);
  initials.value = "";

  localStorage.setItem("highscores", JSON.stringify(highscores));
  initialsList();
});

init();

clear.addEventListener("click", function () {
  localStorage.clear();
  while (highscoresList.firstChild) {
    highscoresList.removeChild(highscoresList.firstChild);
  }
});

playAgain.addEventListener("click", function () {
  location.reload();
});

