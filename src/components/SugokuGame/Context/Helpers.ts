import { InitialBoardStateType, SimpleBoard, SolutionAnswerType, SolvedStatus } from './ContextTypes';

export const setBoardValues = (board: SimpleBoard, boardState: InitialBoardStateType) => {
  for (const key in boardState) {
    const coords = key.split('');
    const row = coords[0].charCodeAt(0) - 'A'.charCodeAt(0);
    const col = parseInt(coords[1]) - 1;
    board[row][col] = parseInt(boardState[key]);
  }

  return board;
}

export const createEmptyBoard = (size: number): SimpleBoard => {
  const res = [];
  for (let i = 0; i < size; i++) {
    res.push(Array(size).fill(0))
  }

  return res;
}

export const solveSudokuLocal = (board: SimpleBoard): Promise<SolutionAnswerType> => {
  const boardString: Array<string> = [];

  for (const row of board) {
    for (const col of row) {
      boardString.push(col ? col.toString() : '.');
    }
  }

  // @ts-ignore
  let res = sudoku.solve(boardString.join('')) as string | boolean;
  const newBoard: Array<Array<number>> = [];
  if (res) {
    res = res as string;

    for (let row = 0; row < 9; row++) {
      newBoard.push([]);
      for (let col = 0; col < 9; col++) {
        const index = row * 9 + col;
        newBoard[row].push(parseInt(res[index]));
      }
    }
  }

  return Promise.resolve({
    status: res ? SolvedStatus.solved : SolvedStatus.unsolved,
    solution: newBoard,
    difficulty: ''
  } as SolutionAnswerType);
}
