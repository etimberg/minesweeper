import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { generateMineIndexes, getNearbyCount } from './mines';
import { indexToRowCol } from './utils';

import './GameBoard.css';

const GameBoard = ({
  height,
  mineCount,
  width,
}) => {
  // The indexes in the game board where mines are located
  const [mineIndexes, setMineIndexes] = useState(new Set());

  const initMines = () => {
    const mIndexes = generateMineIndexes(width, height, mineCount);
    setMineIndexes(new Set(mIndexes));
  };
  useEffect(initMines, [width, height, mineCount]);

  const indexes = [...Array(width * height).keys()];

  return (
    <div
      className="game-board"
      style={{
        height: `${height * 20}px`,
        width: `${width * 20}px`,
      }}
    >
      {indexes.map(i => {
        const [row, column] = indexToRowCol(i, width);
        let cellContent = '';

        if (mineIndexes.has(i)) {
          cellContent = '💣';
        } else {
          const nearbyCount = getNearbyCount(i, width, mineIndexes);
          cellContent = nearbyCount !== 0 ? nearbyCount : '';
        }
        return (
          <div
            className="tile"
            key={`tile-${row}-${column}`}
            style={{
              gridColumnStart: column + 1,
              gridColumnEnd: column + 2,
              gridRowStart: row + 1,
              gridRowEnd: row + 2,
            }}
          >
            {cellContent}
          </div>
        );
      })}
    </div>
  );
};

GameBoard.propTypes = {
  height: PropTypes.number.isRequired,
  mineCount: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default GameBoard;