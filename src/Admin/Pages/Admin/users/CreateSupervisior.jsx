import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import Create from '../../../Components/createuser/CreateUser.jsx'; 

export default function CreateSupervisor() {
  return (
    <Dashboard>
      <Create 
        formTitle="Create New Supervisor" 
        redirectPath="/users/supervisor" 
      />
    </Dashboard>
  );
}
