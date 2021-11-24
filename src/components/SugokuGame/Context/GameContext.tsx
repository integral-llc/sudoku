import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ContextType,
  GameLevel,
  SolutionAnswerType,
  SolvedStatus,
  SudokuApiUrl
} from './ContextTypes';
import { createEmptyBoard, setBoardValues, solveSudokuLocal } from './Helpers';

export const GameContext = createContext<ContextType>({} as ContextType);

const BoardSize = 9;

export const GameContextProvider = ({children}: { children: React.ReactNode }) => {
  const [gameLevel, setGameLevel] = useState(GameLevel.easy);
  const [board, setBoard] = useState(createEmptyBoard(BoardSize));
  const [isLoading, setIsLoading] = useState(true);
  const [loadNewGame, setLoadNewGame] = useState(true);
  const [solvedStatus, setSolvedStatus] = useState(SolvedStatus.unsolved);

  const setCellValue = (row: number, col: number, value: number): void => {
    board[row][col] = value;
    setBoard([...board]);
    console.log(222, row, col, value)
  }

  const _setGameLevel = (newLevel: GameLevel) => {
    setLoadNewGame(true);
    setGameLevel(newLevel);
    setSolvedStatus(SolvedStatus.unsolved);
  }

  const clear = () => {
    setBoard(createEmptyBoard(BoardSize));
    setSolvedStatus(SolvedStatus.unsolved);
  }

  const solve = () => {
    setIsLoading(true);
    solveSudokuLocal(board)
      .then((solution: SolutionAnswerType) => {
        setSolvedStatus(solution.status);
        if (solution.status === SolvedStatus.solved) {
          setBoard(solution.solution);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!loadNewGame) {
      return;
    }

    setIsLoading(true);
    const url = `${SudokuApiUrl}${gameLevel}`;
    fetch(url)
      .then(result => result.json())
      .then(json => {
        const {puzzle} = json;
        setBoard(setBoardValues(createEmptyBoard(BoardSize), puzzle));
      })
      .finally(() => {
        setIsLoading(false);
        setLoadNewGame(false);
      });
  }, [gameLevel, loadNewGame]);

  const value: ContextType = {
    gameLevel,
    board,
    setCellValue,
    setGameLevel: _setGameLevel,
    isLoading,
    solvedStatus,
    clear,
    solve
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = (): ContextType => useContext<ContextType>(GameContext);
