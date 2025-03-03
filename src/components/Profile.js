import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Reindirizza alla pagina di login
  };

  if (!user) {
    return <Typography variant="h6" align="center">Effettua il login per accedere al profilo.</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5">Profilo Utente</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Benvenuto, <strong>{user.username}</strong>!
          </Typography>
          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 3 }} onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;