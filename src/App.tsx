import React from 'react';
import styled from 'styled-components';
import SudokuGame from './components/SugokuGame';

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledGameContainer = styled.div`
  padding-top: 50px;
  width: 450px;
  height: 450px;
`

function App() {
  return (
    <StyledApp>
      <StyledGameContainer>
        <SudokuGame />
      </StyledGameContainer>
    </StyledApp>
  );
}

export default App;
