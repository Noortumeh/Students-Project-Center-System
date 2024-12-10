import PropTypes from 'prop-types';
import { TextField, Grid } from '@mui/material';

const Filters = ({ searchTerm, setSearchTerm, entriesToShow, setEntriesToShow }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" mb={3}>
      <Grid item>
        <TextField
          label="Show Entries"
          select
          SelectProps={{ native: true }}
          value={entriesToShow}
          onChange={(e) => setEntriesToShow(e.target.value)}
          sx={{ width: 120 }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 250 }}
        />
      </Grid>
    </Grid>
  );
};

Filters.propTypes = {
  searchTerm: PropTypes.string.isRequired,  
  setSearchTerm: PropTypes.func.isRequired, 
  entriesToShow: PropTypes.number.isRequired, 
  setEntriesToShow: PropTypes.func.isRequired, 
};

export default Filters;
