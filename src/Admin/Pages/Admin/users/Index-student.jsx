import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import {
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Delete, Star, Settings, Edit } from '@mui/icons-material';
import { fetchStudents } from '../../../../util/http for admin/http.js';
import Filters from '../../../Components/generalcomponent/Filters.jsx';

export default function IndexStudent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(20);

  console.log('Rendering IndexStudent component'); // جملة طباعة للتأكد من أن المكون يتم تصييره

  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students', entriesToShow],
    queryFn: () => fetchStudents(entriesToShow, 1),
    onError: (err) => console.error('Error fetching students:', err),
  });

  console.log('Students data from useQuery:', students); // جملة طباعة لعرض البيانات المستلمة

  if (isLoading) {
    console.log('Loading students data...'); // جملة طباعة أثناء التحميل
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    console.error('Error loading students:', error.message); // جملة طباعة في حالة الخطأ
    return <div>Error loading students: {error.message}</div>;
  }

  // إنشاء حقل fullName
  const studentsWithFullName = students.map((student) => ({
    ...student,
    fullName: `${student.firstName} ${student.middleName} ${student.lastName}`,
  }));

  console.log('Students with fullName:', studentsWithFullName); // جملة طباعة لعرض البيانات مع الحقل الجديد

  // فلترة البيانات
  const filteredStudents = studentsWithFullName.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Filtered students:', filteredStudents); // جملة طباعة لعرض البيانات بعد الفلترة

  const columns = [
    { id: 'id', label: 'Student ID' },
    { id: 'fullName', label: 'Student Name' },
    { id: 'projectName', label: 'Project Name' },
    { id: 'email', label: 'Email' },
    {
      id: 'actions',
      label: 'Action',
      render: (row) => (
        <Box display="flex" gap={1}>
          <IconButton
            color="primary"
            onClick={() => console.log(`Editing student with ID: ${row.id}`)}
          >
            <Edit sx={{ color: '#4caf50' }} />
          </IconButton>
          <IconButton>
            <Star sx={{ color: '#ffeb3b' }} />
          </IconButton>
          <IconButton>
            <Settings sx={{ color: '#2196f3' }} />
          </IconButton>
          <IconButton>
            <Delete sx={{ color: '#f44336' }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Dashboard>
      <Filters
        searchTerm={searchTerm || ''}
        setSearchTerm={setSearchTerm}
        entriesToShow={entriesToShow || 20}
        setEntriesToShow={setEntriesToShow}
        entryOptions={[20, 50, 100]}
      />
      <Box sx={{ padding: 3 }}>
        <TableContainer>
          <Table sx={{ border: '1px solid #ddd' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{ fontWeight: 'bold', color: '#333', padding: '8px' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{
                      '&:hover': { backgroundColor: '#f1f1f1' },
                      transition: 'background-color 0.3s',
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} sx={{ padding: '8px' }}>
                        {column.id === 'actions'
                          ? column.render(student)
                          : student[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Dashboard>
  );
}