import { readFileSync } from "fs";
import { OpenAI } from "langchain/llms/openai";
import path from "path";

const runChatbot = async (text: string) => {
  const directory = path.join(process.cwd(), "keys/open-ai-key");
  const apiKey = readFileSync(directory, "utf8");
  const llm = new OpenAI({ openAIApiKey: apiKey, temperature: 0.5 });
  const response = await llm.call(text);
  return response;
};

export default runChatbot;
