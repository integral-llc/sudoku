import React from 'react';
import styled from 'styled-components';
import { useGameContext } from './Context/GameContext';
import { CellComponent } from './CellComponent';

const StyledBoard = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const StyledBoardRow = styled.div`
  display: flex;
  flex-direction: row;
`


export const BoardComponent = () => {
  const {board} = useGameContext();

  return (
    <StyledBoard>
      {board.map((row, rowIndex) => {
        return (
          <StyledBoardRow key={rowIndex}>
            {row.map((_, colIndex) => {
              return <CellComponent row={rowIndex} col={colIndex} key={`${rowIndex}-${colIndex}`}/>
            })
            }
          </StyledBoardRow>
        )
      })}
    </StyledBoard>
  )
}
