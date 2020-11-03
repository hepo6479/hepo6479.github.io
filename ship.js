function Ship() {
  this.x = width/2;
  this.y = height;
  this.width = 20;
  this.height = 40;
  this.xdir = 0;


  this.show = () => {
    fill(255);
    rect(this.x - this.width/2, this.y - this.height, this.width, this.height);
  }

  this.setDir = (dir) => {
    this.xdir = dir;
  }

  this.move = (dir) => {
     this.x += this.xdir * 5;
  }

  this.update = () => {

  }
}
