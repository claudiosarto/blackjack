function buildDeck(){
    let deck = [];
    let cardValues = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
    let cardTypes = ["c", "d", "h", "s"];

    for (let i = 0; i < cardTypes.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
            deck.push(cardValues[j] + "-" + cardTypes[i]);
        }
    }
    return deck;
}

window.onload = function() {
    mainFunction();
}

function mainFunction() {   
    let dealerSum = 0;
    let playerSum = 0;
    let deck = buildDeck();
    //console.log(deck);
}



// pick random card from deck: deck.splice([Math.floor(Math.random()*deck.length)],1); 