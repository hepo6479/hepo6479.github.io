
let rocket;
let population;
let lifespan = 400;
let lifeP;
let count = 0;
let target;
let maxforce = 0.2;

let rx = 100;
let ry = 150;
let rw = 200;
let rh = 10;

function setup() {
  myCanvas = createCanvas(400, 300);
  myCanvas.parent('canvas');

  rocket = new Rocket();
  population = new Population();
  lifeP = createP();

  target = createVector(width / 2, 50);

}

function draw() {
  background(51);
  population.run();
  lifeP.html(count);
  count++;

  if (count == lifespan) {
    population.evaluate();
    population.selection();
    // population = new Population();
    count = 0;
  }

  fill(255);
  rect(rx, ry, rw, rh);

  ellipse(target.x, target.y, 16, 16);
}

function Population() {
  this.rockets = [];
  this.popsize = 25;

  for (let i = 0; i < this.popsize; i++){
    this.rockets[i] = new Rocket();
  }


  this.evaluate = () => {
    let maxfit = 0;
    for (let i = 0; i < this.popsize; i++){
      this.rockets[i].calcFitness();
      if(this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    // console.log(this.rockets);

    for (let i = 0; i < this.popsize; i++){
      this.rockets[i].fitness /= maxfit;
    }


    this.matingPool = [];
    for (let i = 0; i < this.popsize; i++){
      let n = this.rockets[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
  }

  this.selection = () => {
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++){
      let parentA = random(this.matingPool).dna;
      let parentB = random(this.matingPool).dna;
      let child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.run = () => {
    for (let i = 0; i < this.popsize; i++){
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

}

function DNA(genes) {
  if(genes){
    this.genes = genes;
  } else {
    this.genes = [];
    for (let i = 0; i < lifespan; i++){
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxforce);
    }
  }

  this.crossover = (partner) => {
    let newgenes = [];
    let mid = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++){
      if (i > 0) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }
  this.mutation = () => {
    for (let i = 0; i < this.genes.length; i++){
      if (random(1) < 0.01){
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);

      }
    }
  }
}

function Rocket(dna) {
  this.pos = createVector(width / 2, height-5);
  // this.vel = createVector(0, -1);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;

  if(dna){
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = (force) => {
    this.acc.add(force);
  }

  this.update = () => {

    let d = dist(this.pos.x, this.pos.y, target.x, target.y);

    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }

    if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
      this.crashed = true;
    }

    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[count]);

    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }

    this.show = () => {
      push();
      noStroke();
      fill(255, 100);
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      rectMode(CENTER);
      rect(0, 0, 25, 4);
      pop();
    }

    this.calcFitness = () => {
      let d = dist(this.pos.x, this.pos.y, target.x, target.y);
      // this.fitness = 1 / d;
      this.fitness = map(d, 0, width, width, 0);
      if(this.completed){
        this.fitness *= 10;
      }
      if (this.crashed) {
        this.fitness /= 10;
      }
    }
  }
}
