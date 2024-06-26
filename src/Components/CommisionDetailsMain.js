import React, { useEffect, useState } from 'react';
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,  Card, CardContent,Grid , Box,CardHeader} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {domain} from './config';

const CommisionDetailsMain = ({ children }) => {
  
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);
 
 
  
  const [userData, setUserData] = useState(null);
  console.log(userData);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${domain}/commission-levelwise`, { withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);


  const [selectedGame, setSelectedGame] = useState('Lottery');
  const navigate = useNavigate();
  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1}>


            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'rgb(34,39,91)',
                padding: '8px 16px',
                color: 'white'
                
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Commision Details</span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <IconButton color="inherit" onClick={() => navigate('/messages')}>
  <SmsIcon />
</IconButton>
                <IconButton color="inherit">
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>

            <select style={{marginTop: '1em', width: '95%', fontSize: '20px', color: 'white', backgroundColor: 'transparent', borderColor: 'white'}} onChange={(event) => setSelectedGame(event.target.value)}>
  <option value='All'>All</option>
  <option value='Lottery'>Lottery</option>
  <option value='K3 Game'>Slots</option>
  <option value='Casino'>Casino</option>
  <option value='PVC'>PVC</option>
</select>

            <Card sx={{ borderRadius: '15px', padding: '10px', backgroundColor: 'rgb(55,74,148)', marginTop: '16px',marginLeft:"auto",marginRight:"auto", width:"90%" }}>
  <CardHeader
    title="Lottery"
    titleTypographyProps={{ align: 'center', variant: 'h6' }}
    style={{ backgroundColor: 'rgb(55,74,148)', color: 'white', height: '40px', lineHeight: '40px' }}
  />
  <CardContent>
  <Grid container spacing={2}>
  {Object.entries(userData || {}).map(([level, value]) => (
    <React.Fragment key={level}>
      <Grid item xs={6} style={{ backgroundColor: 'rgb(55,74,148)', marginTop: '10px',padding:"10px" }}>
        <Typography variant="caption" sx={{color:"white"}}>Level {level}:</Typography>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'right', backgroundColor: 'rgb(55,74,148)', marginTop: '10px', color: 'red',padding:"10px" }}>
        <Typography variant="caption">₹{value}</Typography>
      </Grid>
    </React.Fragment>
  ))}
</Grid>
  </CardContent>
</Card>
           
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default CommisionDetailsMain;