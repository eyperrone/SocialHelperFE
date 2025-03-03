import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Box, Typography, Divider, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const CommentSection = ({ postId, comments = [], onAddComment }) => { // Imposta comments = [] di default
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (!user) {
      alert('Devi essere autenticato per aggiungere un commento.');
      return;
    }

    if (commentText.trim() !== '') {
      onAddComment(postId, { author: user.username, text: commentText });
      setCommentText('');
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 2, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Commenti</Typography>

      {/* Campo di input per i commenti */}
      {user && (
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="Scrivi un commento..."
            variant="outlined"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddComment}>
            Invia
          </Button>
        </Box>
      )}

      {/* Lista commenti */}
      <List>
        {comments.length === 0 ? (
          <Typography variant="body2" color="textSecondary">Nessun commento ancora.</Typography>
        ) : (
          comments.map((comment, index) => (
            <Box key={index}>
              <ListItem>
                <ListItemText primary={comment.text} secondary={`Autore: ${comment.author}`} />
              </ListItem>
              {index !== comments.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </List>
    </Paper>
  );
};

export default CommentSection;
