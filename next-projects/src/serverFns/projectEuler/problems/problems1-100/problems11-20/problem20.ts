import multiplyTwoLargeNumbers from "@/serverFns/projectEuler/helpers/multiplyTwoLargeNumbers";

const problem20 = () => {
  let factorial = "1";

  for (let i = 100; i >= 1; i--) {
    factorial = multiplyTwoLargeNumbers(factorial, `${i}`);
  }

  // sum digits of factorial
  const sum = factorial
    .split("")
    .reduce((acc, curr) => acc + parseInt(curr), 0);

  return sum;
};

export default problem20;
