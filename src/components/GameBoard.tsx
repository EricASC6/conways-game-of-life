import React, { useState } from "react";
import Board from "./Board";
import Button from "./Button";
import { useConwaysGameOfLife } from "../hooks/game";

interface Props {}

const DIMENSIONS = 15;

const GameBoard: React.FC<Props> = () => {
  const {
    running,
    cells,
    generations,
    run,
    stop,
    toggleCell,
    reset,
  } = useConwaysGameOfLife({
    boardSize: DIMENSIONS,
  });
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  return (
    <div>
      <h2>generations: {generations}</h2>

      <div
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      >
        <Board
          cells={cells}
          rows={DIMENSIONS}
          columns={DIMENSIONS}
          onCellClick={(position) => toggleCell(position)}
          onCellHover={(position) => {
            if (mouseDown) toggleCell(position);
          }}
        />
      </div>

      <div className="flex justify-center spacing mt-6">
        <Button
          onClick={() => {
            if (running) stop();
            else run();
          }}
        >
          {running ? "Pause" : "Play"}
        </Button>
        <Button
          borderWidth="2"
          borderColor="gray-200"
          color="red-600"
          bg="white"
          onClick={reset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default GameBoard;
