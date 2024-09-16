import React from 'react';
import Dashboard from '../../../shared/dashbord/Dashbord.jsx';
import Create from '../../../component/createuser/CreateUser.jsx'; 

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
