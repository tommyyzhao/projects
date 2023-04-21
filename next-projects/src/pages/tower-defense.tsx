import Navbar from "@/components/Navbar";
import styled from "styled-components";
import Gameboard from "@/components/TowerDefense/Gameboard";
import BuyAndSell from "@/components/TowerDefense/BuyAndSell";

const TowerDefensePage = () => {
  return (
    <Page>
      <Navbar />
      <Container>
        <Gameboard />
        <BuyAndSell />
      </Container>
    </Page>
  );
};

export default TowerDefensePage;

const Page = styled.div`
  height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 48px);
`;
