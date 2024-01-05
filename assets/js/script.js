window.onload = function() {
    mainFunction();
}

function mainFunction() {   
    let dealerSum = 0;
    let playerSum = 0;
    let dealerAces = 0;
    let playerAces = 0;
    let deck = buildDeck();
    //console.log(deck);    
    let dealerHidden = deck.splice([Math.floor(Math.random()*deck.length)],1);


    //console.log(dealerHidden);
    //console.log(deck);
    ;
}

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

function getCardValue(card){
    let data = card.split("-"); // get digits before "-"  
    
    // return related value based on digit  
    switch(data[0]){
        case "a":
            return 11;
        
        case "j":
        case "k":
        case "q":   
            return 10;
        
        default:
            return parseInt(data[0]); 
    }

}