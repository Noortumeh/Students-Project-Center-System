import { Box, CircularProgress, Grid2 as Grid, Typography } from "@mui/material";
import DescriptionCard from "../../components/Card";
import { getProjects } from "../../../util/httpsForUser/https";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PaginationComponent from "../../components/PaginationComponent";

export default function WorkgroupsProjects() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(6);

    const { data, isFetching, isError, error } = useQuery({
        queryKey: ["projects", pageNumber, pageSize],
        queryFn: () => getProjects({ pageSize, pageNumber }),
        keepPreviousData: true,
    });

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPageNumber(1); // العودة إلى الصفحة الأولى عند تغيير الحجم
    };

    let content = null;
    if (isFetching) {
        content = <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box>;
    }
    if (isError) {
        content = (
            <Box sx={{ textAlign: "center" }}>
                <Typography color="error">{error.message}</Typography>
            </Box>
        );
    }
    if (data && data.total > 0) {
        content = (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '70vh' }} spacing={3} columns={12}>
                {data.projects.map((project) => (
                    <Grid key={project.id}>
                        <DescriptionCard
                            key={project.id}
                            title={project.name}
                            action={'Go To Project'}
                            link={`projects/${project.id}`}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }
    
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: 5
            }}
        >
            {!content ?
                <Typography variant="h4" textAlign="center" gutterBottom>
                    You are not registered in any project
                </Typography>
                :
                <>
                    <Typography variant="h4" textAlign="center">
                        Your Projects Overview
                    </Typography>
                    {content}
                    <PaginationComponent
                        totalCount={data?.total || 6}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                </>
            }
        </Box>
    );
}