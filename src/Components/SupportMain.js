import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, Grid, Box, IconButton, Typography, Paper } from '@mui/material';
import Mobile from '../Components/Mobile';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import { domain } from './config';

const ActivityMain = ({ children }) => {

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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `https://111club.online/abclottery.apk`; 
    link.download = 'abclottery.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState([]);
  const [mobile, setMobile] = useState('');



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/user`, { withCredentials: true });
        setMobile(response.data.mobile);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  const fetchTickets = async () => {
    const response = await axios.get(`${domain}/tickets`, { withCredentials: true });
    setTickets(response.data);
  };
  
  useEffect(() => {
    fetchTickets();
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`${domain}/tickets`, { message,mobile }, { withCredentials: true });
    setMessage('');
    fetchTickets();
  };

  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1} sx={{ backgroundColor: 'rgb(34,39,91)' }}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'Rgb(55,72,146)',
                padding: '8px 16px',
                color: 'white'
              }}
            >
              <Grid item xs={6} textAlign="left">
                <Typography variant="h6" fontWeight="bold">Support</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <IconButton color="inherit" onClick={() => navigate('/messages')}>
                  <SmsIcon />
                </IconButton>
                <IconButton style={{ color: "white" }} onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
           
            <Box sx={{ 
  width: "90%", 
  margin: "auto", 
  mt: 2, 
  overflowY: 'auto', 
  maxHeight: '60vh',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  msOverflowStyle: 'none',  /* IE and Edge */
  scrollbarWidth: 'none'  /* Firefox */
}}>
  <List>
    {tickets.map((ticket) => (
      <ListItem key={ticket._id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1 }}>
        <Paper elevation={3} sx={{ p: 2, backgroundColor: 'rgb(55,72,146)', color: 'white', borderRadius: 3 }}>
          <Typography variant="body1" color="inherit">
            {ticket.message}
          </Typography>
        </Paper>
        {ticket.replies.map((reply, replyIndex) => (
          <Paper key={replyIndex} elevation={3} sx={{ p: 2, backgroundColor: 'rgb(34, 153, 84)', color: 'white', borderRadius: 3, alignSelf: 'flex-end', mt: 1 }}>
            <Typography variant="body2" color="inherit">
              {reply.message}
            </Typography>
          </Paper>
        ))}
      </ListItem>
    ))}
  </List>
</Box>
            <Box sx={{ width: "90%", margin: "auto", mt: 2 }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: 1 }}
                  InputProps={{
                    style: { color: 'white' },
                  }}
                />
                <Button type="submit" variant="contained" color="primary">
                  Send Ticket
                </Button>
              </form>
            </Box>
            {children}
          </Box>
        </Box>
      </Mobile>
    </div>
  );
};

export default ActivityMain;
