let slider;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 10, 5, 0.1);
}

function sgn(val) {
  if(val > 0){
    return 1;
  } else if(val < 0) {
    return -1;
  } else {
    return 0;
  }
}

function draw() {
  background(51);
  translate(width / 2, height / 2);

  let a = 100;
  let b = 100;
  let n = slider.value();
  stroke(255);
  noFill();

//SuperEllipse
//|x/a|^r + |y/b|^r = 1
//a = r, b = r, r = 2,  >>> Ellipse

beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    // let x = r * cos(a);
    // let y = r * sin(a);

    let na = 2 / n;
    let x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    let y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));


    vertex(x, y);
  }
endShape(CLOSE);
}
