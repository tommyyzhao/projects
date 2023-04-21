import { Cell } from "@/models/TowerDefense/Cell";
import { Tower } from "@/models/TowerDefense/Tower";
import { useState } from "react";

const useCells = () => {
  const [cells, setCells] = useState<Cell[][]>(getDefaultCells());

  const isValidTowerPlacement = (row: number, col: number) =>
    cells[row][col].type === "placement" && !cells[row][col].tower;

  const addTowerToCell = ({
    row,
    col,
    tower,
  }: {
    row: number;
    col: number;
    tower: Tower;
  }) => {
    // check for valid tower placement
    if (isValidTowerPlacement(row, col)) {
      setCells((prevCells) => {
        const newCells: Cell[][] = JSON.parse(JSON.stringify(prevCells));
        newCells[row][col].tower = tower;
        return newCells;
      });
    }
  };

  const removeTowerFromCell = ({ row, col }: { row: number; col: number }) => {
    // make sure cell is a placement
    if (cells[row][col].type === "placement") {
      setCells((prevCells) => {
        const newCells: Cell[][] = JSON.parse(JSON.stringify(prevCells));
        newCells[row][col].tower = undefined;
        return newCells;
      });
    }
  };

  return {
    cells,
    addTowerToCell,
    removeTowerFromCell,
  };
};

export default useCells;

const getDefaultCells = () => {
  const defaultCell: Cell = {
    imageSrc: "",
    type: "obstacle",
  };

  return [
    Array.apply(null, Array(10)).map(() => defaultCell),
    Array.apply(null, Array(10)).map(() => defaultCell),
    Array.apply(null, Array(10)).map(() => defaultCell),
    Array.apply(null, Array(10)).map(() => defaultCell),
    Array.apply(null, Array(10)).map(() => defaultCell),
    Array.apply(null, Array(10)).map(() => defaultCell),
  ];
};
