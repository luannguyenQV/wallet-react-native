export const performDivisibility = (balance, divisibility) => {
  for (let i = 0; i < divisibility; i++) {
    balance = balance / 10;
  }
  return balance;
};
