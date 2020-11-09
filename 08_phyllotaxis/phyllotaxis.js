//myscript.js
let slider;
let n = 0;
let c = slider;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB);
  background(0);
  slider = createSlider(1, 10, 5, 1);
}

function draw() {
  if(n < 1500){
    c = slider.value();
    let a = n * 137.5;
    let r = c * sqrt(n);

    let x = r * cos(a) + width/2;
    let y = r * sin(a) + height/2;

    fill((a-r)%255, 255, 255);
    noStroke();
    ellipse(x, y, 5, 5);

    n++;
  }
}
