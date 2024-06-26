import React, { useEffect} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,Grid , Box} from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import {domain} from './config'

const Coupenmainuser = ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const [couponCode, setCouponCode] = useState('');
  console.log(couponCode);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post(`${domain}/redeem-coupon`, { code: couponCode }, { withCredentials: true });
        alert(response.data);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert(error.response.data.message);
        } else if (error.request) {
            // The request was made but no response was received
            alert('No response received from the server.');
        } else {
            // Something happened in setting up the request that triggered an Error
            alert('Error', error.message);
        }
    }
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
                backgroundColor: 'RGB(54,142,255)',
                padding: '8px 16px',
                color: 'white'
                
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Redeem </span>
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


             <Box sx={{ backgroundColor: 'RGB(54,142,255)', padding: 2 }}>
    <img src="assets/images/gift-0e49be1a.png" alt="coupon" style={{ width: '100%' }} />
      <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 1 }}>
      <Typography variant="body1" gutterBottom align="left">
  Hi
</Typography>
<Typography variant="body1" gutterBottom align="left">
  We have a gift for you
</Typography>
<Typography variant="body1" gutterBottom align="left">
  Please Enter the Coupon Code
</Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            width: '95%',
            marginLeft: '10px',
          }}
        >

<TextField
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            placeholder="Coupon Code"
            required
            variant="outlined"
            style={{ marginBottom: '10px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ backgroundColor: 'RGB(54,142,255)', '&:hover': { backgroundColor: 'RGB(54,142,255)' } }}
          >
            Apply Coupon
          </Button>
        </form>
      </Box>
    </Box>
            
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default Coupenmainuser;