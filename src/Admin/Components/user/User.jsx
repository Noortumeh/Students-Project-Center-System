import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Box,
  TableSortLabel,
  TablePagination,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function UserManagement({ title, fetchUrl, role }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(fetchUrl);
      console.log(data); // لمعاينة البيانات المرسلة من الـ API
      const filteredUsers = role ? data.filter(user => user.role === role) : data;
      setUsers(filteredUsers);
    } catch (error) {
      toast.error(`فشل في جلب ${title.toLowerCase()}s. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${fetchUrl}/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        toast.success(`${title} deleted successfully`);
        Swal.fire('Deleted!', `${title.toLowerCase()} deleted successfully.`, 'success');
      } catch (error) {
        toast.error(`فشل في حذف ${title.toLowerCase()}. ${error.message}`);
      }
    }
  };

  // Filter users by full name
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name ?? ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const sortedUsers = [...filteredUsers].sort(getComparator(order, orderBy));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setEntriesToShow(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedUsers = sortedUsers.slice(page * entriesToShow, page * entriesToShow + entriesToShow);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          {title} Management
        </Typography>

        <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Grid item>
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 200 }}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/createuser/CreateUser" // رابط إضافة مستخدم جديد
            >
              Add {title}
            </Button>
          </Grid>
        </Grid>

        {loading ? (
          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'name'}
                        // @ts-ignore
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={() => handleRequestSort('name')}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        لا توجد بيانات لعرضها
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name || ''}</TableCell> {/* عرض اسم المستخدم */}
                        <TableCell>{user.email || ''}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <IconButton
                              component={Link}
                              to={`/Action/edit/${user.id}`} // رابط تعديل المستخدم
                              sx={{ backgroundColor: '#2196f3', color: '#fff' }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              onClick={() => deleteUser(user.id)}
                              sx={{ backgroundColor: '#f44336', color: '#fff' }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={entriesToShow}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </Container>
  );
}
