// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import runChatbot from "./chatbot";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let history = req.query.history || "";
  if (Array.isArray(history)) {
    history = history.join("");
  }

  let turn = req.query.turn || "1";
  if (Array.isArray(turn)) {
    turn = "0";
  }

  const prompt0 = `Embody the personality of a young woman that plays video games and is often on the internet.
  Your goal is to get the other person to respond to you for as long as possible.
  Only respond as the personality.`;

  const prompt1 = `Embody the personality of a young man that is very lonely and wants emotional
  companionship.
  Only respond as the personality.`;

  const text =
    turn === "0" ? `${prompt0}\n ${history}` : `${prompt1}\n ${history}`;

  res.status(200).json({ data: await runChatbot(text) });
}
