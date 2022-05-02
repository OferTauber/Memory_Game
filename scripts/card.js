export function Card(uniqueId, game) {
  this.uniqueId = uniqueId;
  this.game = game;
  this.cardElement = document.querySelector(`.card` + uniqueId);
  this.faceUp = false;
}

Card.prototype.click = function () {
  this.game.handleClick(this);
};

const flipCard = () => {};
