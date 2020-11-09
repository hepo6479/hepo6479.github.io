//BINGO

"use strict";

{

  function createColumn(col) {
    let source = [];
    for (let i = 0; i < 15; i++) {
      source[i] = i + 1 + 15 * col;
    }
    // console.log(source);

    const b = [];
    for (let j = 0; j < 5; j++) {
      b.push(...source.splice(Math.floor(Math.random() * source.length),1));
    }
    // console.log(b);

    return b;

  }
  // let columns = [];
  //
  // columns[1] = createColumn(1);
  // console.log(columns);

  function createColumns() {
    const columns = [];
    for (let i = 0; i < 5; i++) {
      columns[i] = createColumn(i);
    }

    columns[2][2] = "FREE"

    return columns;
  }


  // console.table(columns);
  function createBingo(columns){
    const rev = [];
    for (let i = 0; i < 5; i++) {
      rev[i] = [];
      for (let j = 0; j < 5; j++) {
        rev[i][j] = columns[j][i];
      }
    }
    return rev;
  }

  // console.table(rev);


  function renderBingo(rev) {
    for (let j = 0; j < 5; j++) {
      const tr = document.createElement("tr");
      for (let i = 0; i < 5; i++) {
        const td = document.createElement("td");
        td.textContent = rev[j][i];
        tr.appendChild(td);
      }
      document.querySelector("tbody").appendChild(tr);
    }

  }

  const columns = createColumns();
  const rev = createBingo(columns);
  const bingo = renderBingo(rev);

}
