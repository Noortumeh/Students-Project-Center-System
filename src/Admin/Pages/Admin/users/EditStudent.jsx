import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import EditUser from '../../../Components/edituser/EditUser.jsx'; 

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
