import React from 'react';
import Dashboard from '../../../shared/dashbord/Dashbord';
import EditUser from '../../../component/edituser/EditUser.jsx';

export default function EditStudent() {
  return (
    <Dashboard>
      <EditUser
        userType="Student"
        apiPath="https://api.escuelajs.co/api/v1/users"
        redirectPath="/users/student"
      />
    </Dashboard>
  );
}
