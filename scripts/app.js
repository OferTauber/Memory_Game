import { Card } from './card.js';

const theGame = {
  cards: [],
  boardElement: document.querySelector('.game-board'),
  gameLevel: 12, //! for "geek out" we can change this
  openCard: undefined, // or card from cards array
  numOfUnrevealedPairs: 6,
  numOfWrongGuesses: 10,
  gamePause: false,
  generateCards(numOfCardds) {
    //TODO
  },
  newGame(gameLevel) {
    this.oneCardIsOpen = false;
    this.numOfCards;
  },
};
