import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  floodFillMap,
  generateMineIndexes,
  getNearbyCount
} from './mines';
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

  // The indexes in the game boad that have been revealed
  const [revealedIndexes, setRevealedIndexes] = useState(new Set());

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
        const nearbyCount = indexToNearbyCount[i];
        const [row, column] = indexToRowCol(i, width);
        let cellContent = '';

        if (revealedIndexes.has(i)) {
          if (mineIndexes.has(i)) {
            cellContent = '💣';
          } else {
            cellContent = nearbyCount !== 0 ? nearbyCount : '';
          }
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
              backgroundColor: revealedIndexes.has(i) ? 'white' : 'grey',
            }}
            onClick={() => {
              if (mineIndexes.has(i)) {
                // LOSE
              } else {
                let updatedIndexes;

                if (nearbyCount === 0) {
                  // Clicked on an empty space. Need to flood fill
                  const filled = floodFillMap(i, width, height, indexToNearbyCount);
                  updatedIndexes = new Set([...revealedIndexes, ...filled]);
                } else {
                  // Clicked on a number. Just reveal that space
                  updatedIndexes = new Set([...revealedIndexes, i]);
                }

                setRevealedIndexes(updatedIndexes);
              }
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