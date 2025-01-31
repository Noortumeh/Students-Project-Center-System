import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function SelectedList({name, onChange, children}) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <Box sx={{ maxWidth: 160 }}>
            <FormControl fullWidth>
                <InputLabel id="status">{name}</InputLabel>
                <Select
                    labelId={name}
                    id={name}
                    value={selectedValue}
                    label={name}
                    onChange={handleChange}
                >
                    {children}
                </Select>
            </FormControl>
        </Box>
    );
}
