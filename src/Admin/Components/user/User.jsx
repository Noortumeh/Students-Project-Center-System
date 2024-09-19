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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Grid, // تم إضافة Grid من Material-UI
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function User({ title, fetchUrl, role, createPath, editPath }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(20);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(fetchUrl);
      const filteredUsers = role ? data.filter(user => user.role === role) : data;
      setUsers(filteredUsers);
    } catch (error) {
      toast.error(`Failed to fetch ${title.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${fetchUrl}/${id}`);
        toast.success(`${title} deleted successfully`);
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire('Deleted!', `The ${title.toLowerCase()} has been deleted.`, 'success');
      } catch (error) {
        toast.error(`Failed to delete ${title.toLowerCase()}.`);
      }
    }
  };

  // Filter and slice users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedUsers = filteredUsers.slice(0, entriesToShow);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {title} List
        </Typography>

        {/* الجزء العلوي: زر Create وأدوات التحكم */}
        <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
  <Grid item>
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        {/* القائمة المنسدلة للتحكم في عدد الإدخالات */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="entries-label">Show</InputLabel>
          <Select
            labelId="entries-label"
            id="entries-select"
            value={entriesToShow}
            onChange={(e) => setEntriesToShow(e.target.value)}
            label="Show"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        {/* حقل البحث */}
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 250 }}
        />
      </Grid>
    </Grid>
  </Grid>
  <Grid item>
    {/* زر Create */}
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={createPath}
      sx={{ py: 1.5, px: 5 }}
    >
      <Edit sx={{ mr: 1 }} /> Create {title}
    </Button>
  </Grid>
</Grid>

        {/* عرض مؤشر التحميل إذا كانت البيانات لا تزال تُجلب */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, border: '1px solid #ddd' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Middle Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Workgroup</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedUsers.length > 0 ? (
                  displayedUsers.map((user) => {
                    const names = user.name.split(' ');

                    return (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{names[0]}</TableCell>
                        <TableCell>{names[1] || ''}</TableCell>
                        <TableCell>{names[2] || ''}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.workGroup || ''}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={`${editPath}/${user.id}`}
                            sx={{ mr: 1 }}
                          >
                            <Edit />
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Delete />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No {title.toLowerCase()}s found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}
