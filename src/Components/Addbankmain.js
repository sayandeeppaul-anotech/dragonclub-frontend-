import React, { useEffect, useState } from 'react';
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Grid, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, makeStyles } from '@material-ui/core';
const { domain } = require('./config');

const useStyles = makeStyles((theme) => ({
  borderBox: {
    borderColor: theme.palette.common.white,
    border: '1px solid',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  textField: {
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
  header: {
    backgroundColor: 'rgba(34,39,91,0.9)',
    padding: theme.spacing(2),
  },
  headerText: {
    fontWeight: 'bold',
  },
  container: {
    marginTop: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ActivityMain = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const [bankDetails, setBankDetails] = useState(null);
  const [name, setName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [bankName, setBankName] = useState('');

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(`${domain}/user/bank-details/show`, {
          withCredentials: true
        });
        setBankDetails(response.data);
        setName(response.data.name);
        setAccountNo(response.data.accountNo);
        setIfscCode(response.data.ifscCode);
        setMobile(response.data.mobile);
        setBankName(response.data.bankName);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchBankDetails();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `https://111club.online/abclottery.apk`; 
    link.download = 'abclottery.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${domain}/user/bank-details`, {
        name,
        accountNo,
        ifscCode,
        mobile,
        bankName
      }, {
        withCredentials: true
      });
      console.log(response.data);
    } catch (err) {
      alert(err.response.data);
    }
  };

const [trxAddress, setTrxAddress] = useState('');
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${domain}/user/trxaddress-update`, {
        trxAddress
      }, {
        withCredentials: true
      });
      console.log(response.data);
    } catch (err) {
      alert(err.response.data);
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
          <Box className={classes.header}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'rgba(55,72,146,0.9)',
                padding: '8px 16px',
                color: 'white'
              }}
            >
              <Grid item xs={6} textAlign="left">
                <Typography variant="h6" className={classes.headerText}>Add Bank</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <IconButton color="inherit" onClick={() => navigate('/messages')}>
                  <SmsIcon />
                </IconButton>
                <IconButton style={{ color: 'white' }} onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          <Container className={classes.container}>
            <Box className={classes.borderBox}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField className={classes.textField} fullWidth type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField className={classes.textField} fullWidth type="text" placeholder="Account Number" value={accountNo} onChange={e => setAccountNo(e.target.value)} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField className={classes.textField} fullWidth type="text" placeholder="IFSC Code" value={ifscCode} onChange={e => setIfscCode(e.target.value)} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField className={classes.textField} fullWidth type="text" placeholder="Mobile" value={mobile} onChange={e => setMobile(e.target.value)} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField className={classes.textField} fullWidth type="text" placeholder="Bank Name" value={bankName} onChange={e => setBankName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth className={classes.button}>Submit</Button>
                </Grid>
              </Grid>
            </Box>
          </Container>


          <Container className={classes.container} >
            <Box className={classes.borderBox}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField className={classes.textField} fullWidth type="text" placeholder="Trx Address" value={trxAddress} onChange={e => setTrxAddress(e.target.value)} required />
                </Grid>
              
                <Grid item xs={12}>
                  <Button onClick={handleSubmit2} variant="contained" color="primary" fullWidth className={classes.button}>Submit</Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
       

          {children}
        </Box>
      </Mobile>
    </div>
  );
};

export default ActivityMain;
