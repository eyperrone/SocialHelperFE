import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Modal, Box, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddPost = ({ onAddPost }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Devi essere autenticato per creare un post.');
      return;
    }
    if (title && description) {
      onAddPost({ title, description, author: user.username });
      handleClose();
    }
  };

  return (
    <>
      {/* Pulsante Floating per Aprire il Modale */}
      {user && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpen}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: '#007bff',
            '&:hover': { backgroundColor: '#0056b3' },
          }}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Modale per Creare il Post */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>Crea un nuovo Post</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Titolo"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Descrizione"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="outlined" onClick={handleClose}>Annulla</Button>
              <Button type="submit" variant="contained" color="primary">Crea</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddPost;
