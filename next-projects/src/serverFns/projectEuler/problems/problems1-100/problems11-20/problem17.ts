const problem17 = () => {
  const numbersToLengthMap: Record<string, number> = {
    "0": 0,
    "1": "one".length,
    "2": "two".length,
    "3": "three".length,
    "4": "four".length,
    "5": "five".length,
    "6": "six".length,
    "7": "seven".length,
    "8": "eight".length,
    "9": "nine".length,
    "10": "ten".length,
    "11": "eleven".length,
    "12": "twelve".length,
    "13": "thirteen".length,
    "14": "fourteen".length,
    "15": "fifteen".length,
    "16": "sixteen".length,
    "17": "seventeen".length,
    "18": "eighteen".length,
    "19": "nineteen".length,
    "20": "twenty".length,
    "30": "thirty".length,
    "40": "forty".length,
    "50": "fifty".length,
    "60": "sixty".length,
    "70": "seventy".length,
    "80": "eighty".length,
    "90": "ninety".length,
  };

  const hundredLength = "hundred".length;
  const thousandLength = "thousand".length;

  const min = 1;
  const max = 1000;

  let totalLength = 0;

  for (let i = min; i <= max; i++) {
    const str = `${i}`;
    let shouldAddAnd = false;
    for (let j = str.length - 1; j >= 0; j--) {
      if (str[j] === "0") {
        continue;
      }
      // singles or tens place
      if (j === str.length - 1 || j === str.length - 2) {
        shouldAddAnd = true;
      }

      // tens place
      if (j === str.length - 2) {
        if (str[j] === "1") {
          totalLength -= numbersToLengthMap[str[j + 1]];
          totalLength += numbersToLengthMap[`${str[j]}${str[j + 1]}`];
        } else {
          totalLength += numbersToLengthMap[`${str[j]}0`];
        }
      } else {
        totalLength += numbersToLengthMap[str[j]];
      }

      // hundreds place
      if (j === str.length - 3) {
        totalLength += hundredLength;
        if (shouldAddAnd) {
          totalLength += "and".length;
        }
      }

      if (j === str.length - 4) {
        totalLength += thousandLength;
      }
    }
  }

  return `${totalLength}`;
};

export default problem17;
