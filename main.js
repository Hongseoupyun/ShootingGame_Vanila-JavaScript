//Canvas Setting
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 650;
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
//Keyboard controlls
let keysdown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", (event) => {
    keysdown[event.key] = true;
    console.log("keypressed:", event.key);
    console.log(keysdown);
  });
  document.addEventListener("keyup", (event) => {
    delete keysdown[event.key];
    console.log(keysdown);
  });
}

function updateSpaceshipCoordination() {
  if (keysdown.ArrowRight) {
    SpaceShipX += 5;
  }
  if (keysdown.ArrowLeft) {
    SpaceShipX -= 5;
  }
  if (keysdown.ArrowUp) {
    SpaceShipY -= 3;
  }
  if (keysdown.ArrowDown) SpaceShipY += 3;
}

//Rendering Imgs
function renderImgs() {
  ctx.drawImage(backGroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImg, SpaceShipX, SpaceShipY);
}

//Rendering Imgs continuously
function main() {
  updateSpaceshipCoordination();
  renderImgs();
  requestAnimationFrame(main);
}

//Calling functions
loadImgs();
main();
setupKeyboardListener();
