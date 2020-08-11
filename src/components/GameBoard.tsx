import React, { useState } from "react";
import Board from "./Board";
import Button from "./Button";
import { boardService } from "../services/board";

interface Props {}

const DIMENSIONS = 8;
const boardCells = boardService.generateCells(DIMENSIONS);

const GameBoard: React.FC<Props> = () => {
  const [cells, setCells] = useState<boolean[][]>(boardCells);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  console.log("rerender");

  return (
    <div>
      <div
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      >
        <Board
          cells={cells}
          rows={DIMENSIONS}
          columns={DIMENSIONS}
          onCellClick={({ x, y }) => {
            setCells(boardService.toggleCell(cells, { x, y }));
          }}
          onCellHover={({ x, y }) => {
            if (mouseDown) setCells(boardService.toggleCell(cells, { x, y }));
          }}
        />
      </div>

      <div className="flex justify-center spacing mt-6">
        <Button>Play</Button>
        <Button
          borderWidth="2"
          borderColor="gray-200"
          color="red-600"
          bg="white"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default GameBoard;
