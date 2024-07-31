import React, { useState, useEffect } from 'react';
import Board from '../Board/Board.js';
import PlayerInput from '../PlayerInput/PlayerInput.js';
import Alerts from '../Alerts/Alerts.js';

function Game() {
    const boardSize = 19;
    const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [players, setPlayers] = useState({ playerX: 'Player X', playerO: 'Player O' });
    const [capturedPieces, setCapturedPieces] = useState({ X: 0, O: 0 });
    const [alerts, setAlerts] = useState([]);
    const [turnTimer, setTurnTimer] = useState(30);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        if (turnTimer > 0) {
            const timer = setInterval(() => {
                setTurnTimer(turnTimer - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            handleTurnTimeout();
        }
    }, [turnTimer]);

    const handleClick = (i) => {
        if (board[i] || winner || turnTimer <= 0) {
            return;
        }

        const newBoard = board.slice();
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
        setTurnTimer(30);

        const newAlerts = [...alerts];
        if (checkWinCondition(newBoard, i)) {
            setWinner(xIsNext ? players.playerX : players.playerO);
            newAlerts.push(`${xIsNext ? players.playerX : players.playerO} wins!`);
        } else {
            checkCaptures(newBoard, i, newAlerts);
            checkPatterns(newBoard, i, newAlerts);
        }
        setAlerts(newAlerts);
    };

    const checkWinCondition = (board, index) => {
        const player = board[index];
        const directions = [
            [1, 0], [0, 1], [1, 1], [1, -1]
        ];

        const countInDirection = (xStep, yStep) => {
            let count = 0;
            let x = index % boardSize;
            let y = Math.floor(index / boardSize);

            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[y * boardSize + x] === player) {
                count++;
                x += xStep;
                y += yStep;
            }
            return count;
        };

        for (let [xStep, yStep] of directions) {
            const totalCount = countInDirection(xStep, yStep) + countInDirection(-xStep, -yStep) - 1;
            if (totalCount >= 5) {
                return true;
            }
        }
        return false;
    };

    const checkPatterns = (board, index, alerts) => {
        const player = board[index];
        const directions = [
            [1, 0], [0, 1], [1, 1], [1, -1]
        ];

        const countInDirection = (xStep, yStep) => {
            let count = 0;
            let x = index % boardSize;
            let y = Math.floor(index / boardSize);

            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[y * boardSize + x] === player) {
                count++;
                x += xStep;
                y += yStep;
            }
            return count;
        };

        for (let [xStep, yStep] of directions) {
            const totalCount = countInDirection(xStep, yStep) + countInDirection(-xStep, -yStep) - 1;
            if (totalCount === 3) {
                alerts.push(`${player} has a Tria!`);
            } else if (totalCount === 4) {
                alerts.push(`${player} has a Tessera!`);
            }
        }
    };

    const checkCaptures = (board, index, alerts) => {
        const player = board[index];
        const opponent = player === 'X' ? 'O' : 'X';
        const directions = [
            [1, 0], [0, 1], [1, 1], [1, -1]
        ];

        directions.forEach(([xStep, yStep]) => {
            const captureCheck = (x, y) => {
                const pos1 = (y + yStep) * boardSize + (x + xStep);
                const pos2 = (y + 2 * yStep) * boardSize + (x + 2 * xStep);
                const pos3 = (y + 3 * yStep) * boardSize + (x + 3 * xStep);
                if (
                    board[pos1] === opponent &&
                    board[pos2] === opponent &&
                    board[pos3] === player
                ) {
                    return [pos1, pos2];
                }
                return null;
            };

            const captures = captureCheck(index % boardSize, Math.floor(index / boardSize));
            if (captures) {
                captures.forEach(pos => board[pos] = null);
                setCapturedPieces(prev => ({ ...prev, [player]: prev[player] + 2 }));
                alerts.push(`Player ${player} captured two pieces!`);
            }
        });
    };

    const handlePlayerNames = (playerX, playerO) => {
        setPlayers({ playerX, playerO });
    };

    const handleTurnTimeout = () => {
        if (!winner) {
            setXIsNext(!xIsNext);
            setTurnTimer(30);
            setAlerts([...alerts, `${xIsNext ? players.playerX : players.playerO} forfeited their turn!`]);
        }
    };

    const startNewGame = () => {
        setBoard(Array(boardSize * boardSize).fill(null));
        setXIsNext(true);
        setCapturedPieces({ X: 0, O: 0 });
        setAlerts([]);
        setTurnTimer(30);
        setWinner(null);
    };

    return (
        <div className="game">
            <PlayerInput onSetNames={handlePlayerNames} />
            <Board squares={board} onClick={handleClick} />
            <Alerts alerts={alerts} capturedPieces={capturedPieces} />
            <div className="turn-timer">Time left: {turnTimer}s</div>
            <button onClick={startNewGame}>New Game</button>
        </div>
    );
}

export default Game;