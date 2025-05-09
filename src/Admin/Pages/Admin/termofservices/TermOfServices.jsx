import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Card,
  CardContent,
  Box,
  Typography,
  Snackbar,
  Divider,
  CircularProgress,
  Container,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTerms, postTerm, deleteTerm, putTerm } from '../../../../util/http for admin/http.js';

const styles = {
  title: {
    mr: 10,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '700',
    color: '#1E88E5',
    marginBottom: '20px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '600',
    color: '#424242',
    marginBottom: '15px',
    textAlign: 'center', // توسيط العنوان الفرعي
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // توسيط العنوان الفرعي
    borderBottom: '3px solid #1E88E5',
    paddingBottom: '5px',
  },
  paragraph: {
    marginBottom: '20px',
    lineHeight: '1.8',
    color: '#616161',
    fontFamily: "'Roboto', sans-serif",
  },
  button: {
    backgroundColor: '#FF6F61',
    color: '#fff',
    fontWeight: '600',
    padding: '10px 30px',
    borderRadius: '30px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#E64A19',
    },
  },
  deleteButton: {
    backgroundColor: '#E64A19',
    color: '#fff',
    fontWeight: '600',
    padding: '10px 30px',
    borderRadius: '30px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#D32F2F',
    },
    marginLeft: '10px',
  },
  card: {
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    marginBottom: '30px',
    padding: '25px',
  },
  divider: {
    margin: '20px 0',
    backgroundColor: '#1E88E5',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
};

export default function TermOfServices() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const queryClient = useQueryClient();

  const { data: termsData, error, isLoading } = useQuery({
    queryKey: ['terms'],
    queryFn: fetchTerms,
  });

  const createOrUpdateMutation = useMutation({
    mutationFn: isCreating ? postTerm : putTerm,
    onSuccess: () => {
      queryClient.invalidateQueries('terms');
      setSnackbarMessage('Your changes have been saved.');
      setOpenSnackbar(true);
      setShowModal(false);
    },
    onError: (error) => {
      setSnackbarMessage(error.message || 'Failed to save changes.');
      setOpenSnackbar(true);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTerm,
    onSuccess: () => {
      queryClient.invalidateQueries('terms');
      setSnackbarMessage('Term deleted successfully.');
      setOpenSnackbar(true);
    },
    onError: (error) => {
      setSnackbarMessage(error.message || 'Failed to delete term.');
      setOpenSnackbar(true);
    },
  });

  const handleEdit = () => {
    if (termsData?.result?.[0]) {
      const term = termsData.result[0];
      setModalTitle(term.title);
      setModalDescription(term.description);
    }
    setIsCreating(false);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!modalTitle.trim() || !modalDescription.trim()) {
      setSnackbarMessage('Title and description cannot be empty.');
      setOpenSnackbar(true);
      return;
    }

    const termData = {
      title: modalTitle,
      description: modalDescription,
    };

    if (isCreating) {
      createOrUpdateMutation.mutate(termData);
    } else {
      const existingTermId = termsData?.result?.[0]?.id;
      if (existingTermId) {
        const term = {
          id: existingTermId,
          termData: termData,
        };

        createOrUpdateMutation.mutate(term);
      } else {
        setSnackbarMessage('Term not found for update.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleDelete = () => {
    const existingTermId = termsData?.result?.[0]?.id;
    if (existingTermId) {
      deleteMutation.mutate(existingTermId);
    } else {
      setSnackbarMessage('Term not found for deletion.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const hasTerms = termsData?.result?.length > 0;

  return (
    <Container>
      <Box sx={{ mt: 12, mx: 'auto', maxWidth: '100%', width: { xs: '100%', md: '80rem' } }}>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          flexDirection="column" 
          mb={4}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              ...styles.title, 
              fontSize: { xs: '1.8rem', md: '2.5rem' }, 
              textAlign: 'center', 
              width: '100%', 
            }}
          >
            Terms Of Services
          </Typography>
        
          {!hasTerms && (
            <Button 
              variant="contained" 
              sx={{ ...styles.button, mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }} 
              onClick={() => { setIsCreating(true); setShowModal(true); }}
            >
              Create Term of Services
            </Button>
          )}
        </Box>
  
        <Card sx={styles.card}>
          <CardContent>
            <Typography variant="h5" sx={styles.sectionTitle}>
              {hasTerms ? termsData?.result[0]?.title : 'No title available.'}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center">
              Last updated: {termsData?.result?.[0]?.lastUpdatedAt ? new Date(termsData?.result[0]?.lastUpdatedAt).toLocaleString() : 'N/A'}
            </Typography>
            <Divider sx={styles.divider} />
  
            {isLoading ? (
              <Box sx={styles.loader}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error">Failed to load Terms of Services. Please try again later.</Typography>
            ) : (
              <>
                <Typography 
                  variant="body1" 
                  sx={{ ...styles.paragraph, whiteSpace: 'pre-wrap', mt: 2, fontSize: { xs: '1rem', md: '1.2rem' } }}
                >
                  {termsData?.result?.[0]?.description || 'No terms available.'}
                </Typography>
  
                <Typography variant="body2" color="textSecondary">
                  Created By: {termsData?.result[0]?.createdBy || 'N/A'}
                </Typography>
  
                <Typography variant="body2" color="textSecondary" mt={1}>
                  Created At: {termsData?.result[0]?.createdAt ? new Date(termsData?.result[0]?.createdAt).toLocaleString() : 'N/A'}
                </Typography>
  
                <Typography variant="body2" color="textSecondary" mt={1}>
                  Updated By: {termsData?.result[0]?.updatedBy || 'N/A'}
                </Typography>
              </>
            )}
  
            {hasTerms && (
              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center" mt={4} gap={2}>
                <Button variant="contained" sx={{ ...styles.button, width: { xs: '100%', sm: 'auto' } }} onClick={handleEdit}>
                  Edit
                </Button>
                <Button variant="contained" sx={{ ...styles.deleteButton, width: { xs: '100%', sm: 'auto' } }} onClick={handleDelete}>
                  Delete
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
  
        <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth>
          <DialogTitle>{isCreating ? 'Create Term of Services' : 'Edit Term of Services'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              margin="normal"
              value={modalTitle}
              onChange={(e) => setModalTitle(e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              value={modalDescription}
              onChange={(e) => setModalDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)} color="secondary">Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
  
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </Container>
  );
}