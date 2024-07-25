let correctGuessesTotal = localStorage.getItem('correctGuessesTotal') ? parseInt(localStorage.getItem('correctGuessesTotal')) : 0;
let wrongGuessesTotal = localStorage.getItem('wrongGuessesTotal') ? parseInt(localStorage.getItem('wrongGuessesTotal')) : 0;

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
let wrongGuesses = 0;
let clickedCards = [];
let level = 1;
let timer2 = 2500;
let lockBoard = false; // To prevent clicking during animation
let timer; // Timer variable
let timeRemaining = 60; // Initial time in seconds
let continueButton = document.getElementById("continueBut");
let paused = false;
let gameOver = false; // Flag to indicate if the game is over

continueButton.addEventListener('click', continueGame);

document.getElementById("continue").style.visibility = "hidden";

//the shuffle function: as it's a function, it allows us to call it every time we change levels or restart the game
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


//if a card is 'disabled' the user can't click it, meaning the user can't cheat the timer by clicking cards even when the clock isn't counting down
function togglePause() {
    if (gameOver) return; // Prevent pausing/resuming if the game is over
    paused = !paused;
    const items = document.querySelectorAll('.item');
    if (paused) {
        clearInterval(timer);
        items.forEach(item => item.classList.add('disabled')); // Add disabled class to all cards
        document.getElementsByClassName('pauseButton')[0].textContent = 'Resume';
    } else {
        startTimer();
        items.forEach(item => item.classList.remove('disabled')); // Remove disabled class from all cards
        document.getElementsByClassName('pauseButton')[0].textContent = 'Pause';
    }
}

//this sets up the game, shows the user the cards for a set time interval depending on the level, and resets all variables
function initializeGame() {
    shuffle(cardItems);
    correctGuesses = 0;
    wrongGuesses = 0;
    clickedCards = [];
    lockBoard = false;
    gameOver = false; // Reset gameOver flag
    timeRemaining = 60; // Reset the timer
    updateProgressBar();
    updateGuesses();
    const items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        item.dataset.value = cardItems[index].value;
        item.classList.remove('flipped', 'matched', 'card-preview', 'disabled'); // Remove all relevant classes
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

//this is where the timer is reset
function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        if (!paused) {
            timeRemaining--;
            document.getElementById('clockTimer').innerText = timeRemaining;
            if (timeRemaining <= 0) {
                clearInterval(timer);
                document.querySelectorAll('.item').forEach(item => item.classList.add('disabled'));
                gameOver = true; // Set gameOver flag
                document.getElementsByClassName('pauseButton')[0].disabled = true; // Disable the pause button
                alert("Time's up! Game over.");
            }
        }
    }, 1000);
}

//function that sets the card's class to 'flipped' and adds the card to our clickedCards array. 
//If clickedCards contains two cards, the cards are checked to see if they match each other
function flipCard(item) {
    if (lockBoard || item.classList.contains('flipped') || item.classList.contains('matched') || item.classList.contains('disabled')) return;
    item.classList.add('flipped');
    item.classList.remove('card-preview');
    item.innerHTML = item.dataset.value;
    clickedCards.push(item);

    if (clickedCards.length === 2) {
        lockBoard = true; // Lock the board until cards are checked
        setTimeout(checkForMatch, 500); // Adding delay for the flip animation
    }
}

//this function checks if clickedCards contains a match, the class matched gets added to the cards
//correctGuesses goes up by 1 if they're a match, and wrongGuesses goes up by one if they aren't
//the board also gets locked so that no more than two cards get considered 'matched' at one time
function checkForMatch() {
    const [firstCard, secondCard] = clickedCards;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        correctGuesses++;
        if (correctGuesses === cardItems.length / 2) {
            clearInterval(timer);
            gameOver = true; // Set gameOver flag
            document.getElementsByClassName('pauseButton')[0].disabled = true; // Disable the pause button
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

//this changes the number that the user sees for correctGuesses, wrongGuesses, and levelNumber
function updateGuesses() {
    document.getElementById('correctValue').innerText = correctGuesses;
    document.getElementById('incorrectValue').innerText = wrongGuesses;
    document.getElementById('levelNumber').innerText = level;
}

//this updates the progress bar as the user gets matches
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progress = (correctGuesses / (cardItems.length / 2)) * 100;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
}

window.addEventListener('load', initializeGame);

//this updates the level and adds to both correctGuessesTotal and wrongGuessesTotal
function continueGame(){
    if (level < 3){
        document.getElementById("continue").style.visibility = "hidden";
        correctGuessesTotal += correctGuesses;
        wrongGuessesTotal += wrongGuesses;
        localStorage.setItem('correctGuessesTotal', correctGuessesTotal);
        localStorage.setItem('wrongGuessesTotal', wrongGuessesTotal);
        level++;
        initializeGame();
        document.getElementsByClassName('pauseButton')[0].disabled = false; // Re-enable the pause button
    } else {
        if (level == 3){
            correctGuessesTotal += correctGuesses;
            wrongGuessesTotal += wrongGuesses;
            localStorage.setItem('correctGuessesTotal', correctGuessesTotal);
            localStorage.setItem('wrongGuessesTotal', wrongGuessesTotal);
        }
        window.location.href = 'endPage.html';
    }
}
