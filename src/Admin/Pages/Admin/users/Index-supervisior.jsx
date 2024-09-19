import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
 import User from '../../../Components/user/User.jsx'; 
import axios from 'axios';

export default function IndexSupervisor() {
  return (
    <Dashboard>
      <User 
        title="Supervisor" 
        fetchUrl="https://api.escuelajs.co/api/v1/users" 
        role="admin" 
        createPath="/user/CreateSupervisior/:id" 
        editPath="/user/edit"
      />
    </Dashboard>
  );
}
