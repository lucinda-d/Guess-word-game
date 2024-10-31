//Creating global variables
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let attempts = [];
let remainingGuesses = 8;

///Add an async function
///function #8 - 4th page of instructions
const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  // console.log(words);

  const wordArray = words.split("\n");
  // console.log(wordArray);

  const randomWordPull = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomWordPull].trim();
  symbolUpdate(word);
};

getWord();

///write a function to add placeholders for each letter
///Function #1 - first page of instructions
const symbolUpdate = function (word) {
  const symbolArray = [];
  for (const letter of word) {
    // console.log(letter);
    symbolArray.push("☀️");
  }
  inProgress.innerText = symbolArray.join("");
};

symbolUpdate(word);

///Event listener for guess button
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const captureInput = letterInput.value;
  // console.log(captureInput);
  letterInput.value = "";

  const goodGuess = validatePlayerInput(captureInput);
  // console.log(goodGuess);

  if (goodGuess) {
    makeGuess(captureInput);
  }
});

////function that checks input
//function #2 - 2nd page of instructions
const validatePlayerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Enter a letter";
  } else if (input.length > 1) {
    message.innerText = "Enter only 1 letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "please use only letters, no special stuff";
  } else {
    return input;
  }
};

///function to capture input
///function #3 - 2nd page of instructions
const makeGuess = function (captureInput) {
  captureInput = captureInput.toUpperCase();

  if (attempts.includes(captureInput)) {
    message.innerText = "you already guessed that. try again";
  } else {
    attempts.push(captureInput);
    // console.log(attempts);
    attemptsLeft(captureInput);
    showGuesses();
    letterUpdate(attempts);
  }
};

///function to show guessed letters
///function #4 - 3rd page of instructions
const showGuesses = function () {
  guessedLetters.innerHTML = "";
  for (const letter of attempts) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetters.append(li);
  }
};

///function to update word in progress
//function #5 - 3rd page of instructions
const letterUpdate = function (attempts) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  // console.log(wordArray);

  const showLetter = [];
  for (const letter of wordArray) {
    if (attempts.includes(letter)) {
      showLetter.push(letter.toUpperCase());
    } else {
      showLetter.push("☀️");
    }
  }
  inProgress.innerText = showLetter.join("");
  // console.log(showLetter);
  didTheyWin();
};

////function to count guesses remaining
//function #7 - 4th page of instructions
const attemptsLeft = function (captureInput) {
  const upperCaseWord = word.toUpperCase();
  if (!upperCaseWord.includes(captureInput)) {
    message.innerText = `${captureInput} is not in this word.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Yes! ${captureInput} is in the word.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game Over! The word was <span class = "highlight">${word}</span>`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};

///function to check if player won
//function #6 - 3rd page of instructions
const didTheyWin = function () {
  if (word.toUpperCase() === inProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

    startOver();
  }
};

///function to hide and show elements (like the guess button), when the game ends. this will also be used to the show the play again button.
///function #9 - 4th page of instructions
const startOver = function () {
  guessButton.classList.add("hide");
  remaining.classList.add("hide");
  guessedLetters.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

///add a click event for the play button to display a new word and restart the guesses back to 8
//4th page of instructions
playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  message.innerText = "";
  guessedLetters.innerText = "";
  remainingGuesses = 8;
  attempts = [];
  remainingSpan.innerText = `${remainingGuesses} guesses`;

  getWord();

  guessButton.classList.remove("hide");
  remaining.classList.remove("hide");
  guessedLetters.classList.remove("hide");
  playAgainButton.classList.add("hide");
});
