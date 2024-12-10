import React, { useState } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardContent,
  TextField,
  Box,
} from '@mui/material';
import Filters from '../../../Components/generalcomponent/Filters.jsx'; // استدعاء فلتر التقرير
import GeneralTable from '../../../Components/generalcomponent/GeneralTable.jsx'; // استدعاء GeneralTable
import DataTable from '../../../Components/generalcomponent/DataTable.jsx';
const ReportPage = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [reportType, setReportType] = useState('');
  const [writtenBy, setWrittenBy] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // متغير البحث

  const { data, filteredData } = useDataTable({
    year,
    semester,
    reportType,
    writtenBy,
    searchTerm,
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'type', label: 'Type' },
    { id: 'author', label: 'Written By' },
    // أضف المزيد من الأعمدة حسب الحاجة
  ];

  return (
    <Box sx={{ padding: 3 }}>
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

          {/* حقل البحث */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
        </Grid>
      </CardContent>

      {/* استخدام Filters لتصفية البيانات */}
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        entriesToShow={10} // عدد العناصر المعروضة في الجدول
        setEntriesToShow={() => {}} // أضف دالة إذا كان لديك أي تغيير في عدد العناصر المعروضة
      />

      {/* استخدام GeneralTable لعرض البيانات */}
      <GeneralTable
        columns={columns}
        data={filteredData}
        actions={[]} // أضف الإجراءات إذا لزم الأمر
        onAction={() => {}} // يمكنك إضافة دالة للتعامل مع الإجراءات
        orderBy="name" // عمود الترتيب
        order="asc" // ترتيب البيانات (تصاعدي أو تنازلي)
        onRequestSort={() => {}} // يمكنك إضافة دالة لتغيير الترتيب إذا لزم الأمر
      />
    </Box>
  );
};

export default ReportPage;
