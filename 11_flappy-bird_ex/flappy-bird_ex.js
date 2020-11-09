
let bird;
let pipes = [];
let hitarea = document.getElementById('hitArea');

let smile;
let sh;

function preload() {
  sh = loadImage("https://github.com/hepo6479/hepo6479.github.io/blob/master/11_flappy-bird_ex/sh.jpg?raw=true");
  smile = loadImage("https://github.com/hepo6479/hepo6479.github.io/blob/master/11_flappy-bird_ex/smile.jpg?raw=true");
}


function setup() {
  myCanvas = createCanvas(400, 400);
  myCanvas.parent('canvas');
  bird = new Bird();
  pipes.push(new Pipe());

}


function draw() {
  background(51);

  for (let i = pipes.length-1; i >= 0;i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }


  bird.update();
  bird.show();
  // console.log(pipes.length)

  if (frameCount % 100 === 0) {
    pipes.push(new Pipe());
  }


}


function keyPressed()   {
  if (key === " ") {
    // console.log("space");
    bird.up();
  }
}

hitArea.addEventListener('mousedown', function(event) {
  bird.up();
});

hitArea.addEventListener('touchstart', function(event) {
  bird.up();
});
