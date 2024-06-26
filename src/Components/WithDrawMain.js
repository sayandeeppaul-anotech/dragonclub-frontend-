import React, { useEffect,useState} from 'react'
import Mobile from './Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Typography, Button,Grid,TextField, List, ListItem, ListItemText} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import RefreshIcon from '@mui/icons-material/Refresh';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import BulletPoint from '@material-ui/icons/FiberManualRecord';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { domain } from './config';
import { Balance } from '@mui/icons-material';



const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 10px',
      // backgroundColor: 'rgb(42,50,112)',
      color: 'white',
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: 'rgb(55,72,146)',
    width: '35ch',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(34,39,91)',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'white'
    },
    borderRadius: '10px',
   
  },
  button: {
    margin: theme.spacing(3),
    borderRadius: '12px',
    width: '40ch',
  },
  list: {
    color: "white",
  },
}));

const WithDrawMain = ({ children }) => {
  const classes = useStyles();

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);


  const [amount, setAmount] = useState('');

  const handleButtonClick = (value) => {
    setAmount(value);
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };
  const [walletData, setWalletData] = useState(0);
  const [userWithdrawalRequests, setUserWithdrawalRequests] = useState([]);
  const [existingBankDetails, setExistingBankDetails] = useState(null);
  const [openBankDialog, setOpenBankDialog] = useState(false);
  const [bankAccountName, setBankAccountName] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('Bank Card');
  const [existingUsdtDetails, setExistingUsdtDetails] = useState(null);


  const [bankDetails, setBankDetails] = useState({
    name: '',
    accountNo: '',
    ifscCode: '',
    bankName: '',
    mobile:''
  });

  const [usdtDetails, setUsdtDetails] = useState({
    walletAddress: '',
    network: ''
  });

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(`${domain}/user/bank-details/show`, {
          withCredentials: true
        });
        if (response.data.length > 0) {
          setBankDetails(response.data[0]); // set the first object from the response data
        }
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchBankDetails();
  }, []);


  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        console.log('Fetching bank details...');
        const response = await axios.get(`${domain}/user/trxaddress-show`, {
          withCredentials: true
        });
        console.log('Response:', response);
        if (response.data.walletAddress && response.data.walletAddress.length > 0) {
          setUsdtDetails({
            walletAddress: response.data.walletAddress[0],
            network: response.data.network
          });
          setExistingUsdtDetails(response.data);
          console.log('USDT details:', usdtDetails);
        } else {
          console.log('No data in response');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };
  
    fetchBankDetails();
  }, []);



// Modify the handleBankDetailsChange function to handle changes to the USDT details as well
const handleBankDetailsChange = (event) => {
  if (withdrawalMethod === 'Bank Card') {
    setBankDetails({
      ...bankDetails,
      [event.target.name]: event.target.value,
    });
  } else {
    setUsdtDetails({
      ...usdtDetails,
      [event.target.name]: event.target.value,
    });
  }
};

const navigate = useNavigate();


const handleWithdraw = async (amount) => {
  // Check if bankDetails.accountNo is not present
  if (withdrawalMethod === 'Bank Card' && (!bankDetails.accountNo || bankDetails.accountNo.trim() === '')) {
    window.alert('Please enter your bank details');
    return;
  }

  try {
    const response = await fetch(`${domain}/withdraw-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ balance:amount,withdrawMethod: withdrawalMethod}),
      credentials: 'include', // Include credentials in the request
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.error('Response status:', response.status, 'Status text:', response.statusText);
      throw new Error(data.message || 'Withdraw request failed');
    }

    // Display an alert with the server response message on successful withdrawal
    window.alert(data.message || 'Withdrawal request was successful');
  } catch (error) {
    console.log(error);

    // Display an alert when an error arises
    window.alert('An error occurred: ' + error);
  }
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


const [betAmount , setBetamount] = useState(null);


useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${domain}/calculateRemainingBetAmount`, { withCredentials: true });
      setBetamount(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchUserData();
}, []);

const [ withdrawData , setWithdrawData] = useState(null);
console.log(withdrawData);


useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${domain}/settings-withdraw`, { withCredentials: true });
      setWithdrawData(response.data);
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
                <span style={{ fontWeight: "bold" }}>Withdraw</span>
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
          <Typography variant="body1" sx={{color:"white"}} align="left">Avilable Balance</Typography>
        </Grid>
      </Grid>
      <Grid container item alignItems="center">
        <Grid item xs={4}>
          <Typography variant="body1"  sx={{color:"white"}} align="center"> ₹{user ? user.walletAmount : "Loading.."}</Typography>
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
      <Grid item xs={4}>
        <div 
         onClick={() => setWithdrawalMethod('Bank Card')}
         style={{ backgroundColor:withdrawalMethod === 'Bank Card' ? 'rgb(40,160,242)' : 'rgb(55,72,146)', borderRadius: 8, padding: 16 ,boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <img src="assets/images/WithBeforeImgIcon2_20231215045210hewa.png" alt="Image 1" style={{ display: 'block', margin: '0 auto', maxWidth: '50%', borderRadius: '50%' }} />
          <Typography variant="caption" align="center" style={{ marginTop: 8,color:"white" }}>Bank Card</Typography>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div   onClick={() => setWithdrawalMethod('USDT')} style={{ backgroundColor: withdrawalMethod === 'USDT' ? 'rgb(40,160,242)' : 'rgb(55,72,146)', borderRadius: 8, padding: 16, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <img src="assets/images/USDT.png" alt="Image 2" style={{ display: 'block', margin: '0 auto', maxWidth: '50%', borderRadius: '50%' }} />
          <Typography variant="caption" align="center" style={{ marginTop: 8,color:"white" }}>USDT</Typography>
        </div>
      </Grid>
      
     
    </Grid> 

    {withdrawalMethod === 'Bank Card' && bankDetails && bankDetails.bankName && (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    sx={{
      bgcolor: 'rgb(54,72,146)',
      border: '1px solid rgb(54,72,146)',
      borderRadius: '4px',
      padding: '16px',
      width: '350px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
    mt={2}
  >
    <Box display="flex" flexDirection="column" alignItems="center" >
      <Box
        component="img"
        src="assets/images/1-4618686f.png"
        alt="State Bank"
        width={30}
        height={30}
        sx={{ mb: 2 }}
      />
      <Typography variant="h6" sx={{fontSize:"13px",color:"white"}}>{bankDetails.bankName}</Typography>
    </Box>
    <Divider orientation="vertical" flexItem sx={{height: '70px', marginLeft: '0'}} /> 
    <Box display="flex" alignItems="center">
      <Typography variant="body1" sx={{color:"white"}}>{bankDetails.accountNo}</Typography>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  </Box>
)}

{withdrawalMethod === 'USDT' && existingUsdtDetails && (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    sx={{
      bgcolor: 'rgb(54,72,146)',
      border: '1px solid rgb(54,72,146)',
      borderRadius: '4px',
      padding: '16px',
      width: '350px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
    mt={2}
  >
    <Box display="flex" flexDirection="column" alignItems="center" >
      <Box
        component="img"
        src="assets/images/10-e1104eb3.png"
        alt="USDT"
        width={30}
        height={30}
        sx={{ mb: 2 }}
      />
      <Typography variant="h6" sx={{fontSize:"13px",color:"white"}}>{existingUsdtDetails.walletAddress}</Typography>
    </Box>
    <Divider orientation="vertical" flexItem sx={{height: '70px', marginLeft: '0'}} /> 
    <Box display="flex" alignItems="center">
      <Typography variant="body1" sx={{color:"white"}}>{existingUsdtDetails.network}</Typography>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  </Box>
)}
    <Grid container spacing={1} mt={1} style={{
         width: '97%',
         marginLeft: 'auto',
         marginRight: 'auto',
         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',backgroundColor:"rgb(54,72,146)", borderRadius:"10px"}}>
      {(existingBankDetails === null || existingUsdtDetails === null) && (
  <Grid item xs={12}>
    <div style={{ backgroundColor: 'rgb(54,72,146)', borderRadius: 8, padding: 16, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <img src="/assets/images/download (17).png"  alt="Image 2" style={{ display: 'block', margin: '0 auto', maxWidth: '20%', borderRadius: '50%' }} />
      <Typography variant="caption" align="center" style={{ marginTop: 8,color:"white" }}>ADD BANK DETAILS</Typography>
      <Button onClick={() => {
 
    navigate('/addbank');
  }
}>GO Here </Button>
    </div>
  </Grid>
)}
     
    </Grid>

  
   
    


   








    <div className={classes.root} >
        <Grid container spacing={3} mt={2}>
          {/* First row */}
          <Grid item xs={12}>
          <TextField
  className={classes.input}
  id="outlined-basic"
  variant="outlined"
  placeholder="Please enter amount"
  value={amount}
  onChange={e => setAmount(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <span style={{ color: 'rgb(42,156,243)',fontSize:"20px",fontWeight:"bold" }}>₹</span>
      </InputAdornment>
    ),
  }}
/>


          </Grid>
  
          {/* Second row */}
          <Grid item container xs={12}>
            <Grid item xs={9} >
              <Typography variant="body2" align="left" sx={{color:"rgb(117,123,166)"}}>Withdrawable Balance </Typography>
              <Typography variant="body2" align="left" sx={{color:"rgb(117,123,166)"}}>Withdrawable Amount Recived </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" align="right" ><span style={{color:"rgb(40,164,242)"}}> ₹0</span></Typography>
              <Typography variant="body2" align="right"><span style={{color:"rgb(40,164,242)"}}> ₹0</span></Typography>
            </Grid>
          </Grid>
  
          {/* Third row */}
          <Grid item xs={12}>
          <Button 
  variant="contained" 
  sx={{backgroundColor:"rgb(117,123,166)", borderRadius:"20px"}} 
  className={classes.button}
  onClick={() => handleWithdraw(amount)}
>
  Withdraw
</Button>
          </Grid>
  
          {/* Fourth row */}
          <Grid item xs={12}>
  <List className={classes.list}>
    <ListItem>
      <ListItemIcon sx={{color:"white"}}>
        <BulletPoint />
      </ListItemIcon>
      <ListItemText primary={<span>Need to bet <span style={{color: 'rgb(40,160,241)'}}>₹{betAmount ? betAmount.remainingBetAmount : "0.00"}</span> to be able to withdraw</span>} />    </ListItem>
    <ListItem>
      <ListItemIcon sx={{color:"white"}}>
        <BulletPoint />
      </ListItemIcon>
      <ListItemText primary={<span>Withdraw Hour <span style={{color: 'rgb(40,160,241)'}}>{withdrawData ? withdrawData.withdrawalStartHour : "8AM"} AM - {withdrawData ? withdrawData.withdrawalEndHour : "9 PM"} PM</span></span>} />
    </ListItem>
    <ListItem>
      <ListItemIcon sx={{color:"white"}}>
        <BulletPoint />
      </ListItemIcon>
      <ListItemText primary={<span>Inday Remaining Withdrawal Times <span style={{color: 'rgb(40,160,241)'}}>{withdrawData ? withdrawData.maxWithdrawRequestsPerDay : "0"}</span></span>} />    </ListItem>
    <ListItem>
      <ListItemIcon sx={{color:"white"}}>
        <BulletPoint />
      </ListItemIcon>
      <ListItemText primary={<span>Withdrawal amount range <span style={{color: 'rgb(40,160,241)'}}>{withdrawData ? withdrawData.minWithdrawAmount : "0"} - {withdrawData ? withdrawData.maxWithdrawAmount
 : "0"}</span></span>} />
    </ListItem>
    <ListItem>
      <ListItemIcon sx={{color:"white"}}>
        <BulletPoint />
      </ListItemIcon>
      <ListItemText primary="Please confirm your beneficial account information before withdrawing. If your information is incorrect, our company will not be liable for the amount of loss" />
    </ListItem>
    <ListItem>
      <ListItemIcon sx={{color:"white"}}>
        <BulletPoint />
      </ListItemIcon>
      <ListItemText primary="If your beneficial information is incorrect, please contact customer service" />
    </ListItem>
  </List>
</Grid>
        </Grid>
      </div>


{/* <TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Amount</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Timestamp</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {userWithdrawalRequests.map((request) => (
        <TableRow key={request.id}>
          <TableCell>{request.amount}</TableCell>
          <TableCell>{request.status}</TableCell>
          <TableCell>{request.timestamp ? request.timestamp.toDate().toString() : 'N/A'}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>       */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default WithDrawMain;