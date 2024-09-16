import React from 'react';
import Dashboard from '../../../shared/dashbord/Dashbord.jsx';
import User from '../../../component/user/User.jsx'; 
import axios from 'axios';

export default function IndexCustomer() {
  return (
    <Dashboard>
      <User
        title="Customer" 
        fetchUrl="https://api.escuelajs.co/api/v1/users" 
        role="customer" 
        createPath="/user/CreateCustomer/:id" 
        editPath="/user/edit"
      />
    </Dashboard>
  );
}
