function pizzaCart() {
  return {
    prices: {
      small: 0,
      medium: 0,
      large: 0,
    },
    payment: 0,
    change: 0,
    message: "",
    add(size) {
      const price = size === "small" ? 49.0 : size === "medium" ? 89.0 : 129.0;
      this.prices[size]++;
      this.updateTotalCost();
    },
    remove(size) {
      const price = size === "small" ? 49.0 : size === "medium" ? 89.0 : 129.0;
      if (this.prices[size] > 0) {
        this.prices[size]--;
        this.updateTotalCost();
      }
    },
    get totalCost() {
      return (
        this.prices.small * 49.0 +
        this.prices.medium * 89.0 +
        this.prices.large * 129.0
      ).toFixed(2);
    },
    updateTotalCost() {
      document.querySelector(".shopping-cart h3 span").textContent =
        this.totalCost;
    },
    pay() {
      const total = parseFloat(this.totalCost);
      const payment = parseFloat(this.payment);
      if (payment >= total) {
        this.message = "Enjoy your pizzas!";
        this.change = (payment - total).toFixed(2);
        this.prices.small = this.prices.medium = this.prices.large = 0;
        this.payment = 0;
        this.updateTotalCost();
      } else {
        this.message = "Sorry - that is not enough money!";
        this.change = 0;
      }
    },
  };
}
