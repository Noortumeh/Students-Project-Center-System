import React from 'react';
import { Box, CssBaseline, CircularProgress, Toolbar } from '@mui/material';
import Sidebar from '../../../../Users/components/sidebar.jsx';
import AppBarMenu from './AppBarMenu';

function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarMenu />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <React.Suspense fallback={<CircularProgress />}>{children}</React.Suspense>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
