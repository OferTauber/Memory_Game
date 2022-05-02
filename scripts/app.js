import { Card } from './card.js';

const theGame = {
  cards: [],
  boardElement: document.querySelector('.game-board'),
  gameLevel: 12, //! for "geek out" we can change this
  openCard: undefined, // or card from cards array
  numOfUnrevealedPairs: 6,
  numOfWrongGuesses: 10,
  gamePause: false,
  gameOver: false,
  time: {
    sec: 0,
    min: 0,
  },

  generateCards() {
    const tampleteArr = genetareRandArrOfPaers(12);

    createAndAppendAllCards(tampleteArr, this.boardElement);

    for (const id of tampleteArr) {
      this.cards.unshift(new Card(id, this));
      console.log(this.cards[0]);
      const closure = this.cards[0];
      closure.cardElement.addEventListener('click', (e) => {
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
    setInterval(updateTime, 1000);
  },

  updateTime() {
    if (this.gameOver) return;
    this.time.sec++;
    if (this.time.sec === 60) {
      this.time.sec = 0;
      this.time.min++;
    }
    const timeStr = `${(this.time.min < 10 ? '0' : '') + this.time.min}:${
      (this.time.sec < 10 ? '0' : '') + this.time.sec
    }`;
    document.querySelector('.timer').textContent = timeStr;
  },

  pairIsFound() {
    this.openCard = undefined;
    this.numOfUnrevealedPairs--;
    if (!this.numOfUnrevealedPairs) {
      this.winGame();
    }
  },

  gameEnd() {
    console.log('Game Over!!!!'); //TODO -----------------------------
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
    console.log(this.numOfWrongGuesses);
    if (!this.numOfWrongGuesses) {
      this.gameEnd();
    }
  },

  winGame() {
    alert('win game!!!!'); //TODO -----------------------------
  },
};

const genetareRandArrOfPaers = function (length) {
  const randArrOfPaers = [];

  for (let i = 0; i < length; i += 2) {
    insertInRandIndex(randArrOfPaers, length, i / 2 + 'a');
    insertInRandIndex(randArrOfPaers, length, i / 2 + 'b');
  }
  return randArrOfPaers;
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
  const cardElement = document.createElement('div');
  cardElement.classList.add(
    'card',
    `card${uniqueId}`,
    `card${uniqueId[0]}`,
    'face-down'
  );
  return cardElement;
};
const createAndAppendAllCards = function (templateArr, parentElement) {
  for (const cardId of templateArr) {
    parentElement.appendChild(cerateCardDiv(cardId));
  }
};

const updateTime = function () {
  theGame.updateTime();
};

theGame.start();
