/* eslint-disable react/prop-types */
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';

const EntriesControl = ({ entriesToShow, setEntriesToShow, searchTerm, setSearchTerm }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <FormControl sx={{ width: 120 }}>
        <Select
          value={entriesToShow}
          onChange={(e) => setEntriesToShow(e.target.value)}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        <Typography variant="caption" sx={{ ml: 1 }}>
          entries
        </Typography>
      </FormControl>

      <TextField
        label="Search Projects"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ width: 250 }}
      />
    </Box>
  );
};

export default EntriesControl;
