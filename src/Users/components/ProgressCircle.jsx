// ProgressCircle.jsx
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = ({ percentage, style}) => {
    return (
        <div style={{ width: style.width? style.width:'100px', height: style.height? style.height:'100px' }}>
            <CircularProgressbar
                value={percentage}
                text={`${Math.round(percentage)}%`}
                styles={buildStyles(style)}
            />
        </div>
    );
};

export default ProgressCircle;