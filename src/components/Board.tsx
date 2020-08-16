import React from "react";
import Cell from "./Cell";

interface Props {
  cells: boolean[][];
  onCellClick?: (position: Position) => void;
  onCellHover?: (position: Position) => void;
}

interface Position {
  x: number;
  y: number;
}

const Board: React.FC<Props> = ({
  cells,
  onCellClick = () => {},
  onCellHover = () => {},
}) => {
  const rows = cells.length;
  const cols = cells[0].length;

  if (rows !== cols)
    throw new Error("Rows have to equal to the number of columns");

  return (
    <div className="flex justify-center align-center flex-col max-w-2xl">
      {renderCells(cells)}
    </div>
  );

  function renderCells(cells: boolean[][]): JSX.Element[] {
    const cellElements = cells.map((row, y) => {
      const cellRow = row.map((c, x) => {
        return (
          <div className="mx-1" key={`${x}${y}`}>
            <Cell
              alive={c}
              onClick={() => onCellClick({ x, y })}
              onHover={() => onCellHover({ x, y })}
            />
          </div>
        );
      });

      return (
        <div
          className="flex flex-row justify-center items-center my-1"
          key={`row${y}`}
          style={{ minWidth: "auto" }}
        >
          {cellRow}
        </div>
      );
    });

    return cellElements;
  }
};

export default Board;
