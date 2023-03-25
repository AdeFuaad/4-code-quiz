// Define DOM elements
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const timeLeftElement = document.getElementById("time-left");
const gameOverContainer = document.getElementById("game-over-container");
const scoreElement = document.getElementById("score");
const initialsElement = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score-button");

// Define quiz questions and answers
const quiz = [
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What does JS stand for?",
    choices: ["JavaScript", "JavaSource", "JavaSauce"],
    answer: "JavaScript",
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    choices: ["//", "/*", "<!-- -->"],
    answer: "//",
  },
  {
    question: "What is the DOM in JavaScript?",
    choices: [
      "Document Object Model",
      "Data Object Model",
      "Display Object Model",
    ],
    answer: "Document Object Model",
  },
];

