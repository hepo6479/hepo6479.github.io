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

      this.canvas.addEventListener("click", e =>{
        const rect = this.canvas.getBoundingClientRect();
        const col = Math.floor((e.clientX - rect.left) / 70);
        const row = Math.floor((e.clientY - rect.top) / 70);
        this.swapTiles(col, row);
        this.render();
      });
      this.shuffle(def);
    }

    shuffle(n) {
      let blankCol = 3;
      let blankRow = 3;

      for (let i = 0; i < n; i++){
        let destCol;
        let destRow;
        do {
          let dir = Math.floor(Math.random() * 4);
          switch (dir) {
            case 0 : // up
            destCol = blankCol;
            destRow = blankRow - 1;
            break;

            case 1 : // down
            destCol = blankCol;
            destRow = blankRow + 1;
            break;

            case 2 : // left
            destCol = blankCol - 1;
            destRow = blankRow;
            break;

            case 3 : // right
            destCol = blankCol + 1;
            destRow = blankRow;
            break;
          }

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
        let destCol;
        let destRow;

        switch (i) {
          case 0 : // up
          destCol = col;
          destRow = row - 1;
          break;

          case 1 : // down
          destCol = col;
          destRow = row + 1;
          break;

          case 2 : // left
          destCol = col - 1;
          destRow = row;
          break;

          case 3 : // right
          destCol = col + 1;
          destRow = row;
          break;
        }

        if (
          destCol < 0 || destCol > 3 ||
          destRow < 0 || destRow > 3
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

    render() {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          this.renderTile(this.tiles[j][i], i, j);
        }
      }
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