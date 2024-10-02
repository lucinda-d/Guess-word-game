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
  const captureInput = letterInput.value;
  console.log(captureInput);
  letterInput.value = "";
});
