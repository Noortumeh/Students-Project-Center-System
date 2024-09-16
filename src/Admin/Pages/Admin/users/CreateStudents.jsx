import React from 'react';
import Dashboard from '../../../shared/dashbord/Dashbord.jsx';
import Create from '../../../component/createuser/CreateUser.jsx'; 

export default function CreateUser() {
  return (
    <Dashboard>
      <Create 
        formTitle="Create New User" 
        redirectPath="/users/student" 
      />
    </Dashboard>
  );
}
