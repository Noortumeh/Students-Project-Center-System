import { TextField, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, onChange }) => {
  return (
    <Grid item>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={onChange}
        sx={{ minWidth: 200 }}
      />
    </Grid>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,    
};

export default SearchBar;
