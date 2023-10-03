let secretNumber;
let attempts = 0;

function generateSecretNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const message = document.getElementById("message");

  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.innerText = "Please enter a number between 1 and 100!";
    return;
  }

  attempts++;

  if (guess === secretNumber) {
    message.innerText = `Congratulations! You guessed the number in ${attempts} attempts.`;
    return;
  }

  if (attempts % 3 === 0) {
    if (secretNumber % 2 === 0) {
      message.innerText = "The secret number is even.";
    } else {
      message.innerText = "The secret number is odd.";
    }
  } else {
    if (guess < secretNumber) {
      message.innerText = "The secret number is greater.";
    } else {
      message.innerText = "The secret number is smaller.";
    }
  }

  guessInput.value = "";
}

function resetGame() {
  secretNumber = generateSecretNumber(1, 100);
  attempts = 0;
  document.getElementById("message").innerText = "";
  document.getElementById("guessInput").value = "";
}
