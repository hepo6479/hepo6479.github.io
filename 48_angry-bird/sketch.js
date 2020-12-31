const {
  Engine,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Constraint
} = Matter;

let ground;
// let box;
const boxes = [];
let bird;
let world, engine;
let mConstraint;
let sling;

function setup() {
  const myCanvas = createCanvas(500, 300);
  myCanvas.parent('canvas');
  engine = Engine.create();
  world = engine.world;
  // ground = new Box(width / 2, height - 10, width, 20);
  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 5; i++) {
    let box = new Box(400, 200 + (-80 * (i + 1)), 50, 75);
    boxes.push(box);
  }
  bird = new Bird(150, 200, 15);

  sling = new SlingShot(150, 150, bird.body);

  const mouse = Mouse.create(myCanvas.elt);
  mouse.pixelRatio = pixelDensity();
  const options = {
    mouse: mouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function mouseReleased() {
  setTimeout(() => {
    sling.fly();
  }, 50);
}

function keyPressed() {
  if (key == " ") {
    World.remove(world, bird.body);
    bird = new Bird(150, 200, 15);
    sling.attach(bird.body);
  }
}


function draw() {
  background(51);
  Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  bird.show();
  sling.show();
}
