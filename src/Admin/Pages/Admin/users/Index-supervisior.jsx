import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import UserManagement from '../../../Components/user/User.jsx';

export default function IndexSupervisor() {
  return (
    <Dashboard>
      <UserManagement 
        title="Supervisor" 
        fetchUrl="https://api.escuelajs.co/api/v1/users" 
        role="admin"  // تعديل الدور هنا إلى "supervisor"
        createPath="/users/create-supervisor"  
        editPath="/users/edit"                  
      />
    </Dashboard>
  );
}
