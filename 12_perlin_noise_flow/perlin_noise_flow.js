let inc = 0.1;
let scl = 5;
let cols, rows;

let zoff = 0;

let fr;

let particles = [];

let flowfield;

function setup() {
  myCanvas = createCanvas(400, 400);
  myCanvas.parent('canvas');
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (let i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  background(255);
}

//
// function draw() {
//   let yoff = 0;
//   loadPixels();
//   for (let y = 0; y < height; y++) {
//     let xoff = 0;
//     for (let x = 0; x < width; x++) {
//       let index = (x + y * width) * 4;
//       let r = noise(xoff, yoff) * 255;
//       pixels[index + 0] = r;
//       pixels[index + 1] = r;
//       pixels[index + 2] = r;
//       pixels[index + 3] = 255;
//       xoff += inc;
//     }
//     yoff += inc;
//   }
//   updatePixels();
// }

function draw() {
  // randomSeed(10);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      flowfield[index] = v;
      v.setMag(100);
      xoff += inc;
      // stroke(0, 50);
      // strokeWeight(1);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      //
      // pop();

    }
    yoff += inc;

    zoff += 0.00002;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));

}
