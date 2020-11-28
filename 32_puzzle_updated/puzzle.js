"use strict";


(() => {
  let button0 = document.getElementById("0");
  let button10 = document.getElementById("10");
  let buttonNumber = document.getElementById("number");
  let buttonAnimal = document.getElementById("animal");
  let def = 0;
  let img = "img/15puzzle.png";

  class Puzzle {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.img = document.createElement("img");
      this.img.src = img;
      this.img.addEventListener("load", () => {
        this.render();
      });

      this.tiles = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ];

      this.UDLR = [
        [0, -1],//up
        [0, 1],//down
        [-1, 0],//left
        [1, 0],//right
      ];

      this.canvas.addEventListener("click", e =>{
        const rect = this.canvas.getBoundingClientRect();
        const col = Math.floor((e.clientX - rect.left) / 70);
        const row = Math.floor((e.clientY - rect.top) / 70);
        this.swapTiles(col, row);
        this.render();
        if(this.isComplete()){
          this.renderGameClear();
        };

      });

      // do {
        this.shuffle(def);
      // } while(this.isComplete());
    }

    shuffle(n) {
      let blankCol = 3;
      let blankRow = 3;

      for (let i = 0; i < n; i++){
        let destCol;
        let destRow;
        do {
          let dir = Math.floor(Math.random() * 4);


          destCol = blankCol + this.UDLR[dir][0];
          destRow = blankRow + this.UDLR[dir][1];

        }while (
          destCol < 0 || destCol > 3 ||
          destRow < 0 || destRow > 3

        );



        [
          this.tiles[blankRow][blankCol],
          this.tiles[destRow][destCol]
        ] = [
          this.tiles[destRow][destCol],
          this.tiles[blankRow][blankCol]
        ];

        [blankCol, blankRow] = [destCol, destRow];
      }
    }


    swapTiles(col, row) {
      if (this.tiles[row][col] === 15){
        return;
      }
      for (let i = 0; i < 4; i++){
        let destCol = col + this.UDLR[i][0];
        let destRow = row + this.UDLR[i][1];

        if (
          this.isOutside(destCol, destRow)
        ) {
          continue;
        }

        if (this.tiles[destRow][destCol] == 15) {
          [
            this.tiles[row][col],
            this.tiles[destRow][destCol]
          ] = [
            this.tiles[destRow][destCol],
            this.tiles[row][col]
          ];
          break;
        }
      }

    }

    isComplete() {
      let i = 0;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (this.tiles[row][col] !== i++){
            return false;
          }
        }
      }
      return true;
    }

    renderGameClear() {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "#fff";
      this.ctx.fillText("GAME CLEAR!!", 100,150);
    }


    render() {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          this.renderTile(this.tiles[j][i], i, j);
        }
      }
    }

    isOutside(destCol, destRow) {
      return (
        destCol < 0 || destCol > 3 ||
        destRow < 0 || destRow > 3
      );
    }


    renderTile(n, col, row) {


      let sx = (n % 4) * 70;
      let sy = Math.floor(n / 4) * 70;
      let dx = col * 70;
      let dy = row * 70;


      this.ctx.drawImage(
        this.img,
        sx, sy, 70, 70,
        dx, dy, 70, 70,
      );

      if (n === 15) {
        this.ctx.fillStyle = "#eeeeee";
        this.ctx.fillRect(col * 70, row * 70, 70, 70);
      }

    }



  }

  const canvas = document.querySelector("canvas");
  if (typeof canvas.getContext === "undefined") {
    return;
  }

  const puzzle = new Puzzle(canvas);


  button0.addEventListener("click", () => {
    def = 0;
    const puzzle = new Puzzle(canvas);
  });

  button10.addEventListener("click", () => {
    def = 10;
    const puzzle = new Puzzle(canvas);
  });

  buttonNumber.addEventListener("click", () => {
    def = 20;
    img = "img/15puzzle.png";
    const puzzle = new Puzzle(canvas);
  });

  buttonAnimal.addEventListener("click", () => {
    def = 20;
    img = "img/animal1.png";
    const puzzle = new Puzzle(canvas);
  });

}
)();
