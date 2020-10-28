//
let rows, cols;
let w = 40;
let grid = [];

let current;

function setup() {
  createCanvas(400, 400);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(5);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function index (i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows - 1) {
    return -1;
  }

  return i + j * cols;
}

function draw() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    current = next;
  }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    let neighbors = [];

    let top    = grid[index(i    , j - 1)]
    let right  = grid[index(i + 1, j    )]
    let bottom = grid[index(i    , j + 1)]
    let left   = grid[index(i - 1, j    )]

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }

    }

  this.show = function () {
    let x = this.i * w;
    let y = this.j * w;

    stroke(255);
    if (this.walls[0]) {
        line(x    , y    , x + w, y);
    }
    if (this.walls[1]) {
        line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
        line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
        line(x    , y + w, x    , y);
    }


    if (this.visited) {
        fill(100, 20, 255);
        rect(x, y, w, w);

    }

  }
}