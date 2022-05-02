import { Card } from './card.js';

const theGame = {
  cards: [],
  boardElement: document.querySelector('.game-board'),
  gameLevel: 12, //! for "geek out" we can change this
  openCard: undefined, // or card from cards array
  numOfUnrevealedPairs: 6,
  numOfWrongGuesses: 10,
  gamePause: false,
  generateCards() {
    const tampleteArr = genetareRandArrOfPaers(12);

    for (const id of tampleteArr) {
      this.cards.push(new Card(id, this));
    }
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

theGame.generateCards();
console.log(theGame.cards);
