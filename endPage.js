let correctGuessesTotal = localStorage.getItem('correctGuessesTotal') ? parseInt(localStorage.getItem('correctGuessesTotal')) : 0;
let wrongGuessesTotal = localStorage.getItem('wrongGuessesTotal') ? parseInt(localStorage.getItem('wrongGuessesTotal')) : 0;

document.getElementById('incorrectValueTotal').textContent = wrongGuessesTotal;
document.getElementById('correctValueTotal').textContent = correctGuessesTotal;
document.getElementById('scoreCounter').textContent = correctGuessesTotal - wrongGuessesTotal;