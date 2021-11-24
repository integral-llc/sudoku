import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useGameContext } from './Context/GameContext';
import { BoardComponent } from './BoardComponent';
import { GameLevel } from './Context/ContextTypes';

const StyledGame = styled.div`
  width: 100%;
  height: 100%;
  border: 3px #444 solid;
`;

const StyledGameLevel = styled.div<{ isLoading: boolean }>`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 110%;
    font-weight: bold;
  }

  h2 {
    font-size: 100%;
    color: gray;
    cursor: pointer;
    text-decoration: ${({isLoading}) => (isLoading ? 'line-through' : '')};
  }

  button {
    background: 0 0 !important;
    color: rgba(0, 0, 0, .6) !important;
    font-weight: 400;
    border-radius: 0.28571429rem;
    text-transform: none;
    text-shadow: none !important;
    box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset;
  }
`

const StyledStatus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledValidationStatus = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px 20px;
  align-items: center;

  h2 {
    font-size: 90%;
    color: lightgray;
    margin: 0 10px 0 0;
  }

  h3 {
    margin: 0;
    border-left: 1px solid lightgray;
    font-weight: bold;
    font-size: 90%;
    padding-left: 10px;
  }
`

const StyledDifficulty = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px 20px;
  align-items: center;

  h3 {
    font-size: 90%;
    color: lightgray;
    margin: 0 0 0 10px;
  }

  h2 {
    margin: 0;
    border-right: 1px solid lightgray;
    font-weight: bold;
    font-size: 90%;
    padding-right: 10px;
  }
`;

const StyledSolved = styled.div`
  margin-top: 15px;
  button {
    width: 100%;
    height: 28px;
  }
`

export const GameComponent = () => {
  const {setGameLevel, clear, isLoading, gameLevel, solvedStatus, solve} = useGameContext();

  const handleGameLevelChange = useCallback((level: GameLevel) => {
    if (isLoading) {
      return ;
    }

    setGameLevel(level);
  }, [isLoading, setGameLevel]);

  return (
    <StyledGame>
      <BoardComponent />
      <StyledGameLevel isLoading={isLoading}>
        <h1>Generate:</h1>
        <h2 onClick={() => handleGameLevelChange(GameLevel.easy)}>Easy</h2>
        <h2 onClick={() => handleGameLevelChange(GameLevel.medium)}>Medium</h2>
        <h2 onClick={() => handleGameLevelChange(GameLevel.hard)}>Hard</h2>
        <h2 onClick={() => handleGameLevelChange(GameLevel.random)}>Random</h2>
        <button onClick={() => clear()}>Clear</button>
      </StyledGameLevel>
      <StyledStatus>
        <StyledValidationStatus>
          <h2>Validate</h2>
          <h3>{solvedStatus}</h3>
        </StyledValidationStatus>
        <StyledDifficulty>
          <h2>{gameLevel}</h2>
          <h3>Difficulty</h3>
        </StyledDifficulty>
      </StyledStatus>
      <StyledSolved>
        <button onClick={() => solve()} disabled={isLoading}>Solve</button>
      </StyledSolved>
    </StyledGame>
  )
}
