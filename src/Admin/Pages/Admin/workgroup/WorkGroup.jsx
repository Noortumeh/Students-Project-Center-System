import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const fetchWorkgroups = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token is missing. Please login to get a token.");
    }
    const response = await fetch("http://spcs.somee.com/api/workgroups", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching new data:", error);
    throw error;
  }
};

const WorkgroupPage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["workgroups"],
    queryFn: fetchWorkgroups,
    staleTime: 60000, // تحديث البيانات كل دقيقة
  });

  console.log("Fetched Workgroups Data:", data); // ✅ تحقق من البيانات المسترجعة

  const workgroups = data?.result?.workgroups || [];

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const handleCloseDialog = () => {
    setSelectedTeam(null);
  };

  const columns = [
    { field: "name", headerName: "Workgroup Name", width: 180 },
    { field: "supervisorName", headerName: "Supervisor Name", width: 180 },
    { field: "coSupervisorName", headerName: "Co-Supervisor Name", width: 180 },
    { field: "customerName", headerName: "Customer Name", width: 180 },
    { 
      field: "company", 
      headerName: "Company", 
      width: 180, 
      renderCell: (params) => params.value || "N/A" // ✅ يظهر "N/A" عند عدم وجود قيمة 
    },
    {
      field: "team",
      headerName: "Team",
      width: 120,
      renderCell: (params) => (
        <Button onClick={() => handleTeamClick(params.value)}>
          View Team
        </Button>
      ),
    },
  ];

  return (
    <Container sx={{ mt: { xs: 4, md: 10 }, px: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 3, 
        }}
      >
       <Typography 
  variant="h4" 
  fontWeight="bold" 
  color="primary" 
  sx={{ 
    fontSize: { xs: "1.8rem", md: "2.5rem" },
    textAlign: "center", 
    width: "100%", 
  }}
>
  Workgroups
</Typography>

      </Box>

      {/* Data Grid */}
      {isLoading ? (
        <Typography sx={{ textAlign: "center", mt: 4 }}>Loading...</Typography>
      ) : isError ? (
        <Typography sx={{ textAlign: "center", mt: 4, color: "error.main" }}>
          Error Loading workgroups
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box sx={{ height: { xs: 450, sm: 500, md: 600 } }}>
            <DataGrid
              rows={workgroups}
              columns={columns}
              onRowSelectionModelChange={(ids) => setSelectedUsers(ids)}
              selectionModel={selectedUsers}
              sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#2c3e50",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                },
                "& .MuiDataGrid-cell": {
                  padding: "8px",
                  fontSize: { xs: "0.8rem", sm: "0.95rem" },
                  borderBottom: "1px solid #e0e0e0",
                },
                "& .MuiDataGrid-row": {
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                  "&:hover": { backgroundColor: "#e0f7fa" },
                },
              }}
            />
          </Box>
        </Paper>
      )}

      {/* Dialog for Team Members */}
      <Dialog 
        open={selectedTeam !== null} 
        onClose={handleCloseDialog} 
        sx={{ "& .MuiDialog-paper": { width: { xs: "90%", md: "500px" } } }}
      >
        <DialogTitle>Team Members</DialogTitle>
        <DialogContent>
          {selectedTeam && selectedTeam.length > 0 ? (
            <Box component="ul" sx={{ pl: 3 }}>
              {selectedTeam.map((member, index) => (
                <Typography key={index} component="li" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                  {member}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography sx={{ textAlign: "center", mt: 2 }}>No team members available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WorkgroupPage;
