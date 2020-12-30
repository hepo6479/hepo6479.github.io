let font;
let vehicles = [];

function preload() {
  font = loadFont("RictyDiminishedDiscord-Regular.ttf");
}


function setup() {
  myCanvas = createCanvas(500, 250);
  myCanvas.parent('canvas');
  background(51);

  // textFont(font);
  // textSize(180);
  // fill(255);
  // noStroke();
  // text("train", 20, 170);

  let dots = font.textToPoints("HELLO", 20, 170, 180);

  for (let i = 0; i < dots.length; i++) {
    let pt = dots[i];
    let vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(51);
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
