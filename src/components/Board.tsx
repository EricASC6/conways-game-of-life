import React from "react";
import Cell from "./Cell";

interface Props {
  rows: number;
  columns: number;
  cells: boolean[][];
  onCellClick?: (position: Position) => void;
  onCellHover?: (position: Position) => void;
}

interface Position {
  x: number;
  y: number;
}

const Board: React.FC<Props> = ({
  rows,
  columns,
  cells,
  onCellClick = () => {},
  onCellHover = () => {},
}) => {
  if (rows !== columns)
    throw new Error("Rows have to equal to the number of columns");

  return <div>{renderCells(cells)}</div>;

  function renderCells(cells: boolean[][]): JSX.Element[] {
    const cellRows = cells[0].length;
    const cellCols = cells.length;

    const validDim: boolean = rows === cellRows && columns === cellCols;

    if (!validDim)
      throw new Error("Cell dimensions have to match the rows and columns");

    const cellElements = cells.map((row, y) => {
      const cellRow = row.map((c, x) => {
        return (
          <div className="mx-1 h-6" key={`${x}${y}`}>
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
          className="flex flex-row justify-center items-center my-2"
          key={`row${y}`}
        >
          {cellRow}
        </div>
      );
    });

    return cellElements;
  }
};

export default Board;
