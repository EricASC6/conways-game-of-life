const generateCells = (dimensions: number): boolean[][] => {
  const board = [];
  const ALIVE_PROBABILITY = 0.2;

  for (let i = 0; i < dimensions; i++) {
    const row = [];
    for (let j = 0; j < dimensions; j++) {
      const cellState: boolean = Math.random() <= ALIVE_PROBABILITY;
      row.push(cellState);
    }

    board.push(row);
  }

  return board;
};

interface Position {
  x: number;
  y: number;
}

const toggleCell = (board: boolean[][], position: Position): boolean[][] => {
  const newBoard = [...board];
  const { x, y } = position;

  const rows: number = board[0].length;
  const cols: number = board.length;
  const validPosition: boolean = x <= cols - 1 && y <= rows - 1;

  if (!validPosition) throw new Error("Position index out of bounds");

  newBoard[y][x] = !newBoard[y][x];

  return newBoard;
};

export const boardService = {
  generateCells,
  toggleCell,
};
