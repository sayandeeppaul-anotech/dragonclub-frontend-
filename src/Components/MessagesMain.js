import React, { useEffect, useState } from 'react';
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography, Card, CardContent, Grid, Box, Container, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { domain } from './config';

const MessagesMain = ({ children }) => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const navigate = useNavigate();
  const navigateToPage2 = () => {
    navigate('/coupen-user'); // Replace '/path-to-page' with the actual path
  };

  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/notifications`, { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
          sx={{ bgcolor: '#f4f6f8' }}
        >
          <AppBar position="sticky" sx={{ bgcolor: 'rgb(42,50,112)' }}>
            <Toolbar>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={6} textAlign="left">
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Notifications
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <IconButton color="inherit">
                    <SmsIcon />
                  </IconButton>
                  <IconButton color="inherit">
                    <DownloadIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Container>
            {user && user.notifications.map((notification, index) => (
              <Card
                key={index}
                sx={{
                  mt: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Grid container direction="column" spacing={2}>
                    <Grid item container direction="row" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="h6" component="div">
                          {notification.title}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(notification.date).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" color="text.secondary">
                        {notification.message}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Container>

          {children}
        </Box>
      </Mobile>
    </div>
  );
};

export default MessagesMain;
