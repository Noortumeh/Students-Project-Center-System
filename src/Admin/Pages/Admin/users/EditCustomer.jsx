import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import EditUser from '../../../Components/edituser/EditUser.jsx'; 

export default function EditCustomer() {
    return (
      <Dashboard>
        <EditUser
          userType="Customer"
          apiPath="https://api.escuelajs.co/api/v1/users"
          redirectPath="/users/customer"
        />
      </Dashboard>
    );
  }
