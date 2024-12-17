import Select from 'react-select';
import { FormControl } from '@mui/material';
/* eslint-disable react/prop-types */

const SelectUser = ({ options, selectedUser, setSelectedUser, placeholder }) => {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <Select
        options={options}
        value={selectedUser}
        onChange={setSelectedUser}
        placeholder={placeholder}
        isSearchable
        styles={{ control: (base) => ({ ...base, height: '56px' }) }}
      />
    </FormControl>
  );
};

export default SelectUser;
