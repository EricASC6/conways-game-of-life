import { useState, useEffect } from "react";
import { gameService } from "../services/game";

interface GameOfLifeConfigs {
  boardSize?: number;
}

interface Position {
  x: number;
  y: number;
}

let tickInterval: number;
export const useConwaysGameOfLife = ({
  boardSize = 10,
}: GameOfLifeConfigs = {}) => {
  const initCells = gameService.generateCells(boardSize);

  const [size] = useState<number>(boardSize);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [cells, setCells] = useState<boolean[][]>(initCells);
  const [generations, setGenerations] = useState<number>(0);

  useEffect(() => {
    if (isRunning) {
      window.clearInterval(tickInterval);

      tickInterval = window.setInterval(() => {
        setCells((prevCells) => gameService.generateNextTick(prevCells));
        setGenerations((prevGeneration) => prevGeneration + 1);
      }, 500);
    } else window.clearInterval(tickInterval);

    return () => window.clearInterval(tickInterval);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      const allDead: boolean = gameService.isAllDead(cells);
      if (allDead) stop();
    }
  }, [isRunning, cells]);

  const run = () => setIsRunning(true);

  const stop = () => setIsRunning(false);

  const toggleCell = (position: Position) => {
    const newBoard = gameService.toggleCell(cells, position);
    setCells(newBoard);
  };

  const reset = () => {
    stop();
    setCells(gameService.generateCells(size));
  };

  return {
    running: isRunning,
    cells,
    generations,
    run,
    stop,
    toggleCell,
    reset,
  };
};
