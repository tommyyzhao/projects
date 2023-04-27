// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
  runTime: number;
};

export default async function euler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let problemNumber = req.query.problemNumber || "0";
  if (Array.isArray(problemNumber)) {
    problemNumber = problemNumber.join("");
  }

  try {
    const folderName = getFolderName(problemNumber);
    const { default: problem } = await import(
      `@/serverFns/projectEuler/problems/${folderName}`
    );

    const startTime = Date.now();
    const answer = problem();
    const endTime = Date.now();

    res.status(200).json({ answer, runTime: endTime - startTime });
  } catch (e) {
    res
      .status(500)
      .json({ answer: "Solution not yet implemented", runTime: 0 });
  }
}

const getFolderName = (s: string): string => {
  const n = parseInt(s);

  const roundUpToNearestTenthPlace = Math.ceil(n / 10) * 10;
  const roundUpToNearestHundrethPlace = Math.ceil(n / 100) * 100;

  const hundredFolderName = `problems${
    roundUpToNearestHundrethPlace - 99
  }-${roundUpToNearestHundrethPlace}`;
  const tensFolderName = `problems${
    roundUpToNearestTenthPlace - 9
  }-${roundUpToNearestTenthPlace}`;

  return `${hundredFolderName}/${tensFolderName}/problem${s}`;
};
