//myscript2.js
let x;
let y;

let xspeed;
let yspeed;

let smile;
let bad;
let logo;
let logowidth;
let logoheight;

function preload() {
  smile = loadImage("smile.jpg");
  bad = loadImage("bad.jpg");
}

function setup() {
  createCanvas(600, 400);
  x = random(width);
  y = random(height);
  xspeed = 2;
  yspeed = 2;
  logowidth = 144;
  logoheight = 124;
  logo = smile;
}

function draw() {
  background(0);
  image(logo, x, y, logowidth, logoheight);

  x += xspeed;
  y += yspeed;

  if(x + logowidth >= width) {
    xspeed *= -1;
    x = width - logowidth;
    logo = bad;
    setTimeout("logo = smile", 750);
  } else if(x <= 0){
    xspeed *= -1;
    x = 0;
    logo = bad;
    setTimeout("logo = smile", 750);
  }

  if(y + logoheight >= height) {
    yspeed *= -1;
    y = height - logoheight;
    logo = bad;
    setTimeout("logo = smile", 750);
  } else if(y <= 0){
    yspeed *= -1;
    y = 0;
    logo = bad;
    setTimeout("logo = smile", 750);
  }

}
