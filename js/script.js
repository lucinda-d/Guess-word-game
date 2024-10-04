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
//this array will contain all the letters the player guesses.
const attempts = [];
let remainingGuesses = 8;

////////////////////////////////////////////////////////
//Add an async function (this fetches data from a file at the address below)
const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  //console log check here - don't forget to call the getWord function to view the result in the console.
  // console.log(response);
  const wordArray = words.split("\n");
  // console.log(wordArray);
  const randomWordPull = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomWordPull].trim();
  symbolUpdate(word);
};
getWord();

//////////////////////////////////////////////////////
//write a function to add placeholders for each letter
const symbolUpdate = function (word) {
  //create array
  const symbolArray = [];
  //create a for of loop
  for (const letter of word) {
    console.log(letter);
    symbolArray.push("●");
  }
  inProgress.innerText = symbolArray.join("");
};

///////////////////////////////////////////////////
//Adding event listener for the button
guessButton.addEventListener("click", function (e) {
  //preventing defaulting behaviors of form reload
  e.preventDefault();
  //emtpy text of message element
  message.innerText = "";
  //grabbing what was entered in the input
  const captureInput = letterInput.value;

  const goodGuess = validatePlayerInput(captureInput);

  if (goodGuess) {
    makeGuess(captureInput);
  }

  letterInput.value = "";
});

//////////////////////////////////////////////////////
//create a function to check players input
const validatePlayerInput = function (input) {
  //regular expression
  const acceptedLetter = /[a-zA-Z]/;
  //empty? then add a letter please
  if (input.length === 0) {
    message.innerText = "Please enter a letter.";
    //added more than one letter? only 1 letter please.
  } else if (input.length > 1) {
    message.innerText = "Please enter only 1 letter.";
    //something weird? symbols or character? use accepted letters
  } else if (!input.match(acceptedLetter)) {
    message.innerText =
      "Please use only letters, no special symbols or characters, or numbers. This is a word - not quorkle.";
    //yay! we got what we needed!
  } else {
    return input;
  }
};

////////////////////////////////////////////////////////
//create a function that accepts a letter as a parameter
const makeGuess = function (captureInput) {
  //making all letters uppercase
  captureInput = captureInput.toUpperCase();
  //check to see if your guessedLetters array already contains that letter.
  if (attempts.includes(captureInput)) {
    message.innerText = "You already used that letter! Try again!";
  } else {
    attempts.push(captureInput);
    console.log(attempts);
    attemptsLeft(captureInput);
    showGuesses();
    letterUpdate(attempts);
  }
};

/////////////////////////////////////////////////////
//create a function to show guessed letters
const showGuesses = function () {
  //empty the innerHTML of the unordered list where the guessed letters will display.
  guessedLetters.innerHTML = "";
  for (const letter of attempts) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetters.append(li);
  }
};

//////////////////////////////////////////////////////
//create a function to update the word in progress
const letterUpdate = function (attempts) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const showLetter = [];
  for (const letter of wordArray) {
    if (attempts.includes(letter)) {
      showLetter.push(letter.toUpperCase());
    } else {
      showLetter.push("●");
    }
  }
  console.log(showLetter);
  inProgress.innerText = showLetter.join("");
  didTheyWin();
};

///////////////////////////////////////////////////
//create a function to count guesses remaining
const attemptsLeft = function (captureInput) {
  const upperCaseWord = word.toUpperCase();
  if (!upperCaseWord.includes(captureInput)) {
    message.innerText = `Nice try. ${captureInput} is not in this word.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Well done! The letter ${captureInput} is in this word.`;
  }

  if (remainingGuesses === 0) {
    message.innerText = `Game over! The word was ${word}.`;
  } else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};

//////////////////////////////////////////////////////
//create a function to check if the player won
const didTheyWin = function () {
  if (word.toUpperCase() === inProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
};
