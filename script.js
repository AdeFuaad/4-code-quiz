const startButton = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultsContainer = document.getElementById("results-container");
const initialsForm = document.getElementById("initials-form");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

startButton.addEventListener("click", startQuiz);
initialsForm.addEventListener("submit", saveScore);

let currentQuestionIndex, timeLeft, timerInterval, score;

const questions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    answers: [
      { text: "int myVar;", correct: false },
      { text: "let myVar;", correct: true },
      { text: "variable myVar;", correct: false },
      { text: "myVar = 0;", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answers: [
      { text: "String", correct: false },
      { text: "Number", correct: false },
      { text: "Boolean", correct: false },
      { text: "Character", correct: true },
    ],
  },
  {
    question: "Which method is used to add an element to the end of an array?",
    answers: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false },
    ],
  },
  {
    question: "How do you write a comment in JavaScript?",
    answers: [
      { text: "// This is a comment", correct: true },
      { text: "/* This is a comment", correct: false },
      { text: "<!-- This is a comment -->", correct: false },
      { text: "# This is a comment", correct: false },
    ],
  },
  {
    question:
      "Which of the following is the correct syntax for a function in JavaScript?",
    answers: [
      { text: "function myFunction() {}", correct: true },
      { text: "def myFunction() {}", correct: false },
      { text: "func myFunction() {}", correct: false },
      { text: "function:myFunction() {}", correct: false },
    ],
  },
  {
    question:
      "Which of the following is NOT a valid way to create an object in JavaScript?",
    answers: [
      { text: "const obj = {};", correct: false },
      { text: "const obj = new Object();", correct: false },
      { text: "const obj = Object.create();", correct: false },
      { text: "const obj = create Object();", correct: true },
    ],
  },
  {
    question: "Which method is used to remove the last element from an array?",
    answers: [
      { text: "push()", correct: false },
      { text: "pop()", correct: true },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false },
    ],
  },
  {
    question: 'What is the output of the following code: "2" + 2?',
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: true },
      { text: "NaN", correct: false },
      { text: "undefined", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a falsy value in JavaScript?",
    answers: [
      { text: "0", correct: false },
      { text: '""', correct: false },
      { text: "null", correct: false },
      { text: "1", correct: true },
    ],
  },
  {
    question:
      "Which of the following is the correct syntax to create an instance of a Date object in JavaScript?",
    answers: [
      { text: "let today = Date();", correct: false },
      { text: "let today = new Date;", correct: true },
      { text: "let today = new date();", correct: false },
      { text: "let today = Date.new;", correct: false },
    ],
  },
  {
    question: "What is the difference between let and var in JavaScript?",
    answers: [
      { text: "They are the same thing", correct: false },
      { text: "let is block-scoped, var is function-scoped", correct: true },
      { text: "var is block-scoped, let is function-scoped", correct: false },
      { text: "let is hoisted, var is not", correct: false },
    ],
  },
  {
    question: "What is a closure in JavaScript?",
    answers: [
      { text: "A function that returns another function", correct: false },
      { text: "A variable that cannot be changed", correct: false },
      { text: "A data structure for storing key-value pairs", correct: false },
      {
        text: "A way to access an outer function's scope from an inner function",
        correct: true,
      },
    ],
  },
  {
    question: "What is a higher-order function in JavaScript?",
    answers: [
      {
        text: "A function that takes another function as an argument, or returns a function as a result",
        correct: true,
      },
      {
        text: "A function that has a higher priority than other functions",
        correct: false,
      },
      { text: "A function that has more than one parameter", correct: false },
      {
        text: "A function that is used in functional programming",
        correct: false,
      },
    ],
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    answers: [
      { text: "They are the same thing", correct: false },
      {
        text: "== compares values, === compares values and types",
        correct: true,
      },
      {
        text: "== compares types, === compares values and types",
        correct: false,
      },
      {
        text: "== is used for assignment, === is used for comparison",
        correct: false,
      },
    ],
  },
  {
    question: "What is the this keyword in JavaScript?",
    answers: [
      {
        text: "A reserved keyword used for defining variables",
        correct: false,
      },
      {
        text: "A way to access an object's properties from within the object",
        correct: false,
      },
      {
        text: "A way to access a function's scope from within the function",
        correct: false,
      },
      {
        text: "A way to refer to the current object or context",
        correct: true,
      },
    ],
  },
  {
    question: "What is a callback function in JavaScript?",
    answers: [
      {
        text: "A function that is called when an event occurs",
        correct: false,
      },
      { text: "A function that is executed immediately", correct: false },
      {
        text: "A function that is passed as an argument to another function, and is called inside that function",
        correct: true,
      },
      { text: "A function that is used to create new objects", correct: false },
    ],
  },
  {
    question:
      "What is the difference between null and undefined in JavaScript?",
    answers: [
      { text: "They are the same thing", correct: false },
      {
        text: "null is a value that represents nothing, undefined means a variable has been declared but has not yet been assigned a value",
        correct: true,
      },
      {
        text: "null means a variable has been declared but has not yet been assigned a value, undefined is a value that represents nothing",
        correct: false,
      },
      {
        text: "null and undefined are both values that represent nothing",
        correct: false,
      },
    ],
  },
];

function startQuiz() {
  startButton.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  score = 0;
  currentQuestionIndex = 0;
  timeLeft = 60;
  timerInterval = setInterval(updateTime, 1000);
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(index, answer.correct));
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(answerIndex, isCorrect) {
  if (!isCorrect) {
    timeLeft -= 10;
  } else {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.classList.add("hidden");
  resultsContainer.classList.remove("hidden");
  scoreElement.textContent = score;
}

function updateTime() {
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endQuiz();
  } else {
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    timeLeft--;
  }
}

function saveScore(e) {
  e.preventDefault();
  const initials = initialsForm.initials.value;
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  const newScore = { initials, score };
  highscores.push(newScore);
  highscores.sort((a, b) => b.score - a.score);
  highscores = highscores.slice(0, 5); // Store only the top 5 high scores
  localStorage.setItem("highscores", JSON.stringify(highscores));
  window.location.href = "highscores.html"; // Redirect to a highscores page
}
