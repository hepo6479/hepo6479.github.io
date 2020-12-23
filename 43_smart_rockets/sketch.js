
let rocket;
let population;
let lifespan = 300;
let lifeP;
let count = 0;
let target;

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

  ellipse(target.x, target.y, 16, 16);
}

function Population() {
  this.rockets = [];
  this.popsize = 50;

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
      this.genes[i].setMag(0.1);
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
}

function Rocket(dna) {
  this.pos = createVector(width / 2, height);
  // this.vel = createVector(0, -1);
  this.vel = createVector();
  this.acc = createVector();
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
    this.applyForce(this.dna.genes[count]);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
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
  }
}
