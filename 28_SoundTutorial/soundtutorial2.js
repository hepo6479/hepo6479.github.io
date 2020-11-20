
let song;
let volSlider;
let playsong = document.getElementById("play");
let stopsong = document.getElementById("stop");
let pause = true;
let pic;

function preload() {
  song = loadSound("JoyMech.mp3");
  volSlider = createSlider(0, 1, 0.1, 0.01);
  pic = loadImage("joymech.gif");

}

function setup() {
  myCanvas = createCanvas(200, 200);
  myCanvas.parent("canvas");
  // song.play();
  playsong.addEventListener("click", ()=> {
    playPause();
  });
  stopsong.addEventListener("click", ()=> {
    stop();
  });
}

function draw() {
  background(51);
  if(!pause) {
    image(pic, 0, 0, 200, 200);
  }
  
  song.setVolume(volSlider.value());
}

function playPause() {
  if(pause){
    song.play();
    pause = false;
    playsong.textContent = "pause";
  } else {
    song.pause();
    pause = true;
    playsong.textContent = "play";
  }
}

function stop() {
  song.stop();
  playsong.textContent = "play";
  pause = true;
}
