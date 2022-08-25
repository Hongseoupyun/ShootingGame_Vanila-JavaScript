//Canvas Setting
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 650;
document.body.appendChild(canvas);
//global variable
let backGroundImg, bulletImg, GameOverImg, monsterImg, spaceshipImg;
let gameOver = false;
let stage = 1;
let score = 0;
let speed = 1500

//Coordinations of SpaceShip
let SpaceShipX = canvas.width / 2 - 32;
let SpaceShipY = canvas.height - 64;

let bulletArray = [];
let monsterArray = [];

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.alive = true;
  //method
  this.fire = function () {
    this.x = SpaceShipX + 20;
    this.y = SpaceShipY;

    bulletArray.push(this);
  };
  this.update = function () {
    this.y -= 5;
  };
  this.hitMonster = function () {
    for (let i = 0; i < monsterArray.length; i++) {
      if (
        this.y <= monsterArray[i].y &&
        this.x >= monsterArray[i].x &&
        this.x <= monsterArray[i].x + 50
      ) {
        score+=1;
        this.alive = false;
        monsterArray.splice(i, 1);
      }
    }
  };
}
function generateRandomNumver(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Monster() {
  this.x = 0;
  this.y = 0;
  //method
  this.init = function () {
    this.x = generateRandomNumver(0, canvas.width - 50);
    this.y = 0;

    monsterArray.push(this);
  };
  this.update = function () {
    this.y += 0.9;
    //gameover logic
    if (this.y > canvas.height - 50) {
      gameOver = true;
      console.log("GAME OVER");
    }
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

function createMonster() {
  setInterval(() => {
    let m = new Monster();
    m.init();
  }, speed);
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
    if (bulletArray[i].alive) {
      bulletArray[i].update();
      bulletArray[i].hitMonster();
    }
  }
  for (let i = 0; i < monsterArray.length; i++) {
    monsterArray[i].update();
  }
}

//Rendering Imgs
function renderImgs() {
  ctx.drawImage(backGroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImg, SpaceShipX, SpaceShipY);
  ctx.fillText(`Score:${score}`, 20, 20);
  ctx.fillText(`Stage:${stage}`, 20, 50);
  ctx.fillStyle = "white";
  ctx.font = "20px Airal";

  for (let i = 0; i < bulletArray.length; i++) {
    if (bulletArray[i].alive) {
      ctx.drawImage(bulletImg, bulletArray[i].x, bulletArray[i].y);
    }
  }
  for (let i = 0; i < monsterArray.length; i++) {
    ctx.drawImage(monsterImg, monsterArray[i].x, monsterArray[i].y);
  }
}

//Rendering Imgs continuously
function main() {
  if (!gameOver) {
    updateCoordination();
    renderImgs();
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(GameOverImg, 10, 100, 380, 300);
  }
}

//Calling functions
createMonster();
loadImgs();
main();
setupKeyboardListener();

// bullet logic
// 1.if you press spacebar, bullet will generate
// 2.the coordinations of bullet is gonna be coordinations of spaceship when spacebar is pressed
// 3.if the bullets is generated , the y coordination will keep decreasing and x coordination will remain same
// 4.the bullets data will store in an array
// 5.render bullets with the array

//Monster Logic
//1.Monster has init, update and stageUp method
//2.Monster comes down=> y coordination keep increasing
//3.One monster will generate every 1.5s =>use setInterval()
//4.When monster touches the ground, game is over => when monster y coordination is greater than canvas.height-monseter size game over

//score Logic
//1.when bullet hits monster, score ++=> bullet.y < monster.y && monster.x <= bullet.x  && bullet.x <= monster.size+monster.x
