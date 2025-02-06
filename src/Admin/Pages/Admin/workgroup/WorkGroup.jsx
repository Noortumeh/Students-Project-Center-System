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
import { fetchWorkgroups } from "../../../../util/http for admin/http.js";

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
    { field: "name", headerName: "Workgroup Name", flex: 1, minWidth: 150 },
    {
      field: "supervisorName",
      headerName: "Supervisor Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "coSupervisorName",
      headerName: "Co-Supervisor Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "team",
      headerName: "Team",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => (
        <Button onClick={() => handleTeamClick(params.value)}>View Team</Button>
      ),
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 4, md: 10 },
        px: { xs: 2, sm: 3, md: 4 },
        overflowX: "hidden",
      }}
    >
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
          <Box
            sx={{
              width: "100%",
              height: { xs: 450, sm: 500, md: 600 },
              overflowX: "auto",
            }}
          >
            <DataGrid
              rows={workgroups}
              columns={columns}
              autoPageSize
              onRowSelectionModelChange={(ids) => setSelectedUsers(ids)}
              selectionModel={selectedUsers}
              sx={{
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#2c3e50",
                  color: "#ffffff",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row:nth-of-type(odd)": {
                  backgroundColor: "#f9f9f9",
                },
                "& .MuiDataGrid-row:hover": { backgroundColor: "#e0f7fa" },
                "& .MuiDataGrid-virtualScroller": {
                  overflowX: "auto", // ✅ السماح بالسكرول الأفقي داخل الجدول فقط
                },
              }}
            />
          </Box>
        </Paper>
      )}

      {/* Dialog for Team Members */}
      <Dialog
        open={!!selectedTeam}
        onClose={handleCloseDialog}
        sx={{ "& .MuiDialog-paper": { width: { xs: "90%", md: "500px" } } }}
      >
        <DialogTitle>Team Members</DialogTitle>
        <DialogContent sx={{ padding: "16px" }}>
        {selectedTeam && selectedTeam.length > 0 ? (
            <Box component="ul" sx={{ pl: 3 }}>
              {selectedTeam.map((member, index) => (
                <Typography
                  key={index}
                  component="li"
                  sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  {member}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography sx={{ textAlign: "center", mt: 2 }}>
              No team members available
            </Typography>
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
