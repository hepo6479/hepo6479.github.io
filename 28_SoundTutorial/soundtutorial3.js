//
// const list = [
//   "sword-slash1.mp3"
//   "sword-slash2.mp3"
//   "sword-slash3.mp3"
// ];
let volSlider;
let playsong1 = document.getElementById("play1");
let playsong2 = document.getElementById("play2");
let playsong3 = document.getElementById("play3");
let stopsong = document.getElementById("stop");
let pause = true;
let ss1;
let ss2;
let ss3;

function preload() {
  // for (let i = 0; i < list.length; i++) {
  ss1 = loadSound("sword-slash1.mp3");
  ss2 = loadSound("sword-slash2.mp3");
  ss3 = loadSound("sword-slash3.mp3");

  // }
  volSlider = createSlider(0, 1, 0.1, 0.01);

}

function setup() {
  myCanvas = createCanvas(200, 200);
  myCanvas.parent("canvas");
  // song.play();
  playsong1.addEventListener("click", ()=> {
    playPause1();
  });
  playsong2.addEventListener("click", ()=> {
    playPause2();
  });
  playsong3.addEventListener("click", ()=> {
    playPause3();
  });
  stopsong.addEventListener("click", ()=> {
    stop();
  });
}

function draw() {
  background(51);
  // if(!pause) {
  //   image(pic, 0, 0, 200, 200);
  // }

  // song.setVolume(volSlider.value());
}

function playPause1() {
  ss1.play();
}

function playPause2() {
  ss2.play();
}

function playPause3() {
  ss3.play();
}


function stop() {
  ss1.stop();
  ss2.stop();
  ss3.stop();
  playsong.textContent = "play";
  pause = true;
}
