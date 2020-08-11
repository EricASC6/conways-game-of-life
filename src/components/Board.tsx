import React, { useState } from "react";
import Cell from "./Cell";

interface Props {
  rows: number;
  columns: number;
  cells: boolean[][];
}

const Board: React.FC<Props> = ({ rows, columns, cells }) => {
  if (rows !== columns)
    throw new Error("Rows have to equal to the number of columns");

  return <div>{renderCells(cells)}</div>;

  function renderCells(cells: boolean[][]): JSX.Element[] {
    const cellRows = cells[0].length;
    const cellCols = cells.length;

    const validDim: boolean = rows === cellRows && columns === cellCols;

    if (!validDim)
      throw new Error("Cell dimensions have to match the rows and columns");

    const cellElements = cells.map((row) => {
      const cellRow = row.map((c) => {
        return (
          <div className="mx-1 h-6" key={randomKey()}>
            <Cell alive={c} />
          </div>
        );
      });

      return (
        <div
          className="flex flex-row justify-center items-center my-2"
          key={randomKey()}
        >
          {cellRow}
        </div>
      );
    });

    return cellElements;
  }
};

function randomKey(): string {
  return (Math.random() * 10000).toString(10);
}

export default Board;
