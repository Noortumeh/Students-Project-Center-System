import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import User from '../../../Components/user/User.jsx';

export default function IndexCustomer() {
  return (
    <Dashboard>
      <User
        title="Customer" 
        fetchUrl="https://api.escuelajs.co/api/v1/users" 
        role="customer" 
        createPath="/users/CreateCustomer" 
        editPath="/users/edit" 
      />
    </Dashboard>
  );
}
