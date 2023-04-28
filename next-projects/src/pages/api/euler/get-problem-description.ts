// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import scrapeProblemDescription from "@/serverFns/projectEuler/utils/scrapeProblemDescription";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  problemDescription: string;
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
    const problemDescription = await scrapeProblemDescription(
      parseInt(problemNumber)
    );

    return res.status(200).json({ problemDescription });
  } catch (e) {
    return res.status(500).json({ problemDescription: `Error: ${e}` });
  }
}
