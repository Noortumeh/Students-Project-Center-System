// ProgressCircle.jsx
import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = ({ totalTasks }) => {
    const [completedTasks, setCompletedTasks] = useState(0);

    const handleTaskCompletion = () => {
        if (completedTasks < totalTasks) {
            setCompletedTasks(completedTasks + 1);
        }
    };
    const percentage = (completedTasks / totalTasks) * 100;

    return (
        <div style={{ width: '100px', height: '100px' }}>
            <CircularProgressbar
                value={percentage}
                text={`${Math.round(percentage)}%`}
                styles={buildStyles({
                    pathColor: `#4caf50`,
                    textColor: '#000',
                    trailColor: '#d6d6d6',
                })}
            />
            <button onClick={handleTaskCompletion}>up</button>
        </div>
    );
};

export default ProgressCircle;