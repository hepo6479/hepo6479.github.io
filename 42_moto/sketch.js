
let myCanvas = document.getElementById("myCanvas");
let c = document.createElement("canvas");
let ctx = c.getContext("2d");
c.width = 500;
c.height = 300;
let t = 0;
let speed = 0;
let k = {ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0};
let playing = true;

let player = new Player();

function Player() {
  this.size = 30;
  this.x = c.width / 2 - this.size / 2;
  this.y = 0;
  this.vy = 0;
  this.rot = 0;
  this.vr = 0;


  this.img = new Image();
  this.img.src = "moto.png";

  this.draw = function() {
    let p1 = c.height - noise(t + this.x) * 0.25;
    let p2 = c.height - noise(t + 5 + this.x) * 0.25;
    let grounded = 0;

    if (p1 > this.y + this.size) {
      this.vy += 0.1;
      let grounded = 0;
    } else if ((p2 - p1) < 0) {
      this.y = p1 - this.size;
      this.vy = (p2 - p1) * 1.001;
      // this.rot = Math.atan2((p2 - p1), 5);
      grounded = 1;
      // this.rot = 0;
    } else {
      this.y = p1 - this.size;
      this.vy = 0;
      // this.rot = 0;
      grounded = 1;
    }

    // this.rot = Math.atan2((p2 - p1), 5);

    let angle = Math.atan2(((p2 - this.size) - this.y), 5);

    if(!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5) {
      playing = false;
      this.vr = 5;
      // k.ArrowUp = 1;
      this.x -= 5 + speed;
      ctx.font = "40px 'Courier New'";
      ctx.fillStyle = "tomato";
      ctx.fillText("GAME OVER", c.width / 2 - 100, c.height / 2 + 10);
    }

    if(grounded && playing) {
      this.rot -= (this.rot - angle) * 0.5;
      this.vr -= (angle - this.rot);
    }

    this.vr += (k.ArrowLeft - k.ArrowRight) * 0.05;
    this.rot -= this.vr * 0.1;

    if(this.rot > Math.PI) this.rot = -Math.PI;
    if(this.rot < -Math.PI) this.rot = Math.PI;

    this.y += this.vy;


    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    // ctx.drawImage(this.img, this.x - this.size / 2, this.y, this.size, this.size);
    ctx.drawImage(this.img, 0, 0, this.size, this.size);

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
  speed += (k.ArrowUp - k.ArrowDown) * 0.1;
  t += 5 + speed;

  // console.log(k.ArrowUp, k.ArrowDown, k.ArrowLeft, k.ArrowRight);

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

window.addEventListener("keydown",keydown);
window.addEventListener("keyup",keyup);

function keydown(event){
  if(event.keyCode==38){k.ArrowUp=1;}
  if(event.keyCode==40){k.ArrowDown=1;}
  if(event.keyCode==39){k.ArrowRight=1;}
  if(event.keyCode==37){k.ArrowLeft=1;}
}

function keyup(event){
  if(event.keyCode==38){k.ArrowUp=0;}
  if(event.keyCode==40){k.ArrowDown=0;}
  if(event.keyCode==39){k.ArrowRight=0;}
  if(event.keyCode==37){k.ArrowLeft=0;}
}

loop();
