import Select from 'react-select';
import { FormControl } from '@mui/material';
import PropTypes from 'prop-types'; 

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


SelectUser.propTypes = {
  options: PropTypes.array.isRequired,
  selectedUser: PropTypes.object, 
  setSelectedUser: PropTypes.func.isRequired, 
  placeholder: PropTypes.string, 
};

export default SelectUser;
