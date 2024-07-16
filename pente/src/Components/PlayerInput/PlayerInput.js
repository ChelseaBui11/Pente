import React, { useState } from 'react';

function PlayerInput({ onSetNames }) {
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSetNames(playerX || 'Player X', playerO || 'Player O');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Player X"
                value={playerX}
                onChange={(e) => setPlayerX(e.target.value)}
            />
            <input
                type="text"
                placeholder="Player O"
                value={playerO}
                onChange={(e) => setPlayerO(e.target.value)}
            />
            <button type="submit">Set Names</button>
        </form>
    );
}

export default PlayerInput;