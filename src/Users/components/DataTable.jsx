import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Container, Stack, Button } from '@mui/material';
import { Children } from 'react';

export default function DataTable({ columns, rows, title, children }) {
    return (
        <Container maxWidth="lg">
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
                                    '&:nth-of-type(odd)': { backgroundColor: '#fafafa' }
                                }}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        <Typography
                                            component="span">
                                            {column.id === 'action' ?
                                                <Stack direction={"row"} gap={1}>
                                                    <Button variant="contained" href={`viewtask/${row.id}?workgroupId=${row.workgroupId}`}>view</Button>
                                                    <Button variant="contained" href={`edittask/${row.id}`}>edit</Button>
                                                </Stack>
                                                : row[column.id]}
                                        </Typography>

                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};