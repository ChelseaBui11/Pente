import React from 'react';
import Square from '../Square/Square';

function Board({ squares, onClick }) {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  const boardSize = 19;
  const board = Array(boardSize).fill(null).map((_, row) => (
    <div className="board-row" key={row}>
      {Array(boardSize).fill(null).map((_, col) => renderSquare(row * boardSize + col))}
    </div>
  ));

  return <div>{board}</div>;
}

export default Board;
