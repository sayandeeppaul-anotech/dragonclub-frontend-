import React, { useEffect,useState} from 'react'
import Mobile from './Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Typography, Button,Grid,TextField, List, ListItem, ListItemText} from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';
import { doc, onSnapshot, collection, query, getDoc,updateDoc,getFirestore,addDoc,serverTimestamp,where,orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase/config'; // Make sure the path is correct
import RefreshIcon from '@mui/icons-material/Refresh';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow ,Card, CardHeader,CardContent} from '@mui/material';
import axios from 'axios';
import {domain} from './config'
import{ Divider} from '@mui/material';


const WithdrawHistoryMain= ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);
  const [userWithdrawalRequests, setUserWithdrawalRequests] = useState([]);
console.log(userWithdrawalRequests)

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${domain}/all-withdraw-history`, { withCredentials: true });
      if (response.data.success === true) {
        setUserWithdrawalRequests(response.data.userWithdrawals);
        console.log(response.data)
      } else {
        console.error('Response data is not an array');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  fetchUserData();
}, []);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const filteredRequests = userWithdrawalRequests ? userWithdrawalRequests.filter(request => {
    const requestDate = new Date(request.createdAt);
    return requestDate.toISOString().split('T')[0] === selectedDate;
  }) : [];
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
                <span style={{ fontWeight: "bold" }}>Withdraw History</span>
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



            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              style={{
                width: '95%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                margin: '10px 0',
              }}
            />
            {/* //content */}

            {filteredRequests.slice().reverse().map((request) => (

  <Grid container item xs={12}  key={request._id}>
    <Card style={{ width: 'calc(100% - 20px)', marginBottom: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  marginLeft: '15px', marginRight: '10px', marginTop:"20px" }}>
      <CardContent style={{ backgroundColor: 'RGB(247,248,255)' }}>
        <Grid container >
          <Grid item xs={6} align="left">
            <Button variant="contained" sx={{backgroundColor:"rgb(54,142,255)",width:"80px",height:"25px",fontSize:"12px"}} >Withdraw</Button>
          </Grid>
          <Grid item xs={6}>
          <Typography 
    variant="body1" 
    align="right" 
    sx={{
        color: request.status === 'pending' ? '#598ff9' : 
               request.status === 'completed' ? '#34be8a' : 
               request.status === 'Rejected' ? 'red' :
               '#34be8a', 
        fontWeight: 'bold'
    }}
>
{request.status === 'pending' ? 'To Be Paid >' : 
 request.status === 'completed' ? 'Completed >' : 
 request.status}
</Typography>

          </Grid>
          <Grid item xs={12}>
  <Divider style={{ margin: '10px 0' }} />
</Grid>
<Grid item xs={6}>
            <Typography variant="subtitle1" align="left" sx={{color:"#888"}}>Balance</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="right" sx={{color:"#666",fontWeight:"bold"}}>{request.balance}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" align="left" sx={{color:"#888"}}>Type</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="right" sx={{color:"#666",fontWeight:"bold"}}>{request.withdrawMethod
}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" align="left" sx={{color:"#888"}}> Time</Typography>
          </Grid>
          <Grid item xs={6}>
  <Typography variant="body1" align="right" sx={{color:"#666",fontWeight:"bold"}}>
    {request.createdAt
      ? `${new Date(request.createdAt).toLocaleDateString()} ${new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : 'N/A'}
  </Typography>
</Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" align="left" sx={{color:"#888"}}>Order Number</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="right" sx={{color:"#666",fontWeight:"bold"}}>{request._id}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Grid>
))}
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default WithdrawHistoryMain;