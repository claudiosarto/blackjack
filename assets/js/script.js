// Build Deck
let deck = buildDeck();
let dealerSum = 0;
let playerSum = 0;
let dealerHidden;
let playerCanHit = true; // set parameter to check if player has sum >21
let dealerCanHit = true; // set parameter to check if dealer has sum >21
let displayResult = false; // set parameter to check if result for displaying current game
//let dealerAces = 0;
//let playerAces = 0;

window.onload = function() {
    mainFunction();
};

function mainFunction() {     
    document.getElementById("btn-restart").style.display = 'none';  
  
    // Pick Dealer Hidden Card and add to Dealer sum
    dealerHidden = deck.splice([Math.floor(Math.random() * deck.length)],1);
    dealerSum += getCardValue(dealerHidden);

    // Update Dealer hidden card image src
    document.getElementById("dealerHidden").src = "./assets/images/cardback.webp";

    // Pick Dealer Visible Card and put it on the play area
    let dealerVisible = deck.splice([Math.floor(Math.random() * deck.length)],1);
    dealerSum += getCardValue(dealerVisible);
    let dealerVisibleImg = document.createElement("img");
    dealerVisibleImg.src = "./assets/images/" + dealerVisible + ".webp";
    document.getElementById("dealer-cards").append(dealerVisibleImg);

    // Pick 2 Player Cards
    for (let i = 0; i < 2; i++) {
        let playerCardImg = document.createElement("img");
        let playerCard = deck.splice([Math.floor(Math.random() * deck.length)],1);
        playerCardImg.src = "./assets/images/" + playerCard + ".webp";
        playerSum += getCardValue(playerCard);
        document.getElementById("player-cards").append(playerCardImg);
    }
    document.getElementById("btn-hit").addEventListener("click", hit);
    document.getElementById("btn-stay").addEventListener("click", stay);
    document.getElementById("btn-restart").addEventListener("click", restart);
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
    let data = card[0].split("-"); // get digits before "-"  
    
    // return related value based on digits before "-"
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

function hit(){
    if (playerCanHit == false){
        return;
    }
    let playerCard = document.createElement("img");
    let card = deck.splice([Math.floor(Math.random() * deck.length)],1);
    playerCard.src = "./assets/images/" + card + ".webp";
    playerSum += getCardValue(card);
    document.getElementById("player-cards").append(playerCard);
    if (playerSum > 21){
        playerCanHit = false;
        // call stay function as the game ends
        stay();
    }
    //debugger
}

function stay(){
    playerCanHit = false;
    document.getElementById("dealerHidden").src = "./assets/images/" + dealerHidden + ".webp";
    // Dealer must have at least 17
    while (dealerSum<17) {
        dealerHit();
    }  

    // Checking scores:
    let gameResult="";
    if (playerSum>21){
        gameResult = "Player lose!";
        document.getElementById("results").style.color="red";
    } 
    else if (dealerSum > 21){
        gameResult = "Player Win!";
        document.getElementById("results").style.color="green";
    } 
    else if (dealerSum == playerSum){
        gameResult = "It's a Tie!";
    }
    else if (dealerSum > playerSum){
        gameResult = "Player Lose!";
        document.getElementById("results").style.color="red";
    }
    else if (dealerSum < playerSum){
        gameResult = "Player Win!";
        document.getElementById("results").style.color="green";
    }  
    
    // Check to avoid multiple clicks on stay
    if (displayResult===false){
        document.getElementById("dealer-score").append("Dealer Score: " + dealerSum);
        document.getElementById("player-score").append("Player Score: " + playerSum);
        document.getElementById("results").append(gameResult);
        document.getElementById("btn-restart").style.display = '';
        displayResult=true;
    }   
}

function dealerHit(){
    if (dealerCanHit == false){
        return;
    }
    let dealerCard = document.createElement("img");
    let card = deck.splice([Math.floor(Math.random() * deck.length)],1);
    dealerCard.src = "./assets/images/" + card + ".webp";
    dealerSum += getCardValue(card);
    document.getElementById("dealer-cards").append(dealerCard);
    if (dealerSum > 21){
        dealerCanHit = false;
    }
}

function restart(){
    // clean dealer cards area except for dealerHidden element
    let cleaner = document.getElementById("dealer-cards");
    while (cleaner.lastChild.id !== 'dealerHidden') {
        cleaner.removeChild(cleaner.lastChild);
    }
    // clean player cards area
    cleaner = document.getElementById("player-cards");
    while (cleaner.hasChildNodes()) {
        cleaner.removeChild(cleaner.lastChild);
    }
    // reset all the variable used
    deck = buildDeck();
    dealerSum = 0;
    playerSum = 0;
    dealerHidden = "";
    playerCanHit = true; 
    dealerCanHit = true;
    displayResult = false; 
    // reset score and result area
    document.getElementById("dealer-score").innerHTML="";
    document.getElementById("player-score").innerHTML="";
    document.getElementById("results").innerHTML="";
    mainFunction();
}