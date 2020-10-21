//  f(z) = z^2 + c   c : a + bi
//  z0 = 0 => z1 = z^2 + c = c
//  z2 = c^2 + c
//  c^2 = a^2 + 2abi - b^2

let minval = -0.5;
let maxval = 0.5;

let minSlider;
let maxSlider;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);

  minSlider = createSlider(-1.5, 0, -1.5, 0.01);
  maxSlider = createSlider(0, 1.5, 1.5, 0.01);
}

function draw() {
  let maxiterations = 50;

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y <height; y++) {

      let a = map(x, 0, width, minSlider.value(), maxSlider.value());
      let b = map(y, 0, height, minSlider.value(), maxSlider.value());

      let ca = a;
      let cb = b;

      let n = 0;

      while (n < maxiterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (abs(a + b) > 16) {
          break;
        }

        n++;
      }


      let bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);
      // let bright = map(n, 0, maxiterations, 0, 255);
      // if (n === 100) {
      //   bright = 255;
      // }

      if (n === maxiterations){
        bright = 0;
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}

// function draw() {
//   background(51);
//
// }
