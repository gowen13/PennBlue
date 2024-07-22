let cardItems = [
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

let items = document.getElementsByClassName("item");
for (let item of items){
    item = setValues()
}

let alreadyAdded = [];
function setValues(){
    let ranIndex = Math.floor(cardItems.length * Math.random);
    for (let index of alreadyAdded){
        if (ranIndex == index){
            setValues();
        }
    }
    return cardItems[ranIndex];
}

for (let item of items){
    item.addEventListener("click", checkSame, false);
}

let clickedCards = [];
function checkSame(){
    if (clickedCards.length == 1){
        let card1 = clickedCards[0];
        let card2 = this;
        if (card1.value == card2.value){
            card1.flipped = true;
            card2.flipped = true;
            correctGuesses++;
            redrawGrid();
        } else{
            card1.flipped = false;
            card2.flipped = false;
            wrongGuesses++;
            redrawGrid();
        }
    } else {
        clickedCards.append(this);
        this.flipped = true;
        redrawGrid();
    }
}

function redrawGrid(){
    let numLeft = 0;
    for (let item of items){
        if (item.flipped == true){
            numLeft++;
            item.backgroundColor = blue;

        }
    }
    if (numLeft == items.length){
        document.getElementById("container").textContent = "Finished!!";
    }
}



