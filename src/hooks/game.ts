import { useState, useEffect } from "react";
import { gameService } from "../services/game";

interface GameOfLifeConfigs {
  boardSize?: number;
  speed?: number;
}

interface Position {
  x: number;
  y: number;
}

const useGameConfig = ({
  boardSize = 10,
  speed: gameSpeed = 1,
}: GameOfLifeConfigs) => {
  const [size, setSize] = useState<number>(boardSize);
  const [speed, setSpeed] = useState<number>(gameSpeed);

  return { size, setSize, speed, setSpeed };
};

let tickInterval: number;
const BASE_SPEED = 500;

export const useConwaysGameOfLife = (configs: GameOfLifeConfigs = {}) => {
  const configState = useGameConfig(configs);

  const initCells = gameService.generateCells(configState.size);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [cells, setCells] = useState<boolean[][]>(initCells);
  const [generations, setGenerations] = useState<number>(0);

  useEffect(() => {
    if (isRunning) {
      window.clearInterval(tickInterval);

      tickInterval = window.setInterval(() => {
        setCells((prevCells) => {
          const allDead: boolean = gameService.isAllDead(prevCells);
          if (allDead) stop();

          return gameService.generateNextTick(prevCells);
        });
        setGenerations((prevGeneration) => prevGeneration + 1);
      }, BASE_SPEED * configState.speed);
    } else window.clearInterval(tickInterval);

    return () => window.clearInterval(tickInterval);
  }, [isRunning, configState.speed]);

  useEffect(() => {
    setCells(gameService.generateCells(configState.size));
  }, [configState.size]);

  const run = () => setIsRunning(true);

  const stop = () => setIsRunning(false);

  const toggleCell = (position: Position) => {
    const newBoard = gameService.toggleCell(cells, position);
    setCells(newBoard);
  };

  const reset = () => {
    stop();
    setGenerations(0);
    setCells(gameService.generateCells(configState.size));
  };

  return {
    running: isRunning,
    cells,
    generations,
    run,
    stop,
    toggleCell,
    reset,
    ...configState,
  };
};
