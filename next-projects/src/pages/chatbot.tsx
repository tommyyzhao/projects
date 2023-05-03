import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";

type Message = {
  writer: "You" | "Jimmy AI";
  content: string;
};

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memoryStatus, setMemoryStatus] = useState("");
  const [memory, setMemory] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  // TODO: upgrade so that it only responds after a delay and reads all messages since last sent
  const getResponse = async (input: string) => {
    setIsLoading(true);
    const response = await axios.get(`/api/chatbot?input=${input}`);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { writer: "Jimmy AI", content: response.data.response },
    ]);
    setMemoryStatus(response.data.memoryStatus);
    setMemory(response.data.memory);
    setIsLoading(false);
  };

  const startConvo = async () => {
    const welcomeMessage = "Hi! My name is Andrew.";
    setIsLoading(true);
    const response = await axios.get(`/api/chatbot?input=${welcomeMessage}`);
    setChatHistory(() => [
      { writer: "Jimmy AI", content: response.data.response },
    ]);
    setMemoryStatus(response.data.memoryStatus);
    setMemory(response.data.memory);
    setIsLoading(false);
  };

  return (
    <Container>
      <Response>
        <button onClick={startConvo}>Start Convo</button>
        <div>Memory Status: {memoryStatus}</div>
        <div>Memory: {memory}</div>
        {chatHistory.map((message: Message, key) => (
          <MessageContainer key={`message-${key}`}>
            <div
              style={{
                marginRight: "12px",
                flexShrink: "0",
                width: "100px",
                color: `${message.writer === "You" ? "white" : "#0fab3b"}`,
              }}
            >
              {message.writer}:
            </div>
            <div
              style={{
                textAlign: "left",
                color: `${message.writer === "You" ? "white" : "#0fab3b"}`,
              }}
            >
              {message.content}
            </div>
          </MessageContainer>
        ))}
        {isLoading && (
          <MessageContainer>
            <div style={{ marginRight: "12px", color: "#0fab3b" }}>
              Jimmy AI:
            </div>
            <div>...</div>
          </MessageContainer>
        )}
        <InputContainer>
          <input
            type="text"
            ref={inputRef}
            style={{
              height: "24px",
              width: "500px",
              padding: "8px",
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (inputRef.current) {
                const inputtedText = inputRef.current.value;

                setChatHistory((prevHistory) => [
                  ...prevHistory,
                  { writer: "You", content: inputtedText },
                ]);
                getResponse(inputtedText);
                inputRef.current.value = ""; // clear input
              }
            }}
          >
            send
          </button>
        </InputContainer>
      </Response>
    </Container>
  );
};

export default Chatbot;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  margin-top: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  column-gap: 24px;
  margin-top: 48px;
`;

const Response = styled.div`
  border: 1px solid white;
  border-radius: 16px;
  text-align: center;
  padding: 48px;
  white-space: wrap;
`;
