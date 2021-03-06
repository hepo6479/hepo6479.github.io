"use strict";

{
  const que = document.getElementById("que");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector("#result > p");

  const quizSet = shuffle([
    {q: "ねているじかんが、いちばんみじかいのはだーれだ？", c: ["ゾウ", "ライオン", "カバ"]},
    {q: "こそだてをしないとりはだれでしょう？", c: ["カッコウ", "タカ", "ウグイス"]},
    {q: "ウォンバットのうんちのかたちはどれかな？", c: ["しかく", "さんかく", "まる"]},
    {q: "しまうまのなきごえはどーれだ？", c: ["ワンワン", "ニャーニャー", "ヒヒーン"]},
    {q: "シロクマのけは、なにいろかな？", c: ["とうめい", "くろ", "しろ"]},
  ]);

  let currentNum = 0;
  let isAnswered = false;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length-1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAns(li) {
    if (isAnswered) {
      return;
    }

    isAnswered = true;

    if(li.textContent === quizSet[currentNum].c[0]){
      li.classList.add("correct");
      score++;
    } else{
      li.classList.add("wrong");
    }

    btn.classList.remove("disabled");
  }


  function setQuiz() {
    isAnswered = false;
    que.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }


    const shuffledChoices = shuffle([...quizSet[currentNum].c]);

    shuffledChoices.forEach(choice => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => {
        checkAns(li);
      });
      choices.appendChild(li);
    });

    if(currentNum === quizSet.length - 1) {
      btn.textContent = "show SCORE";
    }


  }
  setQuiz();

  btn.addEventListener("click", () => {
    if(btn.classList.contains("disabled")){
      return;
    }

    btn.classList.add("disabled");

    if (currentNum === quizSet.length - 1) {
      // console.log(`SCORE : ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `SCORE : ${score} / ${quizSet.length}`;
      result.classList.remove("hidden");
    } else {

      currentNum++;
      setQuiz();

    }


  });
}
