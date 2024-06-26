import React, { useState, useEffect } from 'react';
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import {Button } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,Grid , Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import axios from 'axios';
import {domain} from './config'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const InviteMain= ({ children }) => {
const [invitationLink, setInvitationLink] = useState('');
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/user`, { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);


  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(user.referralLink);
      handleOpenSnackbar();
    } catch (err) {
      console.error('Failed to copy invitation link: ', err);
    }
  };

  const handleDownload = () => {
    const div = document.getElementById('divToDownload');
  
    html2canvas(div).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'invitation.png');
      });
    });
  };


  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
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
          <Box flexGrow={1}>


            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'rgb(55,72,146)',
                padding: '8px 16px',
                color: 'white'
                
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Invite Link</span>
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

            {/* //content */}

            <div id="divToDownload"
       style={{
        backgroundImage: 'url(assets/images/poster-e8284649.png)',
        backgroundSize: '100% 100%', // Stretch the image to fit the div
        backgroundRepeat: 'no-repeat',
        minHeight: '40vh',
        padding: '20px',
        marginLeft: '25px',
        marginRight: '25px',
        marginTop: '20px',
        backgroundColor:"rgb(55,72,146)"
      }}
     
      
    >
      <Grid container spacing={2} >
        {/* First Row */}
       
        {/* Second Row */}
        {/* Second Row */}
<Grid container item xs={12} direction="row" justifyContent="center">

</Grid>
       {/* Third Row */}
<Grid item xs={12} sx={{ textAlign: 'center' }}>
  <Typography variant="h4" style={{ color: 'white', fontWeight: 'bold' }}>Full Odds Bonus Rates</Typography>
</Grid>
{/* Fourth Row */}
<Grid container item xs={12} spacing={2}>
  <Grid item xs={6}>
    <Box sx={{ border: 1, borderColor: 'white', p: 2 }}>
      <img src="assets/images/downloadinvi.png" alt="image1" />
      <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold',fontSize:"20px" }}>Financial security </Typography>
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Box sx={{ border: 1, borderColor: 'white', p: 2 }}>
      <img src="assets/images/download (18).png" alt="image2" />
      <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold',fontSize:"20px" }}>Quick withdrawl</Typography>
    </Box>
  </Grid>
</Grid>
{/* Fifth Row */}
<Grid item xs={12} sx={{ textAlign: 'center' }}>
  <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>Permanent commission upto 85%</Typography>
</Grid>
{/* Sixth Row */}
<Grid item xs={12} sx={{ textAlign: 'center' }}>
  <QRCode value={invitationLink} />
</Grid>
      </Grid>
    </div>

    <Grid container spacing={2} sx={{
         marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        marginTop: '20px',
        marginBottom:"150px"}}>
     <Grid item xs={12}>
     <Button variant="contained" fullWidth onClick={handleDownload} style={{ backgroundColor: 'rgb(55,72,146)' }}>
  Invitation Link
</Button>
</Grid>
      <Grid item xs={12}>
  <Button variant="outlined" fullWidth onClick={handleCopyLink}>
    Copy Invitation Link
  </Button>
</Grid>
    </Grid>

    <Snackbar 
  open={openSnackbar} 
  autoHideDuration={1000} 
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
  sx={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }}
>
  
<MuiAlert 
  onClose={handleCloseSnackbar} 
  severity="success" 
  sx={{ 
    width: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    color: 'white',
  }}
>
  Invitation link copied successfully!
</MuiAlert>
</Snackbar>
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default InviteMain;