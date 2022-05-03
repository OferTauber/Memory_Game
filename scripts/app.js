import { Card } from "./card.js";

const theGame = {
  cards: [],
  boardElement: document.querySelector(".game-board"),
  gameLevel: 12, //! for "geek out" we can change this
  openCard: undefined, // or card from cards array
  numOfUnrevealedPairs: 6,
  numOfWrongGuesses: 10,
  gamePause: false,
  gameOver: false,

  generateCards() {
    const templateArr = generateRandArrOfPairs(12);

    createAndAppendAllCards(templateArr, this.boardElement);

    for (const id of templateArr) {
      this.cards.unshift(new Card(id, this));
      console.log(this.cards[0]);
      const closure = this.cards[0];
      closure.cardElement.addEventListener("click", (e) => {
        closure.click();
      });
    }
  },

  handleClick(card) {
    if (this.gameOver || this.gamePause || card.faceUp) return;

    card.flipCardUp();

    if (!this.openCard) {
      this.openCard = card;
      return;
    }

    if (isPair(card, this.openCard)) {
      this.pairIsFound();
    } else {
      this.wrongGuess(card);
    }
  },

  start() {
    this.generateCards();
  },

  restartGame(event) {
    event.target.classList.remove();
    const closingMessage = document.querySelector(".game-end");
    closingMessage.remove();
    this.cards = [];
    this.gameLevel = 12;
    this.openCard = undefined;
    this.numOfUnrevealedPairs = 6;
    this.numOfWrongGuesses = 10;
    this.updateWrongGuessesDisplay();
    this.gamePause = false;
    this.gameOver = false;
    const gameBoard = document.querySelector(".game-board");
    gameBoard.innerHTML = "";
    theGame.start();
  },

  pairIsFound() {
    this.openCard = undefined;
    this.numOfUnrevealedPairs--;
    if (!this.numOfUnrevealedPairs) {
      this.gameEnd();
    }
  },

  gameEnd() {
    const gameEndMessage = document.createElement("div");
    gameEndMessage.innerHTML =
      this.gameOver == true ? "<h2>GAME OVER</h2>" : "<h2>You won!</h2>";
    gameEndMessage.classList.add("game-end");
    const newGameButton = document.createElement("button");
    newGameButton.classList.add("btn", "new-game");
    newGameButton.innerText = "New Game";
    newGameButton.addEventListener("click", (event) => {
      this.restartGame(event);
    });
    gameEndMessage.appendChild(newGameButton);
    const h1 = document.querySelector("h1");

    h1.parentNode.insertBefore(gameEndMessage, h1.nextSibling);
  },

  wrongGuess(card) {
    this.gamePause = true;
    setTimeout(() => {
      this.handelWrongGuess(card);
    }, 1000);
  },

  handelWrongGuess(card) {
    this.gamePause = false;
    card.flipCardDown();
    this.openCard.flipCardDown();
    this.openCard = undefined;
    this.numOfWrongGuesses--;
    this.updateWrongGuessesDisplay();
    console.log(this.numOfWrongGuesses);
    if (!this.numOfWrongGuesses) {
      this.gameOver = true;
      this.gameEnd();
    }
  },
  updateWrongGuessesDisplay() {
    const wrongGuessesDisplay = document.querySelector(".wrong-count");
    wrongGuessesDisplay.innerText = 10 - this.numOfWrongGuesses;
  },
};

const generateRandArrOfPairs = function (length) {
  const randArrOfPairs = [];

  for (let i = 0; i < length; i += 2) {
    insertInRandIndex(randArrOfPairs, length, i / 2 + "a");
    insertInRandIndex(randArrOfPairs, length, i / 2 + "b");
  }
  return randArrOfPairs;
};

const insertInRandIndex = function (arr, length, insert) {
  let randIndex = Math.floor(Math.random() * length);
  while (arr[randIndex] !== undefined) {
    randIndex++;
    randIndex %= length;
  }
  arr[randIndex] = insert;
};

const isPair = function (card1, card2) {
  return card1.uniqueId[0] === card2.uniqueId[0];
};

const cerateCardDiv = function (uniqueId) {
  const cardElement = document.createElement("div");
  cardElement.classList.add(
    "card",
    `card${uniqueId}`,
    `card${uniqueId[0]}`,
    "face-down"
  );
  return cardElement;
};
const createAndAppendAllCards = function (templateArr, parentElement) {
  for (const cardId of templateArr) {
    parentElement.appendChild(cerateCardDiv(cardId));
  }
};

theGame.start();
