import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import Create from '../../../Components/createuser/CreateUser.jsx'; 

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
