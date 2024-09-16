import React from 'react';
import Dashboard from '../../../shared/dashbord/Dashbord.jsx';
import Create from '../../../component/createuser/CreateUser.jsx'; 

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
