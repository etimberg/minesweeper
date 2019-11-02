import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GameBoard = ({
  height,
  mineCount,
  width,
}) => {
  

  return (
    <div className="game-board">
      GAME goes here
    </div>
  );
};

GameBoard.propTypes = {
  height: PropTypes.number.isRequired,
  mineCount: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default GameBoard;