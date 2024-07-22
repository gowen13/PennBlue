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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cardItems);

let items = document.getElementsByClassName("item");

for (let i = 0; i < items.length; i++) {
    items[i].dataset.value = cardItems[i].value;
    items[i].dataset.flipped = cardItems[i].flipped;
    items[i].addEventListener("click", function () {
        flipCard(this);
    });
}

function flipCard(card) {
    if (clickedCards.length === 1) {
        let card1 = clickedCards[0];
        let card2 = card;

        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('flipped');
            card2.classList.add('flipped');
            correctGuesses++;
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
            wrongGuesses++;
        }

        clickedCards = [];
        redrawGrid();
    } else {
        card.classList.add('flipped');
        clickedCards.push(card);
    }
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
        document.querySelector(".container").textContent = "Finished!!";
    }

    // Update the progress bar
    let progress = (correctGuesses / (items.length / 2)) * 100;
    document.querySelector('.progress-bar').style.width = progress + '%';
}
