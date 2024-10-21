import React from 'react';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import UserManagement from '../../../Components/user/User.jsx';

export default function IndexCustomer() {
  return (
    <Dashboard>
      <UserManagement 
        title="Customer" 
        fetchUrl="https://api.escuelajs.co/api/v1/users" 
        role="customer"  // تعديل الدور هنا إلى "customer"
        createPath="/users/create-customer"   
        editPath="/Action/edit/:id"                
      />
    </Dashboard>
  );
}
