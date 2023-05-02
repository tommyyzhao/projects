import addTwoLargeNumbers from "./addTwoLargeNumbers";

const multiplyTwoLargeNumbers = (n1: string, n2: string): string => {
  let n1Smaller = parseInt(n1) < parseInt(n2);

  let smallerNumber = "";
  let largerNumber = "";

  if (n1Smaller) {
    smallerNumber = n1;
    largerNumber = n2;
  } else {
    smallerNumber = n2;
    largerNumber = n1;
  }

  let total = largerNumber;

  for (let i = 1; i < parseInt(smallerNumber); i++) {
    total = addTwoLargeNumbers(total, largerNumber);
  }

  return total;
};

export default multiplyTwoLargeNumbers;
