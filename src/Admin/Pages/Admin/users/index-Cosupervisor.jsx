import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Box, Paper, Typography, Chip } from "@mui/material";
import { fetchCoSupervisors } from "../../../../util/http for admin/http.js";

export default function IndexCoSupervisors() {
  const { data: coSupervisors = [], isLoading, error } = useQuery({
    queryKey: ["coSupervisors"],
    queryFn: fetchCoSupervisors,
    onError: (err) => console.error("Error fetching co-supervisors:", err),
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        Error loading co-supervisors: {error.message}
      </Typography>
    );
  }

  // ألوان حالات المشاريع
  const statusColors = {
    active: "success",
    pending: "warning",
    completed: "primary",
    canceled: "error",
  };

  // الأعمدة
  const columns = [
    {
      field: "fullName",
      headerName: "Co-Supervisor Name",
      width: 300,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "projects",
      headerName: "Projects",
      width: 450, 
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        const projects = params.row.projects || [];
        return projects.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, padding: "10px" }}>
            {projects.map((project, index) => (
              <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    flexGrow: 1,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {project.name}
                </Typography>
                <Chip
                  label={project.status}
                  color={statusColors[project.status] || "default"}
                  size="small"
                  sx={{ minWidth: "80px", textAlign: "center" }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body2">No projects available</Typography>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      headerAlign: "center",
      align: "left",
    },
  ];

  // تجهيز البيانات للجدول
  const rows = coSupervisors.map((coSupervisor) => ({
    id: coSupervisor.id,
    fullName: coSupervisor.fullName, 
    email: coSupervisor.email,
    projects: coSupervisor.projects || [],
  }));
  

  return (
    <Box sx={{ padding: 3, mt: 6, ml: 10 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#2c3e50", fontWeight: "bold", textAlign: "center", mt: 3 }}>
        Co-Supervisors
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: "#f5f5f5",
          width: { xs: "11rem", sm: "25rem", md: "45rem", lg: "70rem" },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection={false}
            autoHeight
            getRowHeight={() => "auto"} 
            headerHeight={80}
            sx={{
              "& .MuiDataGrid-row": {
                borderBottom: "1px solid #ddd",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": {
                padding: "16px",
                whiteSpace: "normal",
                wordBreak: "break-word",
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
