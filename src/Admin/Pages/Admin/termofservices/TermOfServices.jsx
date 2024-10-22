import React, { useState, useEffect } from 'react';
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
  CircularProgress, // استيراد اللودر
} from '@mui/material';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx';

const styles = {
  title: {
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
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '3px solid #1E88E5',
    paddingBottom: '5px',
  },
  paragraph: {
    marginBottom: '20px',
    lineHeight: '1.8',
    color: '#616161',
    fontFamily: "'Roboto', sans-serif",
  },
  list: {
    marginBottom: '20px',
    paddingLeft: '20px',
    color: '#616161',
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
  const [termsText, setTermsText] = useState(() => {
    return localStorage.getItem('termsText') || `Acceptance of Terms
By accessing or using the Student Project Center System ("the System"), you agree to be bound by these Terms of Service ("Terms").
If you do not agree to these Terms, please do not use the System.
...`;
  });

  const [lastUpdated, setLastUpdated] = useState(() => {
    return localStorage.getItem('lastUpdated') || 'May 2024';
  });

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState(termsText);
  const [isCreating, setIsCreating] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false); // حالة التحميل

  useEffect(() => {
    localStorage.setItem('termsText', termsText);
  }, [termsText]);

  useEffect(() => {
    localStorage.setItem('lastUpdated', lastUpdated);
  }, [lastUpdated]);

  const handleEdit = () => {
    setIsCreating(false);
    setModalText(termsText);
    setShowModal(true);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setModalText('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!modalText.trim()) {
      setSnackbarMessage('Terms of service text cannot be empty.');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true); // بدء التحميل

    try {
      if (isCreating) {
        setTermsText((prevText) => prevText + '\n\n' + modalText);
      } else {
        setTermsText(modalText);
      }

      const currentDate = new Date().toLocaleString();
      setLastUpdated(currentDate);

      setShowModal(false);
      setSnackbarMessage('Your changes have been saved.');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Failed to save changes.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Dashboard>
      <Box sx={{ mt: 5, mx: 'auto', maxWidth: 'lg' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" sx={styles.title}>
            Terms Of Services
          </Typography>
          <Button variant="contained" sx={styles.button} onClick={handleCreate}>
            Create Term of Services
          </Button>
        </Box>

        <Card sx={styles.card}>
          <CardContent>
            <Typography variant="h5" sx={styles.sectionTitle}>
              Terms of Service
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center">
              Last updated: {lastUpdated}
            </Typography>
            <Divider sx={styles.divider} />
            {loading ? ( // عرض اللودر أثناء التحميل
              <Box sx={styles.loader}>
                <CircularProgress />
              </Box>
            ) : (
              <Typography variant="body1" component="pre" sx={{ ...styles.paragraph, whiteSpace: 'pre-wrap', mt: 2 }}>
                {termsText}
              </Typography>
            )}
            <Box display="flex" justifyContent="center" mt={4}>
              <Button variant="contained" sx={styles.button} onClick={handleEdit}>
                Edit
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Dialog for adding or editing the terms */}
        <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth>
          <DialogTitle>{isCreating ? 'Create Term of Services' : 'Edit Term of Services'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Terms of Services Text"
              multiline
              rows={10}
              fullWidth
              value={modalText}
              onChange={(e) => setModalText(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} sx={styles.button}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </Dashboard>
  );
}
