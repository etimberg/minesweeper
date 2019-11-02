import React from 'react';
import GameBoard from './GameBoard';

import './App.css';

function App() {
  return (
    <div className="App">
      <GameBoard
        height={9}
        mineCount={10}
        width={9}
      />
    </div>
  );
}

export default App;
