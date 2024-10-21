import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import UserManagement from '../../../Components/user/User.jsx';

export default function IndexStudent() {
  return (
    <Dashboard>
      <UserManagement 
        title="Student" 
        fetchUrl="https://api.escuelajs.co/api/v1/users" 
        role="customer"  // تعديل الدور هنا إلى "student"
        createPath="/users/create-student"   
        editPath="/users/edit"               
      />
    </Dashboard>
  );
}
