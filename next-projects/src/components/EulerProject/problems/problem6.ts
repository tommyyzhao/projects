// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

const problem6 = () => {
  const n = 100;

  return sumOfSquares(n) - sumOfNumbers(n) * sumOfNumbers(n);
};

export default problem6;

const sumOfSquares = (n: number) => {
  return (n * (n + 1) * (2 * n + 1)) / 6;
};

const sumOfNumbers = (n: number) => {
  return (n * (n + 1)) / 2;
};
