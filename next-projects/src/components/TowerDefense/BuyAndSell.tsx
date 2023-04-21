import { brown, darkBrown } from "@/styles/colors";
import styled from "styled-components";

const BuyAndSell = () => {
  return <Container />;
};

export default BuyAndSell;

const Container = styled.div`
  width: 300px;
  height: 100%;
  background: ${brown};
  border: 5px solid ${darkBrown};
`;
