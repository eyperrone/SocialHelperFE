import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import CommentSection from './CommentSection';

const PostItem = ({ post, onDelete, onEdit, onLike, onAddComment }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [likes, setLikes] = useState(post.likes || 0);

  const handleEdit = () => {
    if (!onEdit) {
      console.error("Errore: onEdit non è stato passato come prop a PostItem");
      return;
    }
    
    if (isEditing && user?.username === post.author) {
      onEdit(post.id, { title: editedTitle, description: editedDescription });
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    if (!onDelete) {
      console.error("Errore: onDelete non è stato passato come prop a PostItem");
      return;
    }

    if (user?.username === post.author) {
      onDelete(post.id);
    } else {
      alert('Puoi eliminare solo i tuoi post.');
    }
  };

  const handleLike = () => {
    if (!onLike) {
      console.error("Errore: onLike non è stato passato come prop a PostItem");
      return;
    }

    if (user) {
      setLikes(likes + 1);
      onLike(post.id);
    } else {
      alert('Devi essere autenticato per mettere like.');
    }
  };

  return (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <CardContent>
        {isEditing ? (
          <Box>
            <TextField
              label="Titolo"
              fullWidth
              variant="outlined"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Descrizione"
              fullWidth
              variant="outlined"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mt: 2 }}>
              Salva
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {post.description}
            </Typography>
          </>
        )}
        <Typography variant="caption">Autore: {post.author}</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleLike} sx={{ mr: 2 }}>
            👍 Like ({likes})
          </Button>
          {user && user.username === post.author && (
            <>
              <Button variant="outlined" color="warning" onClick={handleEdit} sx={{ mr: 2 }}>
                {isEditing ? 'Annulla' : 'Modifica'}
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                ❌ Elimina
              </Button>
            </>
          )}
        </Box>
        <CommentSection postId={post.id} comments={post.comments} onAddComment={onAddComment} />
      </CardContent>
    </Card>
  );
};

export default PostItem;