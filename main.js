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

let bulletArray = [];

function Bullet() {
  this.x = 0;
  this.y = 0;
  //method
  this.fire = function () {
    this.x = SpaceShipX + 20;
    this.y = SpaceShipY;

    bulletArray.push(this);
  };
  this.update = function () {
    this.y -= 5;
  };
}

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
    if (event.key === " ") {
      createBullet();
    }
  });
}

function createBullet() {
  console.log("bullet making");
  let b = new Bullet();
  b.fire();
}

function updateCoordination() {
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

  if (SpaceShipX <= 0) {
    SpaceShipX = 0;
  }
  if (SpaceShipX >= canvas.width - 64) {
    SpaceShipX = canvas.width - 64;
  }
  if (SpaceShipY >= canvas.height - 64) {
    SpaceShipY = canvas.height - 64;
  }
  if (SpaceShipY <= 0) {
    SpaceShipY = 0;
  }
  for (let i = 0; i < bulletArray.length; i++) {
    bulletArray[i].update();
  }
}
// bullet logic
// 1.if you press spacebar, bullet will generate
// 2.the coordinations of bullet is gonna be coordinations of spaceship when spacebar is pressed
// 3.if the bullets is generated , the y coordination will keep decreasing and x coordination will remain same
// 4.the bullets data will store in an array
// 5.render bullets with the array

//Rendering Imgs
function renderImgs() {
  ctx.drawImage(backGroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImg, SpaceShipX, SpaceShipY);

  for (let i = 0; i < bulletArray.length; i++) {
    ctx.drawImage(bulletImg, bulletArray[i].x, bulletArray[i].y);
  }
}

//Rendering Imgs continuously
function main() {
  updateCoordination();
  renderImgs();
  requestAnimationFrame(main);
}

//Calling functions
loadImgs();
main();
setupKeyboardListener();
