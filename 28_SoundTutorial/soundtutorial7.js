
let song;
let volSlider;
let playsong = document.getElementById("play");
let stopsong = document.getElementById("stop");
let jumpsong = document.getElementById("jump");
let pause = true;
let pic;
let fft;
let colmap;
let volhistory = [];
let w;

function preload() {
  song = loadSound("JoyMech.mp3");
  volSlider = createSlider(0, 1, 0.1, 0.01);
  pic = loadImage("joymech.gif");

}

function setup() {
  myCanvas = createCanvas(256, 256);
  angleMode(DEGREES);
  colorMode(HSB);
  myCanvas.parent("canvas");
  fft = new p5.FFT(0, 64);
  // song.play();
  playsong.addEventListener("click", ()=> {
    playPause();
  });
  stopsong.addEventListener("click", ()=> {
    stop();
  });
  jumpsong.addEventListener("click", ()=> {
    jumpSong();
  });
  song.play();
  pause = false;
  playsong.textContent = "pause";
  w = width / 64;
  // frameRate(30);
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  // stroke(255);
  for (let i = 0; i < spectrum.length; i++) {
      let amp = spectrum[i];
      let y = map(amp, 0, 255, height, 0);
      fill(y, 255, 255);
      rect(i * w, y, w - 1, height - y);
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

function jumpSong() {
  let len = song.duration();
  if (song.currentTime() + 10 < len) {
    song.jump(song.currentTime() + 10);

  }
}
