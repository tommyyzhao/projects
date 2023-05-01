import { OpenAI } from "langchain/llms/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { readFileSync } from "fs";
import path from "path";

let storedMemory: ConversationSummaryMemory;

export const getNewMessage = async (input: string) => {
  // get api key
  const directory = path.join(process.cwd(), "keys/open-ai-key");
  const apiKey = readFileSync(directory, "utf8");

  // retrieve memory
  let memory: ConversationSummaryMemory;
  if (storedMemory) {
    memory = storedMemory;
  } else {
    storedMemory = new ConversationSummaryMemory({
      memoryKey: "chat_history",
      llm: new OpenAI({
        openAIApiKey: apiKey,
        modelName: "gpt-3.5-turbo",
        temperature: 0,
      }),
    });
    memory = storedMemory;
  }

  const model = new OpenAI({ openAIApiKey: apiKey, temperature: 0.9 });

  const prompt =
    PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

  Current conversation:
  {chat_history}
  Human: {input}
  AI:`);

  const chain = new LLMChain({ llm: model, prompt, memory });
  const response = await chain.call({ input });

  return response.text;
};

export default getNewMessage;
