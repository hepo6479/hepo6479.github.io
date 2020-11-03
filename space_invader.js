//space_invader
let ship;
let invaders = [];
let shots = [];
let newInvaders = [];

let elRight = document.getElementById('right');
let elShot = document.getElementById('shot');
let elLeft = document.getElementById('left');

function setup () {
  myCanvas = createCanvas(500, 400);
  myCanvas.parent('canvas');
  ship = new Ship();
  for (let i = 0; i < 5; i++) {
    invaders[i] = new Invader(50 + i * 80, 50);

  }

  // shots = new Shot(ship.x, ship.y);
}

function draw () {
  background(51);

  ship.show();
  ship.move();

  let edge = false;

  for (let i = 0; i < invaders.length; i++) {
    invaders[i].show();
    invaders[i].move();
    if (invaders[i].x + invaders[i].r/2 > width || invaders[i].x - invaders[i].r/2 < 0 ) {
      edge = true;
    }
  }

  if (edge){
    for (let i = 0; i < invaders.length; i++) {
      invaders[i].shiftDown();
    }
    for (let j = 0; j < 5; j++) {
      newInvaders[j] = new Invader(50 + j * 80, 50);
      invaders.push(newInvaders[j]);
    }
  }


  for (let i = 0; i < shots.length; i++) {
    shots[i].show();
    shots[i].move();
    for (let j = 0; j < invaders.length; j++) {
      if (shots[i].hits(invaders[j])){
        invaders[j].grow();
        shots[i].evaporate();
        console.log("HIT!");
        invaders[j].evaporate();
      }
    }
  }

  for (let i = invaders.length-1; i >= 0; i--) {
    if (invaders[i].toDelete) {
      invaders.splice(i, 1);
    }
  }

  for (let i = shots.length-1; i >= 0; i--) {
    if (shots[i].toDelete) {
      shots.splice(i, 1);
    }
  }
}

function keyReleased() {
  if(key !== " ") {
    ship.setDir(0);
  }
}

function keyPressed() {
  if(key === " ") {
    // ship.x += 10;
    let shot = new Shot(ship.x, ship.y);
    shots.push(shot);
  }

  if(keyCode === RIGHT_ARROW) {
    // ship.x += 10;
    ship.setDir(1);
  } else if(keyCode === LEFT_ARROW) {
    // ship.x -= 10;
    ship.setDir(-1);
  }
}

elShot.addEventListener('touchstart', function(event) {
  let shot = new Shot(ship.x, ship.y);
  shots.push(shot);
}, false);


elLeft.addEventListener('touchstart', function(event) {
    ship.setDir(-1);
}, false);

elRight.addEventListener('touchstart', function(event) {
    ship.setDir(1);
}, false);


elLeft.addEventListener('touchend', function(event) {
    ship.setDir(0);
}, false);

elRight.addEventListener('touchend', function(event) {
    ship.setDir(0);
}, false);
