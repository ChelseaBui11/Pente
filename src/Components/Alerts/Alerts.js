import React from 'react';

function Alerts({ alerts }) {
    return (
        <div className="alerts">
            {alerts.map((alert, index) => (
                <div key={index}>{alert}</div>
            ))}
        </div>
    );
}

export default Alerts;