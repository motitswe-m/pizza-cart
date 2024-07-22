let cart = {
  small: 0,
  medium: 0,
  large: 0,
};

const prices = {
  small: 49.99,
  medium: 89.99,
  large: 129.99,
};

function updateCart(size, action) {
  if (action === "add") {
    cart[size]++;
  } else if (action === "subtract" && cart[size] > 0) {
    cart[size]--;
  }
  updateTotalCost();
  checkCart();
}

function addToCart(size) {
  cart[size]++;
  updateTotalCost();
  checkCart();
}

function updateTotalCost() {
  let totalCost =
    cart.small * prices.small +
    cart.medium * prices.medium +
    cart.large * prices.large;
  document.querySelector(
    ".shopping-cart h3 span"
  ).innerText = `R${totalCost.toFixed(2)}`;
}

function pay() {
  let totalCost =
    cart.small * prices.small +
    cart.medium * prices.medium +
    cart.large * prices.large;
  let paymentAmount = parseFloat(
    document.querySelector(".payment-section input[type='number']").value
  );

  if (paymentAmount >= totalCost) {
    displayMessage("Enjoy your pizzas", "success");
    cart = { small: 0, medium: 0, large: 0 };
    updateTotalCost();
    checkCart();
  } else {
    displayMessage("Sorry - that is not enough money!", "error");
  }
}

function displayMessage(message, type) {
  let messageDiv = document.querySelector(".message");
  messageDiv.innerText = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = "block";
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 3000);
}

function checkCart() {
  let checkoutButton = document.querySelector(".payment-section button");
  if (cart.small + cart.medium + cart.large > 0) {
    checkoutButton.style.display = "block";
  } else {
    checkoutButton.style.display = "none";
  }
}

// Event listeners for cart buttons
document.querySelectorAll(".cart-item button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const size = event.target
      .closest(".cart-item")
      .querySelector("h3")
      .innerText.toLowerCase();
    const action = event.target.innerText === "+" ? "add" : "subtract";
    updateCart(size, action);
  });
});

// Event listeners for pizza buttons
document.querySelectorAll(".pizza .buy").forEach((button) => {
  button.addEventListener("click", (event) => {
    const size = event.target
      .closest(".pizza")
      .querySelector("h2")
      .innerText.toLowerCase();
    addToCart(size);
  });
});

// Event listener for pay button
document
  .querySelector(".payment-section button")
  .addEventListener("click", pay);
