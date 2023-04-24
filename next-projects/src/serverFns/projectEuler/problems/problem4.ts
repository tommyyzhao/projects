// Find the largest palindrome made from the product of two 3-digit numbers.
const problem4 = () => {
  const largestProduct = 999 * 999;
  const smallestProduct = 100 * 100;

  // console.log(
  //   "Calculating numbers from",
  //   largestProduct,
  //   "to",
  //   smallestProduct
  // );

  for (let i = largestProduct; i >= smallestProduct; i--) {
    if (i % 1000 === 0) {
      // console.log(`Current number: ${i}`);
    }

    if (isPalindrome(i) && isProductOf3DigitNumbers(i)) {
      return `${i}`;
    }
  }

  return "Not Found";
};

export default problem4;

const isPalindrome = (n: number): boolean => {
  const str = n.toString();
  return str === str.split("").reverse().join("");
};

const isProductOf3DigitNumbers = (n: number): boolean => {
  let highNumber = 999;
  let lowNumber = 100;

  // attempt at short-circuit
  if (n / lowNumber < lowNumber) {
    return false;
  }

  // check all 3 digit numbers

  for (let i = highNumber; i >= lowNumber; i--) {
    // divisible by two 3-digit number
    if (n % i === 0 && isThreeDigitNumber(n / i)) {
      return true;
    }
  }
  return false;
};

const isThreeDigitNumber = (n: number): boolean => {
  return n.toString().length === 3;
};
