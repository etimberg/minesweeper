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
  const indexes = [...Array(width * height).keys()];
  
  // The indexes in the game board where mines are located
  const [mineIndexes, setMineIndexes] = useState(new Set());

  // The map of index -> count of nearby mines for rendering & flood fill
  const [indexToNearbyCount, setIndexToNearbyCount] = useState([]);

  const initMines = () => {
    const mIndexes = new Set(generateMineIndexes(width, height, mineCount));
    const indexToCnt = indexes.map(i => {
      if (mIndexes.has(i)) {
        return -1;
      }
      return getNearbyCount(i, width, mIndexes);
    });

    setMineIndexes(mIndexes);
    setIndexToNearbyCount(indexToCnt);
  };
  useEffect(initMines, [width, height, mineCount]);

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
          const nearbyCount = indexToNearbyCount[i];
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