import React from 'react';

function Alerts({ alerts, capturedPieces }) {
    return (
        <div className="alerts">
            {alerts.map((alert, index) => (
                <div key={index}>{alert}</div>
            ))}
            <div>Captured Pieces - X: {capturedPieces.X}, O: {capturedPieces.O}</div>
        </div>
    );
}

export default Alerts;
