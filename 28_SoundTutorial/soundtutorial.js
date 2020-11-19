
let song;

function preload() {
  song = loadSound("JoyMech.mp3");
}

function setup() {
  createCanvas(200, 200);
  song.play();
  song.setVolume(0.5);
}

function draw() {
  background(51);
}
