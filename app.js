// listen submit
document.querySelector("#loan-form").addEventListener("submit", function (e) {
  e.preventDefault();
  // hide results
  document.querySelector("#results").style.display = "none";
  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 2000);
});

// Calculate Results fun.
function calculateResults() {
  // ui variable
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // cal variable
  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;
  //   compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principle).toFixed(2);

    // show result hide loader
    document.querySelector("#results").style.display = "block";
    document.querySelector("#loading").style.display = "none";
  } else {
    showMessage("Please Enter valid numbers");
    // hide loader
    document.querySelector("#loading").style.display = "none";
  }
}

function showMessage(message) {
  // create div
  const messageDiv = document.createElement("div");

  // add class
  messageDiv.className = "alert alert-danger";
  // add text

  messageDiv.appendChild(document.createTextNode(message));

  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  card.insertBefore(messageDiv, heading);
  //   clear message after 3s
  setTimeout(clearMessage, 3000);
}

function clearMessage() {
  document.querySelector(".alert").remove();
}
