import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
  Grid,
  CircularProgress,
} from '@mui/material';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function Reports() {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [reportType, setReportType] = useState('');
  const [writtenBy, setWrittenBy] = useState('');
  const [loading, setLoading] = useState(true); // حالة التحميل

  const navigate = useNavigate();

  const reports = [
    {
      reportId: '17-0163-722',
      customerName: 'CANTIC, RALPH G.',
      supervisorName: 'Dr. John Smith',
      projectName: 'Graduation Project',
      date: '26/5/2025',
      year: '2024 - 2025',
      semester: '1st Semester',
      reportType: 'Project',
      writtenBy: 'Supervisor',
    },
    {
      reportId: '18-0123-456',
      customerName: 'SMITH, ALEX T.',
      supervisorName: 'Dr. Emily Davis',
      projectName: 'Research on AI',
      date: '12/8/2026',
      year: '2025 - 2026',
      semester: '2nd Semester',
      reportType: 'Thesis',
      writtenBy: 'Customer',
    },
    {
      reportId: '19-0456-789',
      customerName: 'JOHNSON, LUCY M.',
      supervisorName: 'Dr. Robert Brown',
      projectName: 'Big Data Analytics',
      date: '20/10/2028',
      year: '2027 - 2028',
      semester: '1st Semester',
      reportType: 'Project',
      writtenBy: 'Supervisor',
    },
    {
      reportId: '20-5678-123',
      customerName: 'DOE, JANE A.',
      supervisorName: 'Dr. Michael White',
      projectName: 'Cloud Computing Research',
      date: '3/5/2029',
      year: '2028 - 2029',
      semester: '2nd Semester',
      reportType: 'Thesis',
      writtenBy: 'Customer',
    },
    {
      reportId: '21-0987-654',
      customerName: 'MILLER, JACK D.',
      supervisorName: 'Dr. Sarah Lee',
      projectName: 'IoT for Smart Homes',
      date: '17/2/2030',
      year: '2029 - 2030',
      semester: '1st Semester',
      reportType: 'Project',
      writtenBy: 'Supervisor',
    },
  ];

  const goToReportDetails = (reportId) => {
    navigate(`/report/ReportDetails/${reportId}`);
  };

  const filteredReports = reports.filter(
    (report) =>
      (year === '' || report.year === year) &&
      (semester === '' || report.semester === semester) &&
      (reportType === '' || report.reportType === reportType) &&
      (writtenBy === '' || report.writtenBy === writtenBy)
  );

  useEffect(() => {
    const loadReports = () => {
      setLoading(true);
      // يمكنك محاكاة وقت التحميل هنا
      setTimeout(() => {
        setLoading(false);
      }, 1000); // محاكاة تحميل البيانات لمدة 1 ثانية
    };

    loadReports();
  }, []);

  return (
    <Dashboard>
      <Box sx={{ mt: 5, mx: 'auto', maxWidth: 'lg' }}>
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>

        <Card sx={{ mb: 4, boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    label="Year"
                  >
                    <MenuItem value="">All Years</MenuItem>
                    <MenuItem value="2024 - 2025">2024 - 2025</MenuItem>
                    <MenuItem value="2025 - 2026">2025 - 2026</MenuItem>
                    <MenuItem value="2026 - 2027">2026 - 2027</MenuItem>
                    <MenuItem value="2027 - 2028">2027 - 2028</MenuItem>
                    <MenuItem value="2028 - 2029">2028 - 2029</MenuItem>
                    <MenuItem value="2029 - 2030">2029 - 2030</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Semester</InputLabel>
                  <Select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    label="Semester"
                  >
                    <MenuItem value="">All Semesters</MenuItem>
                    <MenuItem value="1st Semester">1st Semester</MenuItem>
                    <MenuItem value="2nd Semester">2nd Semester</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    label="Report Type"
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="Project">Project</MenuItem>
                    <MenuItem value="Thesis">Thesis</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Written By</InputLabel>
                  <Select
                    value={writtenBy}
                    onChange={(e) => setWrittenBy(e.target.value)}
                    label="Written By"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Supervisor">Supervisor</MenuItem>
                    <MenuItem value="Customer">Customer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Report ID</StyledTableCell>
                  <StyledTableCell>Customer Name</StyledTableCell>
                  <StyledTableCell>Supervisor Name</StyledTableCell>
                  <StyledTableCell>Project Name</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Written By</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report, index) => (
                    <StyledTableRow key={index}>
                      <TableCell>{report.reportId}</TableCell>
                      <TableCell>{report.customerName}</TableCell>
                      <TableCell>{report.supervisorName}</TableCell>
                      <TableCell>{report.projectName}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.writtenBy}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => goToReportDetails(report.reportId)}
                        >
                          Go to Report
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <TableCell colSpan={7} align="center">
                      No reports found for the selected criteria.
                    </TableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Dashboard>
  );
}
