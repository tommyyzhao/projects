import type { Cell as CellData } from "@/models/TowerDefense/Cell";
import styled from "styled-components";

type Props = {
  cell: CellData;
};

const Cell = ({ cell }: Props) => {
  return (
    <CellContainer>
      <CellItem />
    </CellContainer>
  );
};

export default Cell;

const CellContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 2px solid gray;

  &:before {
    content: "";
    display: table;
    padding-top: 100%;
  }
`;

const CellItem = styled.div`
  flex-grow: 1;
  border: 1px solid black;
  background: tomato;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;
