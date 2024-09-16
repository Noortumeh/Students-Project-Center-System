import React from 'react';
import Dashboard from '../../../shared/dashbord/Dashbord';
import EditUser from '../../../component/edituser/EditUser.jsx';

export default function EditSupervisor() {
  return (
    <Dashboard>
      <EditUser
        userType="supervisior"
        apiPath="https://api.escuelajs.co/api/v1/users"
        redirectPath="/users/supervisor"
      />
    </Dashboard>
  );
}
