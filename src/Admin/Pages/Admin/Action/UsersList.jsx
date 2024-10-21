import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Grid, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Dashboard() {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/users/student')) {
      setActiveLink('students');
    } else if (currentPath.startsWith('/users/customer')) {
      setActiveLink('customers');
    } else if (currentPath.startsWith('/users/supervisor')) {
      setActiveLink('supervisors');
    } else if (currentPath.startsWith('/posts/Announcements')) {
      setActiveLink('announcements');
    } else if (currentPath.startsWith('/posts/Publishing-projects')) {
      setActiveLink('publishing');
    } else if (currentPath.startsWith('/posts/Form')) {
      setActiveLink('form');
    } else if (currentPath.startsWith('/shared/TermOfServices')) {
      setActiveLink('termOfServices');
    } else if (currentPath.startsWith('/shared/Reports')) {
      setActiveLink('reports');
    } else {
      setActiveLink('home');
    }
  }, [location]);

  return (
    <Grid item md={3} xl={2} sx={{ bgcolor: 'primary.dark', height: '100vh', color: 'white', position: 'fixed' }}>
      <Grid container direction="column" alignItems="flex-start" sx={{ p: 2 }}>
        <Avatar alt="User" src="https://github.com/mdo.png" sx={{ mb: 2 }} />
        <Typography variant="h6">User</Typography>
        <Button color="inherit" component={Link} to="/" fullWidth sx={{ mt: 2, justifyContent: 'flex-start' }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/users/student" fullWidth sx={{ justifyContent: 'flex-start' }}>
          Students
        </Button>
        <Button color="inherit" component={Link} to="/users/customer" fullWidth sx={{ justifyContent: 'flex-start' }}>
          Customers
        </Button>
        <Button color="inherit" component={Link} to="/users/supervisor" fullWidth sx={{ justifyContent: 'flex-start' }}>
          Supervisors
        </Button>
        <Button color="inherit" component={Link} to="/shared/Reports" fullWidth sx={{ justifyContent: 'flex-start' }}>
          Reports
        </Button>
      </Grid>
    </Grid>
  );
}

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const getUsers = async () => {
    try {
      const { data } = await axios.get("https://api.escuelajs.co/api/v1/users");
      setUsers(data);
      setLoading(false); 
    } catch (error) {
      console.error("Failed to fetch users", error);
      setError("Failed to fetch users.");
      setLoading(false); 
      toast.error("Failed to fetch users.");
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من التراجع عن هذا!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، احذف!'
    });

    if (result.isConfirmed) {
      try {
        const userToDelete = users.find(user => user.id === id);
        if (!userToDelete) {
          toast.error("المستخدم غير موجود.");
          return;
        }

        await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`);
        toast.success("تم حذف المستخدم بنجاح");
        setUsers(users.filter((user) => user.id !== id));

        Swal.fire('تم الحذف!', 'تم حذف المستخدم.', 'success');
      } catch (error) {
        console.error("فشل حذف المستخدم", error);
        toast.error("فشل حذف المستخدم. الرجاء التحقق من البيانات.");
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <div>جار التحميل...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (users.length === 0) {
    return <div>لا يوجد مستخدمين متاحين</div>; 
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Dashboard />
        <Grid item md={9} xl={10} sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            قائمة المستخدمين
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>رقم الطالب</TableCell>
                  <TableCell>الاسم الأول</TableCell>
                  <TableCell>الاسم الأوسط</TableCell>
                  <TableCell>الاسم الأخير</TableCell>
                  <TableCell>البريد الإلكتروني</TableCell>
                  <TableCell>مجموعة العمل</TableCell>
                  <TableCell>إجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstName || ''}</TableCell> {/* عرض الاسم الأول */}
                    <TableCell>{user.middleName || ''}</TableCell> {/* عرض الاسم الأوسط */}
                    <TableCell>{user.lastName || ''}</TableCell> {/* عرض الاسم الأخير */}
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.workGroup || 'N/A'}</TableCell>
                    <TableCell>
                      <IconButton color="primary" component={Link} to={`/user/edit/${user.id}`}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => deleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UsersList;
