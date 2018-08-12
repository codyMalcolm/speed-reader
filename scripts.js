let listOfWords = [];
let speedFactor = 1;
let iterator = 0;
let runFlag = true;

const regexSplit = /\s|-/;
const resetButton = document.querySelector('[name=reset-button]');
const rewindButton = document.querySelector('[name=rewind-button]');
const pauseButton = document.querySelector('[name=pause-button]');
const startButton = document.querySelector('[name=start-button]');
const displayButton = document.querySelector('[name=display-button]');
const display = document.querySelectorAll('[data-index]');
const inputField = document.querySelector('[name=input]');
const tracker = document.querySelector('.output-tracker');
const indexKeys = [5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

resetButton.addEventListener('click', handleResetClick);
rewindButton.addEventListener('click', handleRewindClick);
pauseButton.addEventListener('click', handlePauseClick);
startButton.addEventListener('click', handleStartClick);
displayButton.addEventListener('click', handleDisplayClick);

function showWord() {
  const word = listOfWords[iterator];
  const length = word.length;
  const letters = word.split('');

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
    display[indexKeys[length]+i].textContent = l;
  })

  if (++iterator < listOfWords.length && runFlag) {
    setTimeout(showWord, (length*20+100)/speedFactor)
  }
}

function handleResetClick() {
  runFlag = false;
  iterator = 0;
  inputField.style.display = 'block';
  tracker.style.display = 'none';
}

function handleRewindClick() {
  runFlag = false;
  iterator = iterator >= 15 ? iterator - 15 : 0;
  showWord();
}

function handlePauseClick() {
  runFlag = false;
  showWord();
}

function handleStartClick() {
  runFlag = true;
  showWord();
}

function handleDisplayClick() {
  runFlag = true;
  iterator = 0;
  listOfWords = inputField.value.split(regexSplit);
  inputField.style.display = 'none';
  tracker.style.display = 'block';
  showWord();
}

function handleKey(e) {
  if (e.key === '+') {
    speedFactor += 0.1;
  }
  if (e.key === '-') {
    speedFactor -= 0.1;
  }
}

window.addEventListener('keydown', handleKey);
