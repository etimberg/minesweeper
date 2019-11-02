import React from 'react';
import GameBoard from './GameBoard';

import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Welcome to Minesweeper</h2>
      <GameBoard
        height={9}
        mineCount={10}
        width={9}
      />
    </div>
  );
}

export default App;
