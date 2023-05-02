const addTwoLargeNumbers = (a: string, b: string) => {
  const { sameLengthA, sameLengthB } = makeTwoNumbersSameLength(a, b);
  const length = sameLengthA.length;
  const sumArr: string[] = [];
  let carry = 0;

  for (let i = length - 1; i >= 0; i--) {
    const sum = parseInt(sameLengthA[i]) + parseInt(sameLengthB[i]) + carry;
    const sumAsString = `${sum}`;

    // singles place (last digit)
    sumArr.push(sumAsString[sumAsString.length - 1]);
    if (sum < 10) {
      carry = 0;
    } else {
      // the rest of the digits
      carry = parseInt(sumAsString.slice(0, sumAsString.length - 1));
    }
  }

  if (carry > 0) {
    sumArr.push(`${carry}`);
  }

  return sumArr.reverse().join("");
};

export default addTwoLargeNumbers;

const makeTwoNumbersSameLength = (a: string, b: string) => {
  const diff = Math.abs(a.length - b.length);
  let newA = a;
  let newB = b;

  // if a longer, add to b
  if (a.length > b.length) {
    newB = `${Array.from("0".repeat(diff)).join("")}${b}`;
  } else {
    // if b longer, add to a
    newA = `${Array.from("0".repeat(diff)).join("")}${a}`;
  }

  return { sameLengthA: newA, sameLengthB: newB };
};
