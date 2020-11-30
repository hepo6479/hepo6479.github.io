"use strict";

(() => {

  function rand(min, max){
    return Math.random() * (max - min) + min;
  }


  class Ball {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.x = rand(30, 250);
      this.y = 30;
      this.r = 10;
      this.vx = rand(2, 3) * (Math.random() <0.5 ? 1 : -1);
      this.vy = rand(2, 3) * (Math.random() <0.5 ? 1 : -1);
      this.isMissed = false;
    }

    getMissed() {
      return this.isMissed;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if(this.y - this.r > this.canvas.height) {
        this.isMissed = true;
      }

      if(
        this.x + this.r > this.canvas.width ||
        this.x - this.r < 0
      ){
        this.vx *= -1;
      }
      if(
        // this.y + this.r > this.canvas.height ||
        this.y - this.r < 0
      ){
        this.vy *= -1;
      }
    }


    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "#fdfdfd";
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.ctx.fill();

    }


    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    getR() {
      return this.r;
    }

    bounce() {
      this.vy *= -1.1;
      this.vx *= 1.1;
    }

    reposition(paddleTop) {
      this.y = paddleTop - this.r;

    }

  }

  class Paddle {
    constructor(canvas, game) {
      this.canvas = canvas;
      this.game = game;
      this.ctx = this.canvas.getContext("2d");


      this.w = 60;
      this.h = 16;
      this.x = this.canvas.width / 2 - this.w / 2;
      this.y = this.canvas.height -32;
      this.mouseX = this.x;
      this.addHandler();
    }

    addHandler() {
      document.addEventListener("mousemove", e => {
        this.mouseX = e.clientX;
      });
      document.addEventListener("touchmove", e => {
        e.preventDefault();
        this.mouseX = e.changedTouches[0].pageX;
      });
    }


    update(ball) {

      const ballBottom = ball.getY() + ball.getR();
      const ballTop = ball.getY() - ball.getR();
      const ballCenter = ball.getX();
      const paddleTop = this.y;
      const paddleBottom = this.y + this.h;
      const paddleLeft = this.x;
      const paddleRight = this.x + this.w;

      if (
        ballBottom > paddleTop &&
        ballTop < paddleBottom &&
        ballCenter > paddleLeft &&
        ballCenter < paddleRight

      ) {
        ball.bounce();
        ball.reposition(paddleTop);
        this.game.addScore();
      }


      const rect = this.canvas.getBoundingClientRect();
      this.x = this.mouseX - rect.left - this.w / 2;

      if (this.x < 0) {
        this.x = 0;
      }

      if (this.x > this.canvas.width - this.w) {
        this.x = this.canvas.width - this.w;
      }
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "#fdfdfd";
      this.ctx.rect(this.x, this.y, this.w, this.h);
      this.ctx.fill();
    }


  }


  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.ball = new Ball(this.canvas);
      this.paddle = new Paddle(this.canvas, this);
      this.loop();
      this.isGameover = false;
      this.score = 0;
    }

    addScore() {
      this.score++;
    }

    update() {
      this.ball.update();
      this.paddle.update(this.ball);

      if(this.ball.getMissed()){
        this.isGameover = true;
      }

    }

    draw () {
      if(this.isGameover) {
        this.drawGameover();
        return;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // console.log(new Date());
      this.ball.draw();
      this.paddle.draw();
      this.drawScore();

    }


    loop (){
      if(this.isGameover) {
        return;
      }

      this.update();
      this.draw();

      requestAnimationFrame(() => {
        this.loop();
      });
    }

    drawGameover() {
      this.ctx.font = "28px 'Courier New'";
      this.ctx.fillStyle = "tomato";
      this.ctx.fillText("GAME OVER", 60, 150);

    }


    drawScore() {
      this.ctx.font = "20px 'Courier New'";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(this.score, 10, 25);
    }
  }


  const canvas = document.querySelector("canvas");
  if (typeof canvas.getContext === "undefined") {
    return;
  }

  let game = new Game(canvas);
  canvas.addEventListener("click", () => {
    if (game.isGameover) {
      game = new Game(canvas);
    } else {
      return;
    }
  });

})();
