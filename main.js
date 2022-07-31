//Canvas Setting
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backGroundImg, bulletImg, GameOverImg, monsterImg, spaceshipImg;

//Coordinations of SpaceShip
let SpaceShipX = canvas.width / 2 - 32;
let SpaceShipY = canvas.height - 64;

//Load Images
function loadImgs() {
  backGroundImg = new Image();
  backGroundImg.src = "images/SpaceImg.png";

  bulletImg = new Image();
  bulletImg.src = "images/Bullet.png";

  GameOverImg = new Image();
  GameOverImg.src = "images/GameOver.jpeg";

  monsterImg = new Image();
  monsterImg.src = "images/Monster.png";

  spaceshipImg = new Image();
  spaceshipImg.src = "images/SpaceShip.png";
}

//Rendering Imgs
function renderImgs() {
  ctx.drawImage(backGroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImg, SpaceShipX, SpaceShipY);
}

//Rendering Imgs continuously
function main() {
  renderImgs();
  requestAnimationFrame(main)
}


//Calling functions
loadImgs();
main();