import React, { useState } from "react";
import Board from "./Board";
import Button from "./Button";
import { useConwaysGameOfLife } from "../hooks/game";
import Selector from "./Selector";

interface Props {}

const DIMENSIONS = 15;
const SIZE_SELECTIONS: [string, number][] = [
  ["5 x 5", 5],
  ["10 x 10", 10],
  ["12 x 12", 12],
  ["15 x 15", 15],
  ["20 x 20", 20],
];

const SPEED_SELECTIONS: [string, number][] = [
  ["0.25x", 1.25],
  ["0.5x", 1.5],
  ["0.75x", 1.75],
  ["1.0x", 1],
  ["1.25x", 0.8],
  ["1.5x", 1.66],
  ["2.0x", 0.5],
];

const GameBoard: React.FC<Props> = () => {
  const {
    running,
    cells,
    generations,
    run,
    stop,
    toggleCell,
    reset,
    size,
    setSize,
    speed,
    setSpeed,
  } = useConwaysGameOfLife({
    boardSize: DIMENSIONS,
  });
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  return (
    <div>
      <div
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      >
        <Board
          cells={cells}
          onCellClick={(position) => toggleCell(position)}
          onCellHover={(position) => {
            if (mouseDown) toggleCell(position);
          }}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-black text-lg mb-2 font-medium">
          Generations:{" "}
          <span className="text-teal-400 font-bold">{generations}</span>
        </h2>
        <div className="my-2">
          <h2 className="text-black text-lg mb-2 font-medium">Board Size</h2>
          <Selector
            activeValue={size}
            selections={SIZE_SELECTIONS}
            onSelect={(size) => setSize(size as number)}
          />
        </div>

        <div className="mb-2">
          <h2 className="text-black text-lg mb-2 font-medium">Speed</h2>
          <Selector
            activeValue={speed}
            selections={SPEED_SELECTIONS}
            onSelect={(size) => setSpeed(size as number)}
          />
        </div>
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
