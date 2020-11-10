"use strict";

{
  function setWord() {
    word = words.splice([Math.floor(Math.random() * words.length)],1)[0];
    target.textContent = word;
    loc = 0;
  }

  function countUp() {
    if (!isPlaying){
      return}

      const d = new Date(Date.now() - startTime);
      const s = String(d.getSeconds()).padStart(2, "0");
      const ms = String(d.getMilliseconds()).padStart(3, "0");
      result.textContent = `${s}.${ms}sec`
      timeoutId = setTimeout(() => {
        countUp();
      }, 10);

    }

    const words = [
      "red",
      "blue",
      "pink",
      "yellow",
      "green",
    ]
    let word;
    let loc = 0;
    let startTime;
    let isPlaying = false;
    let timeoutId;

    const target = document.getElementById("target");
    const result = document.getElementById("result");


    document.addEventListener("click", () => {
      if (isPlaying) {return};
      setWord();
      startTime = Date.now();
      isPlaying = true;
      countUp();

    });

    document.addEventListener("keydown", e => {
      if (e.key !== word[loc]) {
        return;
      }
      loc++;
      target.textContent = "_".repeat(loc) + word.substring(loc);

      if (loc === word.length) {
        if (words.length === 0) {
          clearTimeout(timeoutId);
          const endTime = ((Date.now() - startTime) / 1000).toFixed(2);
          result.textContent = `Finished! ${endTime} seconds!`;

        }
        setWord();
      }

    });




  }
