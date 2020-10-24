let s;
let scl = 20;
let food;
var el_hitarea = document.getElementById('hitarea');
var el_right = document.getElementById('right');
var el_left = document.getElementById('left');
var el_down = document.getElementById('down');
// var el_eventname = document.getElementById('eventname');

function setup() {
  myCanvas = createCanvas(400, 400);
  myCanvas.parent('canvas');
  s = new Snake();
  pickLocation();
}

function pickLocation() {
  let cols = floor(width/scl);
  let rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(51);
  s.update();
  s.show();

  if (s.eat(food)) {
    pickLocation();
  }

  fill(255, 0, 100)
  rect(food.x, food.y, scl, scl);
  frameRate(10);
}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    s.dir(0,-1);
  } else if(keyCode === DOWN_ARROW) {
    s.dir(0,1);
  } else if(keyCode === RIGHT_ARROW) {
    s.dir(1,0);
  } else if(keyCode === LEFT_ARROW) {
    s.dir(-1,0);
  }
  //
  // function keyPressed() {
  //   background('yellow');
  //   text(`${key} ${keyCode}`, 10, 40);
  //   print(key, ' ', keyCode);
  //   return false; // prevent default
  // }
}

// var updateEventname = function(eventname) {
//   el_eventname.innerHTML = eventname;
// };
// イベント設定

el_hitarea.addEventListener('mousedown', function(event) {
  // updateEventname('UP');
  // updateXY(event);
  el_hitarea.style.backgroundColor = 'red';
  s.dir(0,-1);
}, false);

el_hitarea.addEventListener('mousemove', function(event) {
  event.preventDefault(); // タッチによる画面スクロールを止める
  // updateEventname('');
  // updateXY(event);
}, false);

el_hitarea.addEventListener('mouseup', function(event) {
  // updateEventname('');
  // updateXY(event);
  el_hitarea.style.backgroundColor = 'blue';
}, false);


// イベント設定 RIGHT

el_right.addEventListener('mousedown', function(event) {
  // updateEventname('Right');
  // updateXY(event);
  el_right.style.backgroundColor = 'red';
  s.dir(1,0);
}, false);

el_right.addEventListener('mousemove', function(event) {
  event.preventDefault(); // タッチによる画面スクロールを止める
  // updateEventname('');
  // updateXY(event);
}, false);

el_right.addEventListener('mouseup', function(event) {
  // updateEventname('');
  // updateXY(event);
  el_right.style.backgroundColor = 'blue';
}, false);

// イベント設定 LEFT

el_left.addEventListener('mousedown', function(event) {
  // updateEventname('Left');
  // updateXY(event);
  el_left.style.backgroundColor = 'red';
  s.dir(-1,0);
}, false);

el_left.addEventListener('mousemove', function(event) {
  event.preventDefault(); // タッチによる画面スクロールを止める
  // updateEventname('');
  // updateXY(event);
}, false);

el_left.addEventListener('mouseup', function(event) {
  // updateEventname('');
  // updateXY(event);
  el_left.style.backgroundColor = 'blue';
}, false);

// イベント設定 DOWN

el_down.addEventListener('mousedown', function(event) {
  // updateEventname('Down');
  // updateXY(event);
  el_down.style.backgroundColor = 'red';
  s.dir(0,1);
}, false);

el_down.addEventListener('mousemove', function(event) {
  event.preventDefault(); // タッチによる画面スクロールを止める
  // updateEventname('');
  // updateXY(event);
}, false);

el_down.addEventListener('mouseup', function(event) {
  // updateEventname('');
  // updateXY(event);
  el_down.style.backgroundColor = 'blue';
}, false);
