let cards = [] // cards variable with an array so we can display the number only when the start game button is clicked.
let sum = 0 // sum is set to 0 so no other number would be added.
let isAlive = false // the game hasn't even begin so the player is not alive.
let hasBlackJack = false // the game hasn't even being so the player did not won anything yet.
let message = "" // message variable have empty string to display apporiate message according to the sum of the cards.
let player = {
    name: "Amin Khan",
    chips: 200
} // player object to store name and chips data.


// Grabbing html elements with their id's and storing them into let variables for later use, the id's are Message, Cards, Sum, and Player.
const messageEl = document.getElementById("message-el") 
const cardEl = document.getElementById("cards-el")
const sumEl = document.getElementById("sum-el")
const playerEl = document.getElementById("player-el")
const resetBtn = document.getElementById("reset-btn") // grabing the button by id.



// Using the player-el id to display player's data which is stored in the player object.
playerEl.textContent = player.name + ": $" + player.chips

// Creating a function randCards() which creates random numbers between 1-13 and then this numbers are generate the values of the firstCard, secondCard and newCard, after that this numbers display in card-el tag.
function randomCards(){
    let randomIndex = Math.floor(Math.random() * 13) + 1
    // In Blackjack the value of 11, 12, 13 are 10, and the value of 1 is 11.
    // So if the random number is more than 10 (which is 11, 12, 13) then add the value to the sum as 10 not as 11, 12, or 13. (but for some reason its not happening when I learn  I bit more about javascript I will come and debug you.)
    if (randomIndex > 10){
        return 10
        // if the randomIndex number is 1 the value should be 11 not 1.
    } else if (randomIndex === 1) {
        return 11
        // and the for the rest of the cards it can be 2-10 numbers
    } else {
        return randomIndex
    }
}

// When the Start Game button is clicked this function makes a few things clear.
function startGame(){
    isAlive = true // 1st the player is alive.
    // 2nd the firstCard and the secondCard's number is being pulled out from the randomCards function.
    let firstCard = randomCards()
    let secondCard = randomCards()
    // 3rd the numbers of the first and the second cards are now pushed into an arary, this is done to add more cards when the player is still alive and has not blackjacked yet(inshort when picking new card those cards are pushed into this array after the first two cards).
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard// 4th the sum of the first 2 numbers are added and displayed to the sum tag.
    renderGame()// 5th at last, the games logic kicks in by turning on the renderGame function.
}

// The logic of the game, all this happens when the start game button and the new card button is clicked.
function renderGame(){
    cardEl.textContent = "CARDS: " // in the cards-el tag this word is displayed when start game is clicked.
    // using for loop to display the cards array, with the first 2 cards all the extra new cards appears here, that is why i is set to be < cards.length(which it ends with the last card in the array-cards) i is set to ++ which means increment, that shows more cards if added to an array.
    for (let i = 0; i < cards.length; i++){
        // so now we are displaing what ever is in the array useing for loop with some space between them.
        cardEl.textContent += cards[i] + " "
    }
//in the sum-el tag this word is displayed when start game is clicked.
    sumEl.textContent = "SUM: " + sum
    //Depending on the sum of the cards an appopriate messages displays in the message-el tag, if the sum is less than or equal to 20 than you are elibible to pick a new card, if your sum is strictly 21 then you have won the blackjack game and then you are not elibible to draw more cards, if your sum is more the 21 then you are out and you are not elibible to draw more cards.
        if(sum <= 20){
        message = "Do You Want To Draw A New Card? 🚩"
    } else if (sum === 21){
        message = "🏆 You've Got Blackjack!! 💰💰💰"// only if the the sum is 21 then hasBlackJack become true other than that its always flase.
        hasBlackJack = true
    } else {
        message = "Sorry, You're Out Of The Game! 👎"
        isAlive = false// here is alive is false, because when the game beggins the players becomes alive and when is total sum is more than 21 then the player is dead and in other words false.
    }
    messageEl.textContent = message // displaying the appopriate messages according to the sum by assiging the value of messageEl tag to message.

}

// the new card button function.
function newCard(){
    // the player is only able to draw a new card when the if conditions are set, if the player is alive and he has not won the blackjack yet then only he can draw a new card.
    if (isAlive === true && hasBlackJack === false){
        let card = randomCards()// making a new variable called card which has the value of randomCards() function.
        cards.push(card)// we are pushing this new variable called card with the value of randomCards() to the array of cards.
        sum += card// we are then adding the new card number to the previous sum of the other cards.
        renderGame()// after picking and adding the card we are calling the render game again to check weather the player has won or lost by picking the new card and also to see if we can still play the game or not.
    }
}


resetBtn.addEventListener("click", function(){ // using addeventlistener to make the convert the ids variable into a button.
    // The text of messageEl, cardEl, and sumEl are back to what they were before clikcking start game. 
    messageEl.textContent = "Want to play one round:🃏" 
    cardEl.textContent = "Cards: 🎰"
    sumEl.textContent = "Sum: 💰"
    // The values are reset back to empty and false.
    cards = []
    sum = 0
    isAlive = false
    hasBlackJack = false
})