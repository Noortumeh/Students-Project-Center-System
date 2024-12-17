import { TextField, Grid } from '@mui/material';
/* eslint-disable react/prop-types */

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



export default SearchBar;
