import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
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
  
  const [gameRunning, setGameRunning] = useState(false);
  const [gameExitMessage, setGameExitMessage] = useState(null);

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
      return getNearbyCount(i, width, height, mIndexes);
    });

    setMineIndexes(mIndexes);
    setIndexToNearbyCount(indexToCnt);
    setGameRunning(false);
    setRevealedIndexes(new Set());
    setGameExitMessage(null);
  };
  useEffect(initMines, [width, height, mineCount]);

  if (indexes.length - revealedIndexes.size === mineCount && gameRunning) {
    // There are only mines left to reveal.
    setGameRunning(false);
    setGameExitMessage('Congratulations!!!');
  }

  return (
    <div className="game">
      <button
        className="restart-button"
        onClick={() => {
          initMines();
        }}
      >
        Restart
      </button>
      {gameExitMessage && (
        <div className="exit-message">{gameExitMessage}</div>
      )}
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
              className={classNames({
                tile: true,
                'tile-revealed': revealedIndexes.has(i),
                [`tile-${nearbyCount}`]: true,
              })}
              key={`tile-${row}-${column}`}
              style={{
                gridColumnStart: column + 1,
                gridColumnEnd: column + 2,
                gridRowStart: row + 1,
                gridRowEnd: row + 2,
              }}
              onClick={() => {
                let updatedIndexes;

                if (gameExitMessage) {
                  // The game exited for some reason
                  return;
                }

                setGameRunning(true);

                if (nearbyCount === 0) {
                  // Clicked on an empty space. Need to flood fill
                  const filled = floodFillMap(i, width, height, indexToNearbyCount);
                  updatedIndexes = new Set([...revealedIndexes, ...filled]);
                } else {
                  // Clicked on a number. Just reveal that space
                  updatedIndexes = new Set([...revealedIndexes, i]);
                }

                if (mineIndexes.has(i)) {
                  // LOSE condition. Reveal all mines & exit
                  updatedIndexes = new Set([...updatedIndexes, ...mineIndexes]);
                  setGameRunning(false);
                  setGameExitMessage('Oh no! Better luck next time');
                }

                setRevealedIndexes(updatedIndexes);
              }}
            >
              {cellContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};

GameBoard.propTypes = {
  height: PropTypes.number.isRequired,
  mineCount: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default GameBoard;