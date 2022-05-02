export function Card(uniqueId, game) {
  this.uniqueId = uniqueId;
  this.game = game;
  this.cardElement = document.querySelector(`.card`+uniqueId);
  this.faceUp=false;
  // this.cardElement.addEventListener("click", this);
 
}

// game
// pairNum (int)
// faceUp – (bool)
// cardElement
// isMached (bool)

// }

Card.prototype.click =function(){
this.game.handleClick(this);
}




const flipCard=()=>{

}

