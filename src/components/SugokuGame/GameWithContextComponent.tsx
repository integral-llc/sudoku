import { GameContextProvider } from './Context/GameContext';
import { GameComponent } from './GameComponent';

export const GameWithContextComponent = () => {
  return (
    <GameContextProvider>
      <GameComponent />
    </GameContextProvider>
  )
}
