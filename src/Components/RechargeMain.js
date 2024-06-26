import React, { useEffect,useState, useRef} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Typography, Button,Grid,TextField, List, ListItem, ListItemText} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from 'axios';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import {domain} from './config'

const PromotionMain = ({ children }) => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const timerRef = useRef(null);
  const [amount, setAmount] = useState('');

  const handleButtonClick = (value) => {
    setAmount(value);
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };

  const [walletData, setWalletData] = useState(0);
  const [openDepositDialog, setOpenDepositDialog] = useState(false);
  const [utr, setUtr] = useState('');
  const [utrAlert, setUtrAlert] = useState(false);
  const [duplicateUtrAlert, setDuplicateUtrAlert] = useState(false);
  const [depositRequests, setDepositRequests] = useState([]);
  const handleUtrChange = (event) => {
    setUtr(event.target.value);
  };

  const [paymentMode, setPaymentMode] = useState('UPI x QR');
  const [userData, setUserData] = React.useState(null);


  const sendDepositRequest = async () => {
    if (!utr) {
      setUtrAlert(true);
      return;
    }
  
    // Call your createDeposit endpoint
    const response = await fetch(`${domain}/createDeposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Changed from "true" to "include"
      body: JSON.stringify({
        amount: amount,
        depositId: utr,
        depositMethod: paymentMode,
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setOpenDepositDialog(false);
    } else {
      console.error("Failed to create deposit");
    }
  };


  
  useEffect(() => {
    if (openDepositDialog) {
      timerRef.current = setInterval(() => {
        setRemainingTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRemainingTime(300);
    }

    return () => clearInterval(timerRef.current);
  }, [openDepositDialog]);

  useEffect(() => {
    if (remainingTime === 0) {
      setOpenDepositDialog(false);
    }
  }, [remainingTime]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

 // make a random 10 digit transaction id
  const transaction = Math.floor(1000000000 + Math.random() * 9000000000);
  const [paymentUrl, setPaymentUrl] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      const response = await axios.post(`${domain}/deposit`, { am: amount, user: user.username, orderid: transaction, depositMethod: paymentMode }, { withCredentials: true });
      if (response.status === 200) {
          const payUrl = response.data.payParams.payUrl;
          setPaymentUrl(payUrl);
          window.location.href = payUrl;
      } 
      } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server Error:', error.response.data);
            console.error('Status Code:', error.response.status);
            console.error('Response Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }
        alert('Payment request failed. Please try again Or Wrong Details.');
    }
};

const [upiId, setUpiId] = useState('best4world6677@okaxis');
const [usdtWalletAddress, setUsdtWalletAddress] = useState('');

// Fetch UPI ID and USDT Wallet Address from Firestore

const [ user, setUser ] = useState(null);

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

const [get1, setGet1] = useState('');
const [get2, setGet2] = useState('');
const handleGet = () => {
  axios.get(`${domain}/Getid`, { withCredentials: true })
      .then((res) => {
          
            setGet1(res.data.Upi);
            setGet2(res.data.Trx);
      })
      .catch((error) => {
          console.error(error);
      });
};

handleGet();
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
                backgroundColor: 'rgb(42,50,112)',
                padding: '8px 16px',
                color: 'white'
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Deposit</span>
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

           
           
            <Grid
      container
      mt={2}
      style={{
        backgroundImage: `url('assets/images/TotalAssetsBg-a7cff097.png')`,
        borderRadius: 8,
        padding: 16,
        backgroundSize: 'cover',
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '150px',
      }}
    >
      <Grid container item alignItems="center">
        <Grid item xs={3}  align="center">
          <img src="assets/images/download (16).png" alt="Your Image" style={{ maxWidth: '20%' }} />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body1" sx={{color:"white"}} align="left">Balance</Typography>
        </Grid>
      </Grid>
      <Grid container item alignItems="center">
        <Grid item xs={4}>
          <Typography variant="body1"  sx={{color:"white"}} align="center"> {`\u20B9${user ? user.walletAmount : " Loading"}`}</Typography>
        </Grid>
        <Grid item xs={8} style={{ textAlign: 'left' }}>
          <IconButton>
            <RefreshIcon style={{color:"white"}} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container item alignItems="center" style={{ marginTop: 16 }}>
        <Grid item xs={3}>
       
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body1"  sx={{color:"white"}} align="right"></Typography>
        </Grid>
      </Grid>
    </Grid>


    <Grid container spacing={1}  mt={0} style={{
     width: '97%',
     marginLeft: 'auto',
     marginRight: 'auto',
}}>
  {['USDT', 'UPI x QR', 'UPIxPAYTM'].map((mode) => (
    <Grid item xs={4} key={mode}>
      <div 
        style={{ 
          backgroundColor: paymentMode === mode ? 'rgb(40,164,242)' : 'rgb(55,72,146)', 
          borderRadius: 8, 
          color:"white",
          padding: 16 ,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' 
        }}
        onClick={() => setPaymentMode(mode)}
      >
        <img src={`assets/images/${mode}.png`} alt={mode} style={{ display: 'block', margin: '0 auto', maxWidth: '50%', borderRadius: '50%' }} />
        <Typography variant="caption" align="center" style={{ marginTop: 8 }}>{mode}</Typography>
      </div>
    </Grid>
  ))}
</Grid>

    <Grid container spacing={1} mt={1} style={{
         width: '97%',
         marginLeft: 'auto',
         marginRight: 'auto',
         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',backgroundColor:"rgb(42,50,112)", borderRadius:"10px"}}>
      <Grid container item alignItems="center">
        <Grid item xs={4}>
          <img src="assets/images/download (5).png" alt="Your Image" style={{ maxWidth: '25%' }} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" align="left" sx={{color:"white"}}>Deposit Amount</Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        {[500, 5000, 10000].map((value) => (
          <Grid item xs={4} key={value}>
            <Button
              variant="contained"
              onClick={() => handleButtonClick(value)}
              style={{ width: '100%',backgroundColor:"rgb(48,162,243)",color:"white" }}
             
            >
              ₹{value.toLocaleString()} 
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container item spacing={2}>
        {[20000, 50000, 100000].map((value) => (
          <Grid item xs={4} key={value}>
            <Button
              variant="contained"
              onClick={() => handleButtonClick(value)}
              style={{ width: '100%' ,backgroundColor:"rgb(48,162,243)",color:"white"}}
             
            >
              ₹{value.toLocaleString()} 
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container item alignItems="center">
        <Grid item xs={12}>

   <TextField
    label="Enter Amount"
    variant="outlined"
    fullWidth
    value={amount}
    onChange={handleInputChange}
    style={{marginTop:"5px"}}
    InputProps={{
        style: { color: 'white' },
        inputProps: { 'aria-label': 'description' },
    }}
    InputLabelProps={{
        style: { color: 'white' },
    }}
    />

<Button 
  variant='contained' 
  style={{marginTop:"5px",marginBottom:"5px",borderRadius:"10px",backgroundColor:"rgb(48,162,243)",color:"white"}} 
  fullWidth 
  onClick={(e) => {
    e.preventDefault();
    if (amount < 100) {
      alert('Amount must be at least 100');
    } else {
      if (paymentMode === 'UPIxPAYTM') {
        handleSubmit(e);
      } else {
        setOpenDepositDialog(true);
      }
    }
  }}
>
  Deposit
</Button> 
    </Grid>
      </Grid>
    </Grid>
    <div> {paymentUrl && <a href={paymentUrl}>Proceed to Payment</a>}</div>
   
    <Box sx={{ p: 2, backgroundColor: 'rgb(34,39,91)', borderRadius: '4px', color: '#FFFFFF' }} mt={2}>
      <Typography variant="h6" gutterBottom>
        Recharge Instructions
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="If the transfer time is up, please fill out the deposit form again." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="The transfer amount must match the order you created, otherwise the money cannot be credited successfully." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ErrorIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="If you transfer the wrong amount, our company will not be responsible for the lost amount!" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ErrorIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="Note: do not cancel the deposit order after the money has been transferred." />
        </ListItem>
      </List>
    </Box>


    <Dialog 
 open={openDepositDialog} 
 disableBackdropClick
 disableEscapeKeyDown
>
      <DialogTitle>Deposit</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6">Remaining Time</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="right" style={{ color: 'red' }}>
              {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60}
            </Typography>
          </Grid>
          {paymentMode === 'UPI x QR' && (
            <>
             <img src="assets/images/upi.png" alt="Your Image" style={{ maxWidth: '50%',marginLeft:"auto",marginRight:"auto" }} />
              <Grid item xs={12}>
              <Typography variant="body1">
                UPI ID: { get1  ? get1 : "Loading"}
                <IconButton onClick={() => copyToClipboard( get1  ? get1 : "Loading")}>
  <FileCopyIcon />
</IconButton>
              </Typography>
            </Grid>
              <Grid item xs={12}>
                <TextField
                  name="utr"
                  label="UTR"
                  value={utr}
                  onChange={handleUtrChange}
                />
              </Grid>
            </>
          )}
          {paymentMode === 'USDT' && (
            <>
             
                <Grid item xs={12}>
                <Typography variant="body1">
                  USDT Wallet Address: {get2 ? get2 : "Loading"}
                  <IconButton onClick={() => copyToClipboard(get2 ? get2 : "Loading")}>
                    <FileCopyIcon />
                  </IconButton>
                </Typography>
              </Grid>
            <Grid item xs={12}>
      <Typography variant="caption">
        Conversion Rate: 1 USDT = 83.42 INR
      </Typography>
    </Grid>
              <Grid item xs={12}>
                <TextField
 name="utr"
 label="UTR"
 value={utr}
 onChange={handleUtrChange}
/>
</Grid>
</>
)}
{paymentMode === 'UPIxPAYTM' && (
<Grid item xs={12}>
<Typography variant="body1">Currently this payment option is not available.</Typography>
</Grid>
)}
{utrAlert && (
<Grid item xs={12}>
<Alert severity="error">Please enter the UTR.</Alert>
</Grid>
)}
{duplicateUtrAlert && (
<Grid item xs={12}>
<Alert severity="error">This UTR has already been used.</Alert>
</Grid>
)}
</Grid>
</DialogContent>
<DialogActions>
<Button onClick={sendDepositRequest}>Send Request</Button>
</DialogActions>
</Dialog>
{/* 
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Amount</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>UTR</TableCell>
        <TableCell>Time</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {depositRequests.map((request) => (
        <TableRow key={request.id}>
          <TableCell>{request.amount}</TableCell>
          <TableCell>{request.status}</TableCell>
          <TableCell>{request.utr}</TableCell>
          <TableCell>{request.timestamp ? request.timestamp.toDate().toString() : 'N/A'}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer> */}
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default PromotionMain;