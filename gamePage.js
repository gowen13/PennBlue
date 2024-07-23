let cardItems = [
    { value: "a", flipped: false },
    { value: "a", flipped: false },
    { value: "b", flipped: false },
    { value: "b", flipped: false },
    { value: "c", flipped: false },
    { value: "c", flipped: false },
    { value: "d", flipped: false },
    { value: "d", flipped: false },
    { value: "e", flipped: false },
    { value: "e", flipped: false },
    { value: "f", flipped: false },
    { value: "f", flipped: false },
    { value: "g", flipped: false },
    { value: "g", flipped: false },
    { value: "h", flipped: false },
    { value: "h", flipped: false },
];

let correctGuesses = 0;
let correctGuessesTotal = 0;
let wrongGuesses = 0;
let wrongGuessesTotal = 0;
let clickedCards = [];
let level = 1;
let timer2 = 2500;
let lockBoard = false; // To prevent clicking during animation
let timer; // Timer variable
let timeRemaining = 60; // Initial time in seconds
let continueButton = document.getElementById("continueBut");

continueButton.addEventListener('click', continueGame);

document.getElementById("continue").style.visibility = "hidden";

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame() {
    shuffle(cardItems);
    correctGuesses = 0;
    wrongGuesses = 0;
    clickedCards = [];
    lockBoard = false;
    timeRemaining = 60; // Reset the timer
    updateProgressBar();
    updateGuesses();
    const items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        item.dataset.value = cardItems[index].value;
        item.classList.remove('flipped', 'matched', 'card-preview'); // Remove all relevant classes
        item.classList.add('card-preview'); // Add the preview class
        item.innerHTML = item.dataset.value; // Show the value for preview
    });

    // Show cards for preview period
    if (level == 2){
        timer2 = 1250;
    } else if (level == 3){
        timer2 = 0;
    }
    setTimeout(() => {
        items.forEach(item => {
            item.classList.remove('card-preview'); // Remove preview class
            item.addEventListener('click', () => flipCard(item)); // Add click event listener
            item.innerHTML = ''; // Hide the value after preview
        });

        startTimer(); // Start the timer
    }, timer2); // 2.5 seconds preview time
}

function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('clockTimer').innerText = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert("Time's up! Game over.");
            // initializeGame(); // Optionally restart the game
        }
    }, 1000);
}

function flipCard(item) {
    if (lockBoard || item.classList.contains('flipped') || item.classList.contains('matched')) return;
    item.classList.add('flipped');
    item.classList.remove('card-preview');
    item.innerHTML = item.dataset.value;
    clickedCards.push(item);

    if (clickedCards.length === 2) {
        lockBoard = true; // Lock the board until cards are checked
        setTimeout(checkForMatch, 500); // Adding delay for the flip animation
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = clickedCards;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        correctGuesses++;
        if (correctGuesses === cardItems.length / 2) {
            clearInterval(timer);
            // setTimeout(() => alert('Congratulations! You have matched all pairs!'), 500);
            // if (level < 3){
            //     level++;
            //     initializeGame();
            // } else{
            //     alert("You've finished the game!");
            // }
            document.getElementById("continue").style.visibility = "visible";
        }
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.classList.remove('card-preview');
        secondCard.classList.remove('card-preview');
        firstCard.innerHTML = '';
        secondCard.innerHTML = '';
        wrongGuesses++;
    }
    clickedCards = [];
    lockBoard = false; // Unlock the board
    updateGuesses();
    updateProgressBar();
}

function updateGuesses() {
    document.getElementById('correctValue').innerText = correctGuesses;
    document.getElementById('incorrectValue').innerText = wrongGuesses;
    document.getElementById('levelNumber').innerText = level;
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progress = (correctGuesses / (cardItems.length / 2)) * 100;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
}

window.addEventListener('load', initializeGame);

function continueGame(){
    if (level < 3){
        document.getElementById("continue").style.visibility = "hidden";
        correctGuessesTotal += correctGuesses;
        wrongGuessesTotal += wrongGuesses;
        level++;
        initializeGame();
    } else {
        window.location.href = 'endPage.html'
    }
}