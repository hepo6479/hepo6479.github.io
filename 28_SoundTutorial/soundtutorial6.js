
let song;
let volSlider;
let playsong = document.getElementById("play");
let stopsong = document.getElementById("stop");
let jumpsong = document.getElementById("jump");
let pause = true;
let pic;
let amp;
let colmap;
let volhistory = [];

function preload() {
  song = loadSound("JoyMech.mp3");
  volSlider = createSlider(0, 1, 0.1, 0.01);
  pic = loadImage("joymech.gif");

}

function setup() {
  myCanvas = createCanvas(400, 400);
  angleMode(DEGREES);
  myCanvas.parent("canvas");
  amp = new p5.Amplitude();
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
}

function draw() {
  background(0);
  let vol = amp.getLevel();

  translate(width / 2, height / 2);
  volhistory.push(vol);

  // fill(colmap, 0, 255-colmap);
  beginShape();
  for(let i = 0; i < 360; i++){
    let r = map(volhistory[i], 0, 0.05, 20, 200);
    let x = r * cos(i)
    let y = r * sin(i);
    colmap = map(volhistory[i], 0, 0.05, 0, 255);
    stroke(colmap);
    // vertex(i, -y + 2 * height);
    // vertex(x, y);
    line(0, 0, x, y);
  }
  endShape();

  if(volhistory.length > 360) {
    volhistory.splice(0, 1);
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
