import React, { useEffect,useState} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,  Card, CardMedia, CardContent,Grid , Box} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import {domain} from './config'

const NewsubordinateMain= ({ children }) => {
    const [subordinatesData, setSubordinatesData] = useState([]);
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


  fetch(`${domain}/users/referredUsers`, { credentials: 'include' })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    setSubordinatesData(data);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));



const [filter, setFilter] = useState('all');
const filteredSubordinatesData = subordinatesData.filter((subordinate) => {
  const registrationDate = subordinate.registrationTime ? subordinate.registrationTime.toDate() : new Date();
    const now = new Date();
  
    switch (filter) {
      case 'today':
        return registrationDate.getDate() === now.getDate() &&
          registrationDate.getMonth() === now.getMonth() &&
          registrationDate.getFullYear() === now.getFullYear();
      case 'thisWeek':
        const startOfWeek = now.getDate() - now.getDay();
        const endOfWeek = startOfWeek + 6;
        return registrationDate.getDate() >= startOfWeek &&
          registrationDate.getDate() <= endOfWeek &&
          registrationDate.getMonth() === now.getMonth() &&
          registrationDate.getFullYear() === now.getFullYear();
      case 'thisMonth':
        return registrationDate.getMonth() === now.getMonth() &&
          registrationDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });
  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1} sx={{backgroundColor: 'rgb(34,39,91)'}}>


            
<Grid
  container
  alignItems="center"
  justifyContent={isSmallScreen ? "center" : "space-between"}
  sx={{
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: 'Rgb(55,72,146)',
    padding: isSmallScreen ? '8px' : '8px 16px',
    color: 'white'
  }}
>
  <Grid item xs={6} textAlign={isSmallScreen ? "center" : "left"}>
    <span style={{ fontWeight: "bold" }}>New Subordinate</span>
  </Grid>
  <Grid item xs={6} textAlign={isSmallScreen ? "center" : "right"}>
    <IconButton color="inherit" onClick={() => navigate('/messages')}>
      <SmsIcon />
    </IconButton>
    <IconButton color="inherit">
      <DownloadIcon />
    </IconButton>
  </Grid>
</Grid>


<ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{margin: 1, display: isSmallScreen ? 'block' : 'flex', justifyContent: 'center'}}>
  <Button onClick={() => setFilter('today')}>Today</Button>
  <Button onClick={() => setFilter('thisWeek')}>This Week</Button>
  <Button onClick={() => setFilter('thisMonth')}>This Month</Button>
</ButtonGroup>


{filteredSubordinatesData.map((subordinate, index) => (
  <Box key={index} m={isSmallScreen ? 1 : 2} borderRadius={2}>
    <Card sx={{backgroundColor:"rgb(54,72,146)",color:"white"}}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <Typography variant="body1">
              {subordinate.mobile.replace(/.(?=.{4})/g, '*')}
            </Typography>
            <Typography variant="body2" >
              Direct Subordinate
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant="body1">
              {subordinate.uid}
            </Typography>
            <Typography variant="body2" >
              {subordinate.registrationTime ? subordinate.registrationTime.toDate().toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }) : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Box>
))}

            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default NewsubordinateMain;