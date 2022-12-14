//Storing the images
let images = {
  1: "1.png",
  2: "2.png",
  3: "3.png",
  4: "4.png",
  5: "5.png",
};

// create questions
let questions = [
  new Question(
    "<img src='1.png' alt='one'/>",
    [
      "UNICEF",
      "Human Rights council",
      "united Nations Environment Programme",
      "International Monetary Fund",
    ],
    "UNICEF"
  ),
  new Question(
    "<img src='2.png' alt='two'/>",
    [
      "International Sociology Organization",
      "Soverign Union",
      "Socialist International",
      "Society Global",
    ],
    "International Sociology Organization"
  ),
  new Question(
    "<img src='3.png' alt='three'/>",
    [
      "Flower and Agriculture Organization",
      "Food and Aqua Organization",
      "Flower and Aqua Organization",
      "Food and Agriculture Organization",
    ],
    "Food and Agriculture Organization"
  ),
  new Question(
    "<img src='4.png' alt='four'/>",
    [
      "Boy Scouting emblem",
      "Girl Scouting emblem",
      "International Souting Movement",
      "Senior Scouting emblem",
    ],
    "International Souting Movement"
  ),
  new Question(
    "<img src='5.png' alt='five'/>",
    [
      "World War four",
      "World Wildlife Fund",
      "World wide Forest",
      "World Wide Flower",
    ],
    "World Wildlife Fund"
  ),
];

let startBtn = document.getElementById("get-started");
let questionContainerBox = document.getElementById("questions");

startBtn.addEventListener("click", startQuiz);
function startQuiz() {
  console.log("started");
  startBtn.classList.add("hide");

  let element = document.getElementById("quiz-container");
  element.classList.remove("hide");
}

function displayQuiz() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    // show question
    // let element = document.getElementById("question");
    questionContainerBox.innerHTML = quiz.getQuestionIndex().text;

    // show options
    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let element = document.getElementById("choice" + i);
      element.innerHTML = images[choices[i]]
        ? '<img src="' + images[choices[i]] + '"/>'
        : choices[i];
      userAnswer("btn" + i, choices[i]);
    }

    showProgress();
  }
}

// create quiz
let quiz = new Quiz(questions);

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

function userAnswer(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.userAnswer(guess);
    displayQuiz();
  };
}

function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let element = document.getElementById("progress");
  element.innerHTML =
    "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
  let gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  let element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
}

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.userAnswer = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }

  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

// display quiz
displayQuiz();
