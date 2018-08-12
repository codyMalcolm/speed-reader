let listOfWords = [];
let speedFactor = 1;
let iterator = 0;
let runFlag = true;

const resetButton = document.querySelector('[name=reset-button]');
const rewindButtons = document.querySelectorAll('[data-words]');
const pauseButton = document.querySelector('[name=pause-button]');
const startButton = document.querySelector('[name=start-button]');
const displayButton = document.querySelector('[name=display-button]');
const display = document.querySelectorAll('[data-index]');
const inputField = document.querySelector('[name=input]');
const tracker = document.querySelector('.output-tracker');
const indexKeys = [5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let timer;

resetButton.addEventListener('click', handleResetClick);
rewindButtons.forEach(b => {
  b.addEventListener('click', handleRewindClick)
});
pauseButton.addEventListener('click', handlePauseClick);
startButton.addEventListener('click', handleStartClick);
displayButton.addEventListener('click', handleDisplayClick);

// TODO: Add a display for current speed
// TODO: Display/hide the pause/start buttons when paused/playing
// TODO: Check for content before hiding input box

function showWord() {
  const word = listOfWords[iterator];
  const length = word.length;
  const letters = word.split('');
  let pauseFactor = 1;

  let trackerBefore = '';
  const trackerCurrent = listOfWords[iterator];
  let trackerAfter = '';

  for (let i = 0; i < iterator; i++) {
    trackerBefore += `${listOfWords[i]} `;
  }

  for (let i = iterator+1; i < listOfWords.length; i++) {
    trackerAfter += ` ${listOfWords[i]}`;
  }

  tracker.querySelector('.tracker-before').textContent = trackerBefore;
  tracker.querySelector('.tracker-current').textContent = trackerCurrent;
  tracker.querySelector('.tracker-after').textContent = trackerAfter;

  display.forEach(n => {
    n.textContent = "";
  });

  letters.forEach((l, i) => {
    if (i < 30) (display[indexKeys[length]+i] || i+1).textContent = l;
  })

  if (letters[letters.length-1] === ".") {
    pauseFactor *= 2;
  }

  if (++iterator < listOfWords.length && runFlag) {
    timer = setTimeout(showWord, ((length*20+100)/speedFactor) * pauseFactor)
  }
}

function handleResetClick() {
  runFlag = false;
  if (timer) --iterator && clearTimeout(timer);
  iterator = 0;
  inputField.style.display = 'block';
  tracker.style.display = 'none';
}

function handleRewindClick(e) {
  runFlag = false;
  if (timer) --iterator && clearTimeout(timer);
  const amount = e.target.dataset.words;
  iterator = iterator >= amount ? iterator - amount : 0;
  if (listOfWords.length > 0) {
    showWord();
  }
}

function handlePauseClick() {
  runFlag = false;
  if (timer) --iterator && clearTimeout(timer);
  if (listOfWords.length > 0) {
    showWord();
  }
}

function handleStartClick() {
  runFlag = true;
  if (listOfWords.length > 0) {
    showWord();
  }
}

function handleDisplayClick() {
  if (timer) clearTimeout(timer);
  runFlag = true;
  iterator = 0;
  listOfWords = parseInput(inputField.value);
  inputField.style.display = 'none';
  tracker.style.display = 'block';
  showWord();
}

function parseInput(input) {
  let response = [];
  const regexSplit = /\r|\s|\t/
  function addHyphens(word) {
    const len = word.length;
    const hyphensToAdd = Math.floor((len - 1) / 13);
    const chars = len / (hyphensToAdd + 1);
    for (let i = 0; i < hyphensToAdd; i++) {
      response.push(word.slice(i*chars, (i+1)*chars)+"-");
    }
    response.push(word.slice(chars*hyphensToAdd));
  }

  input.split(regexSplit).forEach(w => {
    if (w.length < 14) {
      response.push(w);
      return;
    } else if (/-/.test(w)) {
      let words = w.split("-")
      for (let i = 0; i < words.length-1; i++) {
        if (words[i] && words[i].length < 14) {
          response.push(words[i] + "-");
        } else {
          addHyphens(words[i]);
        }
      }
      if (words[words.length-1] && words[words.length-1].length < 14) {
        response.push(words[words.length-1]);
      } else {
        addHyphens(words[words.length-1]);
      }
    } else {
      addHyphens(w);

    }
  });

  return response;
}

function handleKey(e) {
  if (e.key === '+') {
    speedFactor += 0.1;
  }
  if (e.key === '-') {
    speedFactor -= 0.1;
  }
  if (e.key === '*') {
    if (runFlag) {
      handlePauseClick();
    } else {
      handleStartClick();
    }
  }
  if (e.key === '9') {
    if (timer) --iterator && clearTimeout(timer);
    iterator = iterator >= 5 ? iterator - 5 : 0;
    if (listOfWords.length > 0) {
      showWord();
    }
  }
}

window.addEventListener('keydown', handleKey);
