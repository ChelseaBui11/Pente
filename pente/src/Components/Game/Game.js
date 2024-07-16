import React, { useState } from 'react';
import Board from '../Board/Board.js';
import PlayerInput from '../PlayerInput/PlayerInput.js';
import Alerts from '../Alerts/Alerts.js';

function Game() {
    const [board, setBoard] = useState(Array(19 * 19).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [players, setPlayers] = useState({ playerX: 'Player X', playerO: 'Player O' });
    const [capturedPieces, setCapturedPieces] = useState({ X: 0, O: 0 });
    const [alerts, setAlerts] = useState([]);

    const handleClick = (i) => {
        const newBoard = board.slice();
        if (newBoard[i] || calculateWinner(newBoard)) {
            return;
        }
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const calculateWinner = (board) => {
        // Implement the logic to calculate the winner
        return null;
    };

    const handlePlayerNames = (playerX, playerO) => {
        setPlayers({ playerX, playerO });
    };

    return (
        <div className="game">
            <PlayerInput onSetNames={handlePlayerNames} />
            <Board squares={board} onClick={handleClick} />
            <Alerts alerts={alerts} capturedPieces={capturedPieces} />
        </div>
    );
}

export default Game;
