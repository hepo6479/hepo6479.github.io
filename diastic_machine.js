//diastic_machine

function diastic(seed, words) {

  let phrase = "";
  currentword = 0;

  for (let i = 0; i < seed.length; i++) {
    let c = seed.charAt(i);

    for (let j = currentword; j < words.length; j++) {
      if (words[j].charAt(i) === c) {
        phrase += words[j];
        phrase += " ";
        currentword = j + 1;
        // console.log(words[j]);
        break;
      }
    }

  }
  return phrase;
}

let srctxt;
let words;

function preload() {
  srctxt = loadStrings("elmar.txt");
}

function setup() {
  noCanvas();
  srctxt = join(srctxt, " ");
  words = splitTokens(srctxt, " ,!.?");

  let seed = document.getElementById('seed');

  let submit = document.getElementById('submit');

  submit.addEventListener('mousedown', function(event) {
    let phrase = diastic(seed.value, words);
    createP(phrase);
    // createP(seed.value);
    // createP(srctxt);
  });

  submit.addEventListener('touchstart', function(event) {
    let phrase = diastic(seed.value, words);
    createP(phrase);
    // createP(seed.value);
    // createP(srctxt);
  });

}
