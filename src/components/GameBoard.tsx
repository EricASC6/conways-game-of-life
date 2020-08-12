import React, { useState, useEffect } from "react";
import Board from "./Board";
import Button from "./Button";
import { gameService } from "../services/game";

interface Props {}

const DIMENSIONS = 15;

const boardCells = gameService.generateCells(DIMENSIONS);

const GameBoard: React.FC<Props> = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [cells, setCells] = useState<boolean[][]>(boardCells);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  useEffect(() => {
    let tickInterval;

    if (isRunning) {
      tickInterval = null;

      tickInterval = setInterval(() => {
        setCells((prevCells) => gameService.generateNextTick(prevCells));
      }, 500);
    } else clearInterval(tickInterval);
  }, [isRunning]);

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
            setCells(gameService.toggleCell(cells, { x, y }));
          }}
          onCellHover={({ x, y }) => {
            if (mouseDown) setCells(gameService.toggleCell(cells, { x, y }));
          }}
        />
      </div>

      <div className="flex justify-center spacing mt-6">
        <Button
          onClick={() => {
            setIsRunning(!isRunning);
          }}
        >
          {isRunning ? "Pause" : "Play"}
        </Button>
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
