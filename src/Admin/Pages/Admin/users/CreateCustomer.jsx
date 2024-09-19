import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import Create from '../../../Components/createuser/CreateUser.jsx'; 

export default function CreateCustomer() {
  return (
    <Dashboard>
      <Create 
        formTitle="Create New Customer" 
        redirectPath="/users/customer" 
      />
    </Dashboard>
  );
}
