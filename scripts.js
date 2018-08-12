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

  function output(startIndex) {
    for (let i = 0, j = startIndex; i < length; i++, j++){
      display[j].textContent = letters[i];
    }
  }

  switch (length) {
    case 1: case 2:
      output(5);
      break;
    case 3: case 4: case 5:
      output(4);
      break;
    case 6: case 7: case 8: case 9:
      output(3);
      break;
    case 10: case 11: case 12: case 13: case 14:
      output(2);
      break;
    default:
      output(1);
  }

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
