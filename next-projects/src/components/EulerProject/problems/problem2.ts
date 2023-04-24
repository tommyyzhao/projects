const problem2 = () => {
  const maxLimit = 4000000;

  // fib(n) => answer
  const fibonacci: Record<number, number> = {
    0: 1,
    1: 1,
  };

  const getFibonacci = (n: number): number => {
    if (fibonacci.hasOwnProperty(n)) {
      return fibonacci[n];
    }

    const ans = getFibonacci(n - 1) + getFibonacci(n - 2);
    fibonacci[n] = ans;

    return ans;
  };

  let total = 0;
  let counter = 2;
  let currFibonacciNum = 0;

  while (currFibonacciNum <= maxLimit) {
    currFibonacciNum = getFibonacci(counter);

    if (currFibonacciNum % 2 === 0) {
      total += currFibonacciNum;
    }

    counter++;
  }

  return total;
};

export default problem2;
