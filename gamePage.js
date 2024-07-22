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
let lockBoard = false; // To prevent clicking during animation

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame(){
    shuffle(cardItems);
    let items = document.getElementsByClassName("item");
    for (let i = 0; i < items.length; i++) {
        items[i].dataset.value = cardItems[i].value;
        items[i].dataset.flipped = cardItems[i].flipped;
        items[i].addEventListener("click", function () {
            flipCard(this);
        });
    }
    const allCards = document.querySelectorAll('.item');
    allCards.forEach(card => card.classList.add('flipped'));
    setTimeout(() => {
        allCards.forEach(card => card.classList.remove("flipped"));
    }, 1250);
    }
}


function flipCard(card) {
    if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');

    if (clickedCards.length === 0) {
        clickedCards.push(card);
    } else {
        clickedCards.push(card);
        lockBoard = true;

        setTimeout(() => {
            checkMatch();
        }, 1000);
    }
}
function checkMatch(){
    let card1 = clickedCards[0];
    let card2 = clickedCards[1];

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        correctGuesses++;
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        wrongGuesses++;
    }

    clickedCards = [];
    lockBoard = false;
    redrawGrid();
}

function redrawGrid() {
    document.getElementById("correctValue").textContent = correctGuesses;
    document.getElementById("incorrectValue").textContent = wrongGuesses;

    let numLeft = 0;
    for (let item of items) {
        if (item.classList.contains('flipped')) {
            numLeft++;
        }
    }

    if (numLeft == items.length) {
        document.getElementById("container").textContent = "Finished!!";
    }

    // Update the progress bar
    let progress = (correctGuesses / (items.length / 2)) * 100;
    document.querySelector('.progress-bar').style.width = progress + '%';
}
initializeGame();
