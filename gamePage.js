let cardItems = [
    {value: "cat", background: "cat.jpg", flipped: false},
    {value: "cat", background: "cat.jpg", flipped: false},
    {value: "dog", background: "dog.jpg", flipped: false},
    {value: "dog", background: "dog.jpg", flipped: false},
    {value: "bird", background: "bird.jpg", flipped: false},
    {value: "bird", background: "bird.jpg", flipped: false},
    {value: "hamster", background: "hamster.jpg", flipped: false},
    {value: "hamster", background: "hamster.jpg", flipped: false},
    {value: "strawberry", background: "strawberry.jpg", flipped: false},
    {value: "strawberry", background: "strawberry.jpg", flipped: false},
    {value: "tree", background: "tree.jpg", flipped: false},
    {value: "tree", background: "tree.jpg", flipped: false},
    {value: "water", background: "water.jpg", flipped: false},
    {value: "water", background: "water.jpg", flipped: false},
    {value: "light", background: "light.jpg", flipped: false},
    {value: "light", background: "light.jpg", flipped: false},
];

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

