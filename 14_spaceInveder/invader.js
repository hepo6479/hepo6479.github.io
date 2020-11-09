function Invader(x, y) {
  this.x = x;
  this.y = y;
  this.r = 60;

  this.xdir = 1;
  this.ydir = 0;

  this.toDelete = false;

  this.evaporate = () => {
    if (this.r < 50) {
      this.toDelete = true;
    }
  }

  this.show = () => {
    fill(255);
    ellipse(this.x, this.y, this.r);
  }

  this.move = () => {
    this.x += 0.5 * this.xdir;

  }

  this.grow = () => {
    this.r -= 10;
  }

  this.shiftDown = () => {
    this.xdir *= -1;
    this.y += this.r;
  }
}
