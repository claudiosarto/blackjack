window.onload = function() {
    mainFunction();
}

function mainFunction() {   
    let dealerSum = 0;
    let playerSum = 0;
    let dealerAces = 0;
    let playerAces = 0;
    // Build Deck
    let deck = buildDeck();
    //console.log(deck);    
    // Pick Dealer Hidden Card and add to Dealer sum
    let dealerHidden = deck.splice([Math.floor(Math.random() * deck.length)],1);
    dealerSum += getCardValue(dealerHidden);
    console.log("Dealer Hidden: " + dealerHidden);
    console.log("Dealer Sum: " + dealerSum);

    // Pick Dealer Visible Card and put it on the play area
    let dealerVisible = deck.splice([Math.floor(Math.random() * deck.length)],1);
    dealerSum += getCardValue(dealerVisible);
    console.log("Dealer Sum: " + dealerSum);
    let dealerVisibleImg = document.createElement("img");
    dealerVisibleImg.src = "./assets/images/" + dealerVisible + ".webp";
    document.getElementById("dealer-cards").append(dealerVisibleImg);

    // Pick Player Cards
    for (let i = 0; i < 2; i++) {
        let playerCardImg = document.createElement("img");
        let playerCard = deck.splice([Math.floor(Math.random() * deck.length)],1);;
        playerCardImg.src = "./assets/images/" + playerCard + ".webp";
        playerSum += getCardValue(playerCard);
        document.getElementById("player-cards").append(playerCardImg);
    }
    console.log("Player Sum: " + playerSum);

    document.getElementById("btn-hit").addEventListener("click", hit.bind(null,playerSum,deck));
    
    //document.getElementById("btn-stay").addEventListener("click", stay);

    //console.log(deck);
    //debugger
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

function hit(sum,deck){
    let playerCard = document.createElement("img");
    let card = deck.splice([Math.floor(Math.random() * deck.length)],1);
    console.log("Hit Fucntion card " + card);
    console.log("Hit Fucntion deck " + deck);
    playerCard.src = "./assets/images/" + card + ".webp";
    sum += getCardValue(card);
    document.getElementById("player-cards").append(playerCard);
    //debugger
}

