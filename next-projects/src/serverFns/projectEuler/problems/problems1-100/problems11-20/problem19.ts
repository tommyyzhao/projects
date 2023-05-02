const problem19 = () => {
  const startDate = new Date("January 1, 1901");
  const endDate = new Date("December 31, 2000");

  let numSundays = 0;

  let currDate = startDate;
  while (currDate <= endDate) {
    // first of the month && Monday
    if (currDate.getDate() === 1 && currDate.getDay() === 0) {
      numSundays++;
    }
    // increment curr date by 1 day
    currDate.setDate(currDate.getDate() + 1);
  }

  return numSundays;
};

export default problem19;
