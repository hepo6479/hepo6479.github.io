let myCanvas = document.getElementById("myCanvas");
let c = document.createElement("canvas");
let ctx = c.getContext("2d");
c.width = 500;
c.height = 150;
let t = 0;

let player = new Player();

function Player() {
  this.x = c.width / 2;
  this.y = 0;
  this.vy = 0;
  this.rot = 0;
  this.size = 30;

  this.img = new Image();
  this.img.src = "moto.png";
  this.draw = function() {
    ctx.save();
    let p1 = c.height - noise(t + this.x) * 0.25;
    if (p1 > this.y + this.size) {
      this.vy += 0.1;
    } else if (((c.height - noise(t + this.x + 5) * 0.25) - p1) < 0) {
      this.y = p1 - this.size;
      this.vy = 1.01 * ((c.height - noise(t + this.x + 5) * 0.25) - p1);
    } else {
      this.y = p1 - this.size;
      this.vy = 0;
    }
    this.y += this.vy;

    ctx.drawImage(this.img, this.x - this.size / 2, this.y, this.size, this.size);

    ctx.restore();
  }

}

myCanvas.appendChild(c);

let prm = [];

for (let i = 0; i < 255; i++) {
  prm[i] = Math.floor(Math.random() * 255);
}

// console.log(prm);

let lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2 ;
let noise = (x) =>{
  x = (x * 0.01) % 255;
  return lerp(prm[Math.floor(x)], prm[Math.ceil(x)], x - Math.floor(x));
}

function loop() {

  t += 5;

  ctx.fillStyle="#19f";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle="#000";

  ctx.beginPath();
  ctx.moveTo(0, c.height);

  for (let i = 0; i < c.width; i++) {
    ctx.lineTo(i, c.height - noise(t + i) * 0.25);
  }

  ctx.lineTo(c.width, c.height);

  ctx.fill();

  player.draw();

  requestAnimationFrame(loop);

}

loop();
