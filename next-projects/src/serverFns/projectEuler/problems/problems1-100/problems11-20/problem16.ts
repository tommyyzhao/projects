import addTwoLargeNumbers from "@/serverFns/projectEuler/helpers/addTwoLargeNumbers";
/*
 *
 * 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
 *
 * What is the sum of the digits of the number 2^1000?
 *
 */

const problem16 = () => {
  let product: string = "1";
  for (let i = 0; i < 1000; i++) {
    product = addTwoLargeNumbers(product, product);
  }

  let sum: number = 0;

  for (let i = 0; i < product.length; i++) {
    sum += parseInt(product[i]);
  }

  return sum;
};

export default problem16;
