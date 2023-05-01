import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Chatbot = () => {
  const [history, setHistory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const newMessage = async (turn: number) => {
    setIsLoading(true);
    const response = await axios.get(
      `/api/hello?turn=${turn}&history=${history}`
    );
    setHistory(
      (prevHistory) =>
        `${prevHistory}\n ${
          turn
            ? `He says: ${response.data.data}`
            : `She says: ${response.data.data}`
        }`
    );
    setIsLoading(false);
  };

  return (
    <Container>
      <ButtonContainer>
        <button onClick={() => newMessage(0)}>Girl Responds</button>
        <button onClick={() => newMessage(1)}>Boy Responds</button>
      </ButtonContainer>
      <Response>
        {history.split("\n").map((x, i) => (
          <div key={`message-${i}`}>{x}</div>
        ))}
      </Response>
      {isLoading && "Loading..."}
    </Container>
  );
};

export default Chatbot;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  column-gap: 24px;
`;

const Response = styled.div`
  border: 1px solid white;
  border-radius: 16px;
  text-align: center;
  padding: 48px;
  white-space: wrap;
`;
