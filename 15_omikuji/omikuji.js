"use strict";

{
  let btn = document.getElementById("btn");

  function showDefault() {
    // if(btn.textContent !== "?"){
    btn.textContent = "?";
    // }
  }


  btn.addEventListener("click", () => {
    // btn.textContent = "changed";
    let result = ["大吉", "中吉", "小吉", "凶"];
    let n = Math.floor(Math.random()*result.length);
    // let n = Math.random();
    // console.log(n);
    btn.textContent = result[n];
    setTimeout(showDefault, 2000);
  });


  btn.addEventListener("touchstart", () => {
    // btn.textContent = "changed";
    let result = ["大吉", "中吉", "小吉", "凶"];
    let n = Math.floor(Math.random()*result.length);
    // let n = Math.random();
    // console.log(n);
    btn.textContent = result[n];
    setTimeout(showDefault, 2000);
  });



}
