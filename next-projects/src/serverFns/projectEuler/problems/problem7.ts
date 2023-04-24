import primeNumberGenerator from "../helpers/primeNumberGenerator";

const problem7 = () => {
  const getNthPrimeNumber = primeNumberGenerator();

  return `${getNthPrimeNumber(10001)}`;
};

export default problem7;
