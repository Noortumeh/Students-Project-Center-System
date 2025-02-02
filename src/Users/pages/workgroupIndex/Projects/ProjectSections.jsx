import { Add, Delete, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Collapse, Container, Divider, Grid, IconButton, List, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { addSubSection, deleteSection, deleteSubSection, updateSection, updateSubSection } from "./httpProjects";
import { queryClient } from "../../../../util/httpsForUser/https";

export default function ProjectSections({ data, projectId, isSupervisor, isStudent }) {
    const [sectionDetails, setSectionDetails] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [newName, setNewName] = useState("");
    const [editingSub, setEditingSub] = useState(false);
    const [newDescription, setNewDescription] = useState("");
    const [newIcon, setNewIcon] = useState(null);
    const [openSubDialog, setOpenSubDialog] = useState(false);
    const [newSubSection, setNewSubSection] = useState({ title: "", description: "" });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewIcon(file)
        }
    };

    const handleEditClick = (section, isSub = false) => {
        setSelectedSection(section);
        setNewName(section.sectionName || section.title);
        setNewDescription(section.description || "");
        setNewIcon(section.imagePath || "");
        setEditingSub(isSub);
        setOpenDialog(true);
    };

    const { mutate: mutationDeleteSection } = useMutation({
        mutationFn: deleteSection,
        onSuccess: () => {
            toast.success('Delete Section successfuly')
            queryClient.invalidateQueries({ queryKey: ['projectDetails', projectId] });
        }
    });
    const { mutate: mutationUpdateSection } = useMutation({
        mutationFn: updateSection,
        onSuccess: () => {
            toast.success('Updated Section Name successfuly')
            queryClient.invalidateQueries({ queryKey: ['projectDetails', projectId] });
            setSelectedSection(null)
            setNewName('')
        }
    });
    const { mutate: mutationDeleteSubSection } = useMutation({
        mutationFn: deleteSubSection,
        onSuccess: () => {
            toast.success('Deleted subsection successfuly')
            queryClient.invalidateQueries({ queryKey: ['projectDetails', projectId] });
        }
    });
    const { mutate: mutationUpdateSubSection } = useMutation({
        mutationFn: updateSubSection,
        onSuccess: () => {
            toast.success('Updated subsection successfuly')
            queryClient.invalidateQueries({ queryKey: ['projectDetails', projectId] });
            setSelectedSection(null)
            setNewName('')
            setNewDescription('')
            setNewIcon('')
            setEditingSub(false);
        }
    });
    const { mutate: mutationAddSubSection } = useMutation({
        mutationFn: addSubSection,
        onSuccess: () => {
            toast.success('Added subsection successfuly')
            queryClient.invalidateQueries({ queryKey: ['projectDetails', projectId] });
            setSelectedSection(null)
            setNewSubSection({ title: "", description: "" })
        }
    });

    const handleDeleteClick = (section, isSub = false) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                if (isSub) {
                    mutationDeleteSubSection(section.id);
                } else {
                    mutationDeleteSection(section.sectionId);
                }
            }
        });
    };

    const handleSaveEdit = () => {
        if (editingSub) {
            const formData = new FormData();
            formData.append('title', newName);
            formData.append('description', newDescription);
            formData.append('image', newIcon);
            mutationUpdateSubSection({ id: selectedSection.id, formData: formData });
        } else {
            mutationUpdateSection({ sectionId: selectedSection.sectionId, newName });
        }
        setOpenDialog(false);
    };

    const handleAddClick = (sectionId) => {
        setSelectedSection(sectionId);
        setOpenSubDialog(true);
    };

    const handleSaveSubSection = () => {
        const formData = new FormData();
        formData.append('title', newSubSection.title);
        formData.append('description', newSubSection.description);
        formData.append('image', newIcon);
        mutationAddSubSection({
            sectionId: selectedSection,
            subSectionData: formData,
        });
        setOpenSubDialog(false);
    };
    console.log(data)
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, color: '#3f51b5' }}>Existing Project Sections</Typography>
            {data?.length > 0 ? (
                <List>
                    {data.map((section) => (
                        <Box key={section.sectionId} sx={{ mb: 3 }}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography variant="h6">{section.sectionName}</Typography>
                                        <Box>
                                            {isSupervisor &&
                                                <>
                                                    <IconButton color="primary" onClick={() => handleEditClick(section)}>
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton color="error" onClick={() => handleDeleteClick(section)}>
                                                        <Delete />
                                                    </IconButton>
                                                </>
                                            }
                                            {isStudent &&
                                                <IconButton color="primary" onClick={() => handleAddClick(section.sectionId)}>
                                                    <Add />
                                                </IconButton>
                                            }
                                            <IconButton onClick={() => {
                                                setSectionDetails(prev => ({ ...prev, [section.sectionName]: !prev[section.sectionName] }))
                                            }}>
                                                {sectionDetails[section.sectionName] ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    <Collapse in={sectionDetails[section.sectionName]}>
                                        {section.details.map((detail) => (
                                            <Box key={detail.id} sx={{ pl: 4, mt: 2 }}>
                                                <Card>
                                                    <CardContent>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                                            {detail.imagePath && <img src={detail.imagePath} alt="icon" width={200} height={200} />}
                                                            <Box sx={{ ml: 3 }}>
                                                                <Typography variant="h6">{detail.title}</Typography>
                                                                <Typography variant="body2" color="text.secondary">{detail.description}</Typography>
                                                            </Box>
                                                        </Box>
                                                        {isStudent &&
                                                            <Box sx={{ mt: 2 }}>
                                                                <IconButton color="primary" onClick={() => handleEditClick(detail, true)}>
                                                                    <Edit />
                                                                </IconButton>
                                                                <IconButton color="error" onClick={() => handleDeleteClick(detail, true)}>
                                                                    <Delete />
                                                                </IconButton>
                                                            </Box>
                                                        }
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        ))}
                                    </Collapse>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">No sections found.</Typography>
            )}
            {/* Edit Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{editingSub ? "Edit Sub-Section" : "Edit Section Name"}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Name" fullWidth value={newName} onChange={(e) => setNewName(e.target.value)} />
                    {editingSub && (
                        <>
                            <TextField multiline minRows={4} variant="outlined" margin="dense" label="Description" fullWidth value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSaveEdit}>Save</Button>
                </DialogActions>
            </Dialog>
            {/* Add Dialog */}
            <Dialog open={openSubDialog} onClose={() => setOpenSubDialog(false)}>
                <DialogTitle>Add New Sub-Section</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Title" fullWidth value={newSubSection.title} onChange={(e) => setNewSubSection({ ...newSubSection, title: e.target.value })} />
                    <TextField multiline minRows={4} variant="outlined" margin="dense" label="Description" fullWidth value={newSubSection.description} onChange={(e) => setNewSubSection({ ...newSubSection, description: e.target.value })} />
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSubDialog(false)}>Cancel</Button>
                    <Button onClick={handleSaveSubSection}>Add</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}