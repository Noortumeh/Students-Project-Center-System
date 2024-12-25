import { Button as MuiButton } from '@mui/material';

const CustomButton = ({ children, onClick, ...props }) => {
    return (
        <MuiButton
            onClick={onClick}
            sx={{
                mt: '20px',
                p: '10px',
                borderRadius: '15px',
                backgroundColor: props.isActive ? '#543DE4' : '#CAD1F7',
                color: props.isActive ? 'white' : '#543DE4',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#543DE4',
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
                '&:active': {
                    transform: 'scale(0.95)',
                },
                ...props.sx
            }}
        >
            {children}
        </MuiButton>
    );
};

export default CustomButton;