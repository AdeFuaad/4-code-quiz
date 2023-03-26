const highscoresList = document.getElementById('highscores-list');
const clearButton = document.getElementById('clear-btn');
const backButton = document.getElementById('back-btn');

clearButton.addEventListener('click', clearHighScores);
backButton.addEventListener('click', () => window.location.href = "index.html");

function loadHighScores() {
  const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  highscoresList.innerHTML = highscores
    .map((score) => `<li>${score.initials} - ${score.score}</li>`)
    .join('');
}

function clearHighScores() {
  localStorage.removeItem('highscores');
  loadHighScores();
}

loadHighScores();
