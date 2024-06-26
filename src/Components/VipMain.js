import React, { useEffect} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,  Card, CardMedia, CardContent,Grid , Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Vip from './vip/VipMain';


const VipMain= ({ children }) => {

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
    navigate('/coupen-user'); 
  };
  const navigateToPage3 = () => {
    navigate('/attendance');
  };
 

  const handleDownload = () => {
    // Programmatically click the hidden anchor tag
    const link = document.createElement('a');
    link.href = `https://111club.online/abclottery.apk`; // Change this to the actual path of the APK file on your server
    link.download = 'abclottery.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <Box flexGrow={1} sx={{backgroundColor: 'rgb(34,39,91)'}}>


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
                <span style={{ fontWeight: "bold" }}>VIP</span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <IconButton color="inherit" onClick={() => navigate('/messages')}>
  <SmsIcon />
</IconButton>
<IconButton style={{color:"white"}} onClick={handleDownload}>
        <DownloadIcon />
      </IconButton>
              </Grid>
            </Grid>

            {/* //content */}

           
    <Vip/>
    
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default VipMain;