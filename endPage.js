let correctGuessesTotal = localStorage.getItem('correctGuessesTotal') ? parseInt(localStorage.getItem('correctGuessesTotal')) : 0;
let wrongGuessesTotal = localStorage.getItem('wrongGuessesTotal') ? parseInt(localStorage.getItem('wrongGuessesTotal')) : 0;

let bestScore = localStorage.getItem('bestScore') ? parseInt(localStorage.getItem('bestScore')) : 0;

document.getElementById('incorrectValueTotal').textContent = wrongGuessesTotal;
document.getElementById('correctValueTotal').textContent = correctGuessesTotal;
document.getElementById('scoreCounter').textContent = correctGuessesTotal - wrongGuessesTotal;

if (bestScore < (correctGuessesTotal - wrongGuessesTotal)){
    bestScore = correctGuessesTotal - wrongGuessesTotal;
    localStorage.setItem('bestScore', bestScore);
}
document.getElementById('bestScoreCounter').textContent = bestScore;