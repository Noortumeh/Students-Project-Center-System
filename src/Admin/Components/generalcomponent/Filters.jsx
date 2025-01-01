import { TextField, Grid } from '@mui/material';

const Filters = ({
  searchTerm = '',
  setSearchTerm,
  entriesToShow = 20,
  setEntriesToShow,
  entryOptions = [],
}) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" mb={3}>
      <Grid item>
        <TextField
          label="Show Entries"
          select
          SelectProps={{ native: true }}
          value={entriesToShow}
          onChange={(e) => setEntriesToShow(Number(e.target.value))}
          sx={{ width: 120 }}
        >
          {entryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
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

export default Filters;
