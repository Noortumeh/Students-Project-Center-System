import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
 import User from '../../../Components/user/User.jsx'; 
import axios from 'axios';

export default function IndexStudent() {
  return (
    <Dashboard>
      <User 
        title="Student" 
        fetchUrl="https://api.escuelajs.co/api/v1/users" 
        role="admin" 
        createPath="/user/CreateStudents/:id" 
        editPath="/user/edit"
      />
    </Dashboard>
  );
}
