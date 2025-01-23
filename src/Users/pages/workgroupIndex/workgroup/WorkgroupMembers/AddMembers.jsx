import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUsers, addStudents, addAssistants, deleteStudent, deleteAssistant } from "./httpMembers";
import { useWorkgroup } from "../WorkgroupCustomHook/useWorkgroup";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MemberTable from "../../../../components/MemberTable";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { queryClient } from "../../../../../util/httpsForUser/https";

export default function AddWorkgroupMembers() {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const { workgroupId } = useParams();
    const { data: workgroupData, isLoading: workgroupLoading } = useWorkgroup(workgroupId);
    // Fetch users
    const { data: users, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    // Mutation handlers
    // add student
    const { mutateAsync: addStudentsMutate } = useMutation({
        mutationFn: addStudents,
        onSuccess: () => {
            toast.success("Added Students Successfully")
            setSelectedUsers([]);
            queryClient.invalidateQueries({ queryKey: ['workgroup', workgroupId] });
        },
    });
    // add co-supervisor
    const { mutateAsync: addAssistantsMutate } = useMutation({
        mutationFn: addAssistants,
        onSuccess: () => {
            toast.success("Added Assistants Successfully")
            setSelectedUsers([]);
            queryClient.invalidateQueries({ queryKey: ['workgroup', workgroupId] });
        },
    });
    //* Delete member mutation
    // delete student
    const { mutateAsync: deleteStudentMutate } = useMutation({
        mutationFn: deleteStudent,
        onSuccess: () => {
            toast.success("Student Member removed successfully");
            queryClient.invalidateQueries({ queryKey: ['workgroup', workgroupId] });
        },
    });
    // delete assistant
    const { mutateAsync: deleteAssistantMutate } = useMutation({
        mutationFn: deleteAssistant,
        onSuccess: () => {
            toast.success("Assistant Member removed successfully");
            queryClient.invalidateQueries({ queryKey: ['workgroup', workgroupId] });
        },
    });

    const handleDeleteMember = (id, role, name, requireReason = true) => {
        const confirmDialog = ConfirmDialog({
            title: 'Confirm Delete',
            text: `Are you sure you want to remove ${name}? ${requireReason ? "Please provide a reason." : ""}`,
            onConfirm: async (reason) => {
                if (role === "student") {
                    await deleteStudentMutate({ studentId: id, projectId: workgroupData.projectId, notes: reason });
                } else if (role === "co_supervisor") {
                    await deleteAssistantMutate({ assistantId: id, projectId: workgroupData.projectId, notes: reason });
                }
                console.log(`Reason for deleting ${name}:`, reason); // عرض السبب إذا كان موجودًا
            },
            msgConfirm: `${name} has been successfully removed.`,
            msgUnconfirm: `${name} was not removed.`,
            action: 'Removed!',
            requireReason, // تمرير القيمة لتحديد إذا كان السبب مطلوبًا
        });
    
        confirmDialog.showConfirmDialog();
    };
    //* Add members
    const handleAddMembers = (roleType) => {
        const memberExists = workgroupData.members.some(
            (member) => selectedUsers.includes(member.userId)
        );
    
        if (memberExists) {
            toast.error("One or more selected users are already in the workgroup!");
            return;
        }
    
        const names = users
            .filter((user) => selectedUsers.includes(user.id))
            .map((user) => user.fullName)
            .join(", ");
    
        const confirmDialog = ConfirmDialog({
            title: 'Confirm Addition',
            text: `Are you sure you want to add the following members: ${names}?`,
            onConfirm: async () => {
                if (roleType === "students") {
                    await addStudentsMutate({ students: selectedUsers, projectId: workgroupData.projectId });
                } else if (roleType === "co_supervisor") {
                    if (selectedUsers.length > 1) {
                        toast.error("You can't add more than one assistant at a time");
                        return;
                    }
                    await addAssistantsMutate({ assistants: selectedUsers, projectId: workgroupData.projectId });
                }
            },
            msgConfirm: `${names} have been successfully added.`,
            msgUnconfirm: `${names} were not added.`,
            action: 'Added',
        });
    
        confirmDialog.showConfirmDialog();
    };    

    // Handle row click to toggle selection
    const handleRowClick = (id) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    if (workgroupLoading) {
        return <CircularProgress />
    }
    // Table columns
    const columns = [
        { field: "fullName", headerName: "User Name", width: 200 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "role", headerName: "Role", width: 200 },
    ];
    const columnsMember = [
        { id: 'fullName', label: 'Full Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'role', label: 'Role', minWidth: 130 },
    ];
    // console.log(workgroupData)
    // console.log(users)
    // console.log(selectedUsers)
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Add Members to Workgroup
            </Typography>

            {isLoading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">Failed to load users</Typography>
            ) : (
                <Box sx={{ height: 400, width: "100%" }}> {/* التحكم بالأبعاد هنا */}
                    <DataGrid
                        rows={users || []}
                        columns={columns}
                        checkboxSelection
                        onRowClick={(params) => handleRowClick(params.row.id)} // عند النقر على الصف
                        onRowSelectionModelChange={(ids) => {
                            setSelectedUsers(ids);
                        }} // عند التحديد باستخدام checkbox
                        selectionModel={selectedUsers} // لعرض التحديد الحالي
                    />
                </Box>
            )}

            <Box sx={{ marginY: 2, display: "flex", gap: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => handleAddMembers("students")}
                    disabled={!selectedUsers.length}
                >
                    Add Students
                </Button>
                <Button
                    variant="contained"
                    onClick={() => handleAddMembers("co_supervisor")}
                    disabled={!selectedUsers.length}
                >
                    Add Assistant
                </Button>
            </Box>

            {/* All Members */}
            <Box sx={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
                <MemberTable
                    columns={[
                        ...columnsMember,
                        {
                            id: "actions",
                            label: "Actions",
                            minWidth: 150,
                        },
                    ]}
                    rows={workgroupData.members.map((member) => ({
                        ...member,
                        actions:
                            member.role === "student" || member.role === "co_supervisor" ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => {handleDeleteMember(member.userId, member.role, member.fullName, true)}}
                                >
                                    Remove
                                </Button>
                            ) : null,
                    }))}
                    title="Workgroup Members"
                />
            </Box>

        </Box>
    );
}
