function Shot(x, y) {
  this.size = 10
  this.x = x - this.size/2;
  this.y = y - this.size/2;
  this.toDelete = false;


  this.show = () => {
    noStroke();
    fill(255);
    rect(this.x, this.y, this.size, this.size);
  }

  this.move = () => {
    this.y += -5;
  }

  this.evaporate = () => {
    this.toDelete = true;
  }

  this.hits = (invader) => {
    let d = dist(this.x, this.y, invader.x, invader.y);
    if (d < this.size/2 + invader.r/2) {
      // invader.r += 0.1;
      return true;
    } else {
      return false;
    }

  }

}
