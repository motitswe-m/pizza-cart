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
    get totalCost() {
      // Calculate the total cost
      return (
        this.prices.small * 49.0 +
        this.prices.medium * 89.0 +
        this.prices.large * 129.0
      ).toFixed(2);
    },
    add(size) {
      // Increase the quantity of the specified pizza size
      if (this.prices[size] === undefined) {
        console.error("Invalid size:", size);
        return;
      }
      this.prices[size]++;
    },
    remove(size) {
      // Decrease the quantity of the specified pizza size
      if (this.prices[size] === undefined || this.prices[size] <= 0) {
        console.error("Invalid size or quantity:", size);
        return;
      }
      this.prices[size]--;
    },
    pay() {
      // Handle payment
      const total = parseFloat(this.totalCost);
      const payment = parseFloat(this.payment);

      if (payment >= total) {
        this.message = "Enjoy your pizzas!";
        this.change = (payment - total).toFixed(2);
        // Reset prices after successful payment
        this.prices.small = this.prices.medium = this.prices.large = 0;
        this.payment = 0;
      } else {
        this.message = "Sorry - that is not enough money!";
        this.change = 0;
      }
    },
  };
}
