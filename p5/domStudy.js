// DOM : Document Objective Model

"use strict";

{

  // function update() {
  // document.querySelector("#target").textContent = "Changed!";
  // document.getElementById("target").textContent = "Changed!";
  // シャープいらないことに注意

  // document.querySelectorAll("p")[1].textContent = "changed";
  // document.querySelectorAll("p").forEach((p, index) => {
  // p.textContent = `${index}番目のpです`;
  // });

  // }

  // setTimeout(update, 1000);

  // document.querySelector("button").addEventListener("click", () => {
  //   const targetNode = document.querySelector("#target");
  // targetNode.textContent = "Changed!";
  // targetNode.title = "Changed!";
  // targetNode.style.color = "red";
  // targetNode.style.backgroundColor = "skyblue";
  // targetNode.className = "my-color";
  // targetNode.classList.add("my-color");

  // if(targetNode.classList.contains("my-color")) {
  //   targetNode.classList.remove("my-color");
  // } else if(!targetNode.classList.contains("my-color")) {
  //   targetNode.classList.add("my-color");
  // }


  // targetNode.classList.toggle("my-color")

  // targetNode.textContent = targetNode.dataset.translation;
  //
  // const item2 = document.createElement("li");
  // item2.textContent = "3";
  //
  // const ul = document.querySelector("ul");
  // ul.appendChild(item2);

  // const item0 = document.querySelectorAll("li")[0];
  // const copy = item0.cloneNode(true);
  //
  // const ul = document.querySelector("ul");
  // const item2 = document.querySelectorAll("li")[2];
  // ul.insertBefore(copy, item2);

  // });

  // document.querySelector("button").addEventListener("click", () => {
  //   const item1 = document.querySelectorAll("li")[1];
  // item1.remove();

  //   const itemul = document.querySelector("ul");
  //   itemul.removeChild(item1);
  // })

  // document.querySelector("#add").addEventListener("click", () => {
  //   const li = document.createElement("li");
  //   const text = document.querySelector("input");
  //   li.textContent = text.value;
  //   document.querySelector("ul").appendChild(li);
  //   text.value = " ";
  //   text.focus();
  // });

  // document.querySelector("#add").addEventListener("click", () => {
  //   const li = document.createElement("li");
  //   const color = document.querySelector("select");
  //   li.textContent = `${color.value} - ${color.selectedIndex}`;
  //   document.querySelector("ul").appendChild(li);
  // });

  // document.querySelector("#add").addEventListener("click", () => {
  //   const colors = document.querySelectorAll("input");
  //   let selectedColor;
  //
  //   colors.forEach(color => {
  //     if (color.checked) {
  //       selectedColor = color.value;
  //     }
  //   });
  //
  //   const li = document.createElement("li");
  //   li.textContent = selectedColor;
  //   document.querySelector("ul").appendChild(li);
  // });

//JavaScript DOM #16
  // document.querySelector("#add").addEventListener("click", () => {
  //   const colors = document.querySelectorAll("input");
  //   const selectedColors = [];
  //
  //   colors.forEach(color => {
  //     if (color.checked) {
  //       selectedColors.push(color.value);
  //     }
  //   });
  //
  //   const li = document.createElement("li");
  //   li.textContent = selectedColors.join(",");
  //   document.querySelector("ul").appendChild(li);
  // });
}
