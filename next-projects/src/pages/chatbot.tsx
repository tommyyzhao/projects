// import axios from "axios";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";

type Message = {
  writer: "You" | "Big G";
  content: string;
};

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memoryStatus, setMemoryStatus] = useState("");
  const [memory, setMemory] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const [currentResponse, setCurrentResponse] = useState("");
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001");

    socketRef.current.on("newToken", (token: string) => {
      setCurrentResponse((prevResponse) => prevResponse + token);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const getResponse = async (input: string) => {
    setIsLoading(true);
    setCurrentResponse("");
    const response = await axios.get(
      `/api/chatbot?input=${input}&socketId=${socketRef.current.id}`
    );
    setMemoryStatus(response.data.memoryStatus);
    setMemory(response.data.memory);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { writer: "Big G", content: response.data.response },
    ]);
    setIsLoading(false);
  };

  return (
    <Container>
      <Response>
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
                whiteSpace: "pre-wrap",
                color: `${message.writer === "You" ? "white" : "#0fab3b"}`,
              }}
            >
              {message.content}
            </div>
          </MessageContainer>
        ))}
        {isLoading && (
          <MessageContainer>
            <div style={{ marginRight: "12px", color: "#0fab3b" }}>Big G:</div>
            <div
              style={{
                textAlign: "left",
                whiteSpace: "pre-wrap",
                color: "#0fab3b",
              }}
            >
              {currentResponse}
            </div>
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
            disabled={isLoading}
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
