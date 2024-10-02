//Creating global variables
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
//this array will contain all the letters the player guesses.
const attempts = [];

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

symbolUpdate(word);

//Addding event listener for the button
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
      "Please use only letters, no special symbols or characters.  This is a word - not quorkle.";
    //yay! we got what we needed!
  } else {
    return input;
  }
};

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
  }
};
