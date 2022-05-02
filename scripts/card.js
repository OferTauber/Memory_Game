export function Card(uniqueId, game) {
  this.uniqueId = uniqueId;
  this.game = game;
  this.cardElement = document.querySelector(`.card` + uniqueId);
  this.faceUp = false;
}

Card.prototype.click = function () {
  this.game.handleClick(this);
};

Card.prototype.flipCardUp = function () {
  if (!this.faceUp) this.faceUp = true;
  cardElement.classList.remove('face-down');
};

Card.prototype.flipCardDown = function () {
  if (this.faceUp) this.faceUp = false;
  cardElement.classList.add('face-down');
};
