// Remove inputting + - and e keys to input field
function validateInput(event) {
  const key = event.key;
  const forbiddenKeys = ["+", "-", "e"];

  if (forbiddenKeys.includes(key)) {
    event.preventDefault();
  }
}

// Disallow pasting + -
function sanitizeInput(event) {
  const input = event.target;

  const inputValue = input.value;

  const sanitizedValue = inputValue.replace(/[+-]/g, "");

  input.value = sanitizedValue;
}

// coutdown function

function countDown(){
var countDownDate = new Date("Aug 1, 2023 00:00:00").getTime();

var x = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with class="timer"
  document.querySelector(".timer").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s";

  if (distance < 0) {
    clearInterval(x);
    document.querySelector(".timer").innerHTML = "EXPIRED";
  }
}, 1000);
}