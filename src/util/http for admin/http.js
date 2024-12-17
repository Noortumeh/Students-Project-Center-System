export const fetchSupervisors = async () => {
    try {
      const response = await fetch('http://spcs.somee.com/api/users/get-all-supervisors?PageSize=6&PageNumber=1');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Supervisors:', data);
      return data.result.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`.toLowerCase(),
      }));
    } catch (error) {
      console.error('Error fetching supervisors:', error);
      throw error;
    }
  };
  
  export const fetchCustomers = async () => {
    try {
      const response = await fetch('http://spcs.somee.com/api/users/get-all-customers?PageSize=6&PageNumber=1');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Customers:', data);
      return data.result.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`.toLowerCase(),
      }));
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  };