import path from "path";
import fs from "fs";

const getValidProblems = async (): Promise<
  [key: number, problemNumbers: number[]][]
> => {
  const problemsDirectory = path.join(
    process.cwd(),
    "src/serverFns/projectEuler/problems"
  );

  const files: string[] = [];

  try {
    await recursivelyGetFiles(problemsDirectory, files);

    const problemNumbers = files.map((problemName) => {
      const arr = problemName.split("/");
      // str = "problem#.ts"
      const str = arr[arr.length - 1];
      const withoutExtension = str.split(".")[0];
      return parseInt(withoutExtension.split("problem")[1]);
    });

    const sortedProblemNumbers = problemNumbers.sort((a, b) => a - b);

    // groupings are by 10s, 1-10, 11-20, 21-30. Record is tens place => problems within the group
    const problemNumberRecord: Record<number, number[]> = {};

    sortedProblemNumbers.forEach((problemNumber) => {
      const roundUpToNearestTenthPlace = Math.ceil(problemNumber / 10) * 10;
      if (problemNumberRecord.hasOwnProperty(roundUpToNearestTenthPlace)) {
        problemNumberRecord[roundUpToNearestTenthPlace].push(problemNumber);
      } else {
        problemNumberRecord[roundUpToNearestTenthPlace] = [problemNumber];
      }
    });

    const entries = Object.entries(problemNumberRecord);
    const sortedEntries = entries.sort(
      ([keyA], [keyB]) => parseInt(keyA) - parseInt(keyB)
    );

    return sortedEntries.map(([key, problemNumbers]) => [
      parseInt(key),
      problemNumbers,
    ]);
  } catch (err) {
    console.error("Error occurred while reading directory!", err);
    return [];
  }
};

export default getValidProblems;

const recursivelyGetFiles = async (directory: string, files: string[]) => {
  fs.readdirSync(directory).forEach((File) => {
    const Absolute = path.join(directory, File);
    if (fs.statSync(Absolute).isDirectory()) {
      return recursivelyGetFiles(Absolute, files);
    }

    return files.push(Absolute);
  });
};
