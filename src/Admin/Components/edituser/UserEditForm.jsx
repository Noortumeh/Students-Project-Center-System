import { TextFieldComponent, SelectFieldComponent, SaveButton } from '../createproject/ProjectForm.jsx'
/* eslint-disable react/prop-types */

const UserEditForm = ({ user, handleChange, handleSave }) => (
  <form>
    <TextFieldComponent
      label="Name"
      name="name"
      value={user.name}
      onChange={handleChange}
    />

    <SelectFieldComponent
      label="Work Group"
      name="workgroup"
      value={user.workgroup}
      onChange={handleChange}
      options={[
        { value: 'Group A', label: 'Group A' },
        { value: 'Group B', label: 'Group B' },
        { value: 'Group C', label: 'Group C' },
      ]}
    />

    <SelectFieldComponent
      label="Status"
      name="status"
      value={user.status}
      onChange={handleChange}
      options={[
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
      ]}
    />

    <SelectFieldComponent
      label="Role"
      name="role"
      value={user.role}
      onChange={handleChange}
      options={[
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
        { value: 'Manager', label: 'Manager' },
      ]}
    />

    <SaveButton onClick={handleSave} />
  </form>
);

export default UserEditForm;
