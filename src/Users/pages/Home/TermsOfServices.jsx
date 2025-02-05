import React from 'react';
import { Box, Typography, CircularProgress, Alert, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchTermsOfService } from './HttpHome';

export default function TermsOfServicePage() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['termsOfService'],
        queryFn: fetchTermsOfService,
    });
    
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 10, p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {isLoading ? 'Loading...' : (data && data[0].title) || 'Terms of Service'}
            </Typography>

            {isLoading && <CircularProgress />}
            {error && <Alert severity="error">Failed to load terms of service.</Alert>}

            {data ? (
                <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{ whiteSpace: 'pre-line' }} // يحافظ على الفقرات والفواصل
                    >
                        {data[0].description}
                    </Typography>
                </Paper>
            ) : <Alert severity="error">Failed to load terms of service.</Alert>}
        </Box>
    );
}