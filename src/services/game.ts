interface Position {
  x: number;
  y: number;
}

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

const toggleCell = (board: boolean[][], position: Position): boolean[][] => {
  const newBoard = [...board];
  const { x, y } = position;

  const rows = board.length;
  const cols = board[0].length;
  const validPosition: boolean = isValidPositionOnBoard(rows, cols, position);

  if (!validPosition) throw new Error("Position index out of bounds");

  newBoard[y][x] = !newBoard[y][x];

  return newBoard;
};

const generateNextTick = (board: boolean[][]): boolean[][] => {
  if (board.length === 0) throw new Error("Invalid Board Size");

  const newBoard: boolean[][] = [];

  const ROWS = board.length;
  const COLS = board[0].length;

  for (let i = 0; i < ROWS; i++) {
    const row = [];
    for (let j = 0; j < COLS; j++) {
      const currentCellState: boolean = board[i][j];
      let cellState: boolean;
      let aliveNeighbors: number = getNumAliveNeighbors(board, { x: j, y: i });

      if (aliveNeighbors < 2 && currentCellState) cellState = false;
      else if (aliveNeighbors === 3 && currentCellState) cellState = true;
      else if (aliveNeighbors > 3 && currentCellState) cellState = false;
      else if (aliveNeighbors === 3 && !currentCellState) cellState = true;
      else cellState = false;

      row.push(cellState);
    }

    newBoard.push(row);
  }
  return newBoard;
};

function isValidPositionOnBoard(
  rows: number,
  cols: number,
  { x, y }: Position
): boolean {
  const validPosition: boolean = 0 <= x && x < cols && 0 <= y && y < rows;

  return validPosition;
}

function getNumAliveNeighbors(board: boolean[][], position: Position): number {
  const rows = board.length;
  const cols = board[0].length;
  const validPosition: boolean = isValidPositionOnBoard(rows, cols, position);

  if (!validPosition) throw new Error("Position index out of bounds");

  let aliveNeigbors: number = 0;

  const neighborPositions: Position[] = getNeighborPositions(
    rows,
    cols,
    position
  );

  for (const neighbor of neighborPositions) {
    const cellState: boolean = board[neighbor.y][neighbor.x];

    if (cellState) aliveNeigbors++;
  }

  return aliveNeigbors;
}

function getNeighborPositions(
  rows: number,
  cols: number,
  { x, y }: Position
): Position[] {
  const neighborPositions: Position[] = [];

  let possiblePos: Position[] = [
    { x: x - 1, y: y + 1 },
    { x, y: y + 1 },
    { x: x + 1, y: y + 1 },
    { x: x + 1, y },
    { x: x + 1, y: y - 1 },
    { x, y: y - 1 },
    { x: x - 1, y: y - 1 },
    { x: x - 1, y },
  ];

  for (const pos of possiblePos) {
    const validPos: boolean = isValidPositionOnBoard(rows, cols, pos);

    if (validPos) neighborPositions.push(pos);
  }

  return neighborPositions;
}

export const gameService = {
  generateCells,
  toggleCell,
  generateNextTick,
};
