import React from 'react';
import styled from 'styled-components';
import { useGameContext } from './Context/GameContext';

const StyledCell = styled.div`
  input {
    margin: 0;
    padding: 0;
    border-collapse: collapse;
    box-sizing: border-box;
    font-size: 3em;
    text-align: center;
    border: 1px solid #444;
    width: 50px;
    height: 50px;
    min-height: 0;
    min-width: 0;
    display: inline-block;
    
    :focus {
      outline: 0;
      background: #abf;
    }
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

export type CellComponentProps = {
  row: number;
  col: number;
}

export const CellComponent = ({row, col}: CellComponentProps) => {
  const {board, setCellValue, isLoading} = useGameContext();

  const handleOnChange = ({target}: { target: HTMLInputElement }) => {
    const {value} = target;
    if (value.length <= 1) {
      setCellValue(row, col, +value);
    }
  }

  return (
    <StyledCell>
      <input type="number" maxLength={1} value={board[row][col] || ''}
             min={1} max={9}
             disabled={isLoading}
             onChange={e => handleOnChange(e)} />
    </StyledCell>
  );
}
