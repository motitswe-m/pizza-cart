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
  document.getElementById("totalCost").innerText = totalCost.toFixed(2);
}

function checkout() {
  let totalCost =
    cart.small * prices.small +
    cart.medium * prices.medium +
    cart.large * prices.large;
  let paymentAmount = parseFloat(
    document.getElementById("paymentAmount").value
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
  let messageDiv = document.getElementById("message");
  messageDiv.innerText = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = "block";
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 3000);
}

function checkCart() {
  let checkoutButton = document.querySelector(".button");
  if (cart.small + cart.medium + cart.large > 0) {
    checkoutButton.style.display = "block";
  } else {
    checkoutButton.style.display = "none";
  }
}

