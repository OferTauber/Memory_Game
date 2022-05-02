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

  generateCards() {
    const tampleteArr = genetareRandArrOfPaers(12);

    /* //!!!v----v---v----v----v!! */
    let i = 1; //! remove!!
    let a = true; //!remove!!
    /* //!!!^-----^------^-----^----^!!!! */

    for (const id of tampleteArr) {
      this.cards.unshift(new Card(id, this));

      /* //!!!v----v---v----v----v!! */
      this.cards[0].element = document.querySelector(
        `.card${i + ''}${a ? 'a' : 'b'}`
      );

      a = !a;
      if (a) i++;
      console.log(this.cards[0].element);
      this.cards[0].element.addEventListener('click', (e) => {
        console.dir(e);
        this.handelCardClick(e.target);
      });

      /* //!!!^-----^------^-----^----^!!!! */
      this.boardElement.appendChild(this.cards[0].element);

      this.cards[0].element.classList.add('face-down');
    }
  },

  handelCardClick(card) {
    if (this.gameOver || this.gamePause || card.faceUp) return;

    card.flipCard();
    if (!this.openCard) {
      this.openCard = card;
      return;
    }

    if (isPair(card, this.openCard)) {
      pairIsFound();
    } else {
      this.wrongGuess(card);
    }
  },

  start() {
    this.generateCards();
  },

  pairIsFound() {
    this.openCard = undefined;
    this.numOfUnrevealedPairs--;
    if (this.numOfUnrevealedPairs) {
      this.winGame();
    }
  },

  gameEnd() {
    console.log('Game Over!!!!'); //TODO -----------------------------
  },
  wrongGuess(card) {
    this.gamePause = true;
    setTimeout((this.gamePause = false), 1000);
    card.flipCard();
    this.openCard.flipCard();
    this.openCard = undefined;
    this.numOfWrongGuesses--;
    if (!this.numOfWrongGuesses) {
      this.gameEnd();
    }
  },

  winGame() {
    console.log('win game!!!!'); //TODO -----------------------------
  },
};

const genetareRandArrOfPaers = function (length) {
  const randArrOfPaers = [];
  for (let i = 0; i < length; i += 2) {
    insertInRandIndex(randArrOfPaers, length, i / 2);
    insertInRandIndex(randArrOfPaers, length, i / 2);
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

theGame.start();
