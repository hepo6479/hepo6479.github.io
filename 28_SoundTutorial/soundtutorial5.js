
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
  colmap = map(vol, 0, 0.05, 0, 255);

  volhistory.push(vol);
  stroke(colmap, colmap, colmap);
  // let currentY = map(vol, 0, 1/10, height, 0);

  translate(0, - height / 2);
  noFill();
  beginShape();
  for(let i = 0; i < volhistory.length; i++){
    let y = map(volhistory[i], 0, 1/5, height, 0);
    vertex(i, y, colmap);
    vertex(i, -y + 2 * height);
  }
  endShape();

  if(volhistory.length > width - 20) {
    volhistory.splice(0, 1);
  }


  stroke(255, 0, 0);
  line(volhistory.length, 0, volhistory.length, height * 2);

  // fill(colmap, 0, 255-colmap);
  // ellipse(width/2, height/2, vol * 3000);
  // noStroke();

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
