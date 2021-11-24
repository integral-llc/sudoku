export const SudokuApiUrl = 'https://vast-chamber-17969.herokuapp.com/generate?difficulty=';

export enum GameLevel {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  random = 'random'
}

export enum SolvedStatus {
  unsolved = 'unsolved',
  solved = 'solved',
  unsolvable = 'unsolvable',
  broken = 'broken'
}

export type ContextType = {
  isLoading: boolean;
  solvedStatus: SolvedStatus;
  gameLevel: GameLevel;
  board: SimpleBoard;
  setCellValue: (row: number, col: number, value: number) => void;
  setGameLevel: (newLevel: GameLevel) => void;
  clear: () => void;
  solve: () => void;
};


export type InitialBoardStateType = { [key: string]: string };

export type SimpleBoard = ReadonlyArray<Array<number>>;

export type SolutionAnswerType = {
  difficulty: string;
  status: SolvedStatus;
  solution: SimpleBoard;
}

