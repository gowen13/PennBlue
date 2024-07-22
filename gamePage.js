
let cardItems = [/*an array that contains "value" and "flipped" */
    {value: "a", flipped: false},
    {value: "a", flipped: false},
    {value: "b", flipped: false},
    {value: "b", flipped: false},
    {value: "c", flipped: false},
    {value: "c", flipped: false},
    {value: "d", flipped: false},
    {value: "d", flipped: false},
    {value: "e", flipped: false},
    {value: "e", flipped: false},
    {value: "f", flipped: false},
    {value: "f", flipped: false},
    {value: "g", flipped: false},
    {value: "g", flipped: false},
    {value: "h", flipped: false},
    {value: "h", flipped: false},
];

let correctGuesses = 0;
let wrongGuesses = 0;
let clickedCards = [];

function shuffle(array){/*a shuffle function, that ensure all cards were randomly placed after we refresh the web page*/
    for(let i = array.length - 1;i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j],array[i]];
    }
}

shuffle(cardItems);/*shuffle the web page before we start to flip them*/

let items = document.getElementsByClassName("item");/*all things that contains "item" element, including all*/

for(let i = 0; i< items.length; i++){
    items[i].dataset.value = cardItems[i].value;/*the value of the card*/
    items[i].dataset.flipped = cardItems[i].flipped;/*whether the card was being flipped*/
    itmes[i].addEventListener("click", function(){/*when clicked, use flipcard mmethod*/
        flipCard(this);
    });
}

function flipCard(card) {
    if (clickedCards.length === 1) {/*if some card has been clicked, and what we are clicking is the second card.*/
        let card1 = clickedCards[0];/*get the first card we've clicked on*/
        let card2 = card;/*get the second card(card we just clicked)*/

        if (card1.dataset.value === card2.dataset.value) {/*check whether two cards matches each other*/
            card1.classList.add('flipped');/*let these cards being signed as "flipped"*/
            card2.classList.add('flipped');
            correctGuesses++;/*increase the number we guess correct*/
        } else {/*if the two cards cannot match together correctly*/
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);/*let these two cards go back to the status that not being flipped after 1000ms*/
            wrongGuesses++;/*increase the number we guess wrong*/
        }

        clickedCards = [];/*clear clickedCards array*/
        redrawGrid();
    } else {/*if no cards was being clicked before we clicked this one*/
        card.classList.add('flipped');/*let the status of the card becomes clicked*/
        clickedCards.push(card);/*add this clicked card into the clickedCards array*/
    }
}



function redrawGrid(){/*is a function that update all things in canvas*/
    document.getElementById("correctGuesses").textContent = correctGuesses;/*update the number of correctGuesses*/
    docuemnt.getElementById("wrongGuesses").textContent = wrongGuesses;/*same as above*/

    let numLeft = 0;/*calculate the number of flipped cards*/
    for (let item of items){
        if (items.classList.contains('flipped')){
            numLeft++;
        }
    }

    if (numLeft == items.length){/*if all cards were flipped, then game over*/
        document.getElementById("container").textContent = "Finished!!";
    }
}
