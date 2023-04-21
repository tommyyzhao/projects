import { green } from "@/styles/colors";
import styled from "styled-components";
import useCells from "./hooks/useCells";
import Cell from "./Cell";

const GameBoard = () => {
  const { cells, addTowerToCell, removeTowerFromCell } = useCells();

  return (
    <Container>
      {cells.map((cellRow, rowIndex) => (
        <CellRow key={`cellRow-${rowIndex}`}>
          {cellRow.map((cell, cellIndex) => (
            <Cell cell={cell} key={`cell-${rowIndex}-${cellIndex}`} />
          ))}
        </CellRow>
      ))}
    </Container>
  );
};

export default GameBoard;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${green};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CellRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
