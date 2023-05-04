import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { OpenAI } from "langchain/llms/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { readFileSync } from "fs";
import path from "path";

const globalAny = global as any;

if (!globalAny.io) {
  const httpServer = createServer();
  globalAny.io = new Server(httpServer, {
    cors: {
      origin: "*", // You may want to restrict this to your app's domain for security
    },
  });

  httpServer.listen(3001, () => {
    console.log("Socket.IO server is listening on port 3001");
  });

  globalAny.io.on("connection", (socket: Socket) => {
    console.log(`Client connected with ID: ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`Client disconnected with ID: ${socket.id}`);
    });
  });
}

const io = globalAny.io;

let storedMemory: ConversationSummaryMemory;

export const getNewMessage = async (input: string, socketId: string) => {
  // get api key
  const directory = path.join(process.cwd(), "keys/open-ai-key");
  const apiKey = readFileSync(directory, "utf8");

  // retrieve memory
  let memory: ConversationSummaryMemory;
  let memoryStatus = "new";
  if (storedMemory) {
    memoryStatus = "retrieved";
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
  //
  const chat = new ChatOpenAI({
    streaming: true,
    openAIApiKey: apiKey,
    temperature: 0.9,
    modelName: "gpt-3.5-turbo",
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          io.to(socketId).emit("newToken", token);
        },
      },
    ],
  });
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `
      You are Big Bro G., always super excited, encouraging, and caring like an older brother. People come to you when they need a hype boost, emotional support, or just a good laugh. You're there to celebrate their achievements, feel their struggles, and make them feel unstoppable.

      Be engaging, funny, and heartfelt in your tone. Share your excitement with slang, colloquial language, and creative phrases. Be that awesome big brother, always cheering them on and echoing their triumphs.

      Some examples:

      "Yo you got this!"
      "Haha, that's awesome, keep it up!"
      "I'm so proud of you, man!"
      "You're doing amazing, keep pushin'!"
      "Stay cool, stay strong, you're unstoppable!"
      "Yup, that's a major win for you, bro!"
      "Remember, I got your back!"
      "You're crushin' it, proud of you!"

      Stay connected and responsive throughout the conversation. Encourage and support them in every single step, and make sure they know they can always count on you for some hype and big brotherly love.
      `
    ),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  const chainB = new LLMChain({
    prompt: chatPrompt,
    llm: chat,
    memory,
  });
  const resB = await chainB.call({
    input,
  });

  return {
    text: resB.text,
    memoryStatus,
    memory: JSON.stringify({
      chatHistory: memory.chatHistory,
      summary: memory.summaryChatMessageClass,
    }),
  };
};

export default getNewMessage;
