import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';

const MemberTable = ({ columns, rows, title }) => {
    return (
        <Box sx={{ width: '100%', mt: 3 }}>
            {title && (
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {title}
                </Typography>
            )}
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="workgroup members table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{
                                        minWidth: column.minWidth,
                                        backgroundColor: '#f5f5f5',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                hover
                                key={index}
                                sx={{
                                    '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                                    ...(row.role === 'supervisor' && {
                                        backgroundColor: '#e3f2fd !important'
                                    }),
                                    ...(row.role === 'co_supervisor' && {
                                        backgroundColor: '#e8f5e9 !important'
                                    }),
                                    ...(row.role === 'customer' && {
                                        backgroundColor: '#fff3e0 !important'
                                    })
                                }}
                            >
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        {column.id === 'role' ? (
                                            <Typography
                                                component="span"
                                                sx={{
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    fontSize: '0.875rem',
                                                    ...(row.role === 'supervisor' && {
                                                        backgroundColor: '#90caf9',
                                                        color: '#0d47a1'
                                                    }),
                                                    ...(row.role === 'co_supervisor' && {
                                                        backgroundColor: '#a5d6a7',
                                                        color: '#1b5e20'
                                                    }),
                                                    ...(row.role === 'customer' && {
                                                        backgroundColor: '#ffcc80',
                                                        color: '#e65100'
                                                    }),
                                                    ...(row.role === 'student' && {
                                                        backgroundColor: '#e0e0e0',
                                                        color: '#424242'
                                                    })
                                                }}
                                            >
                                                {row[column.id]}
                                            </Typography>
                                        ) : (
                                            row[column.id]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MemberTable;