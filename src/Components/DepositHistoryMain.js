import React, { useEffect,useState} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Box,Divider, Typography, Button,Grid,TextField, List, ListItem, ListItemText,Card,CardContent,CardHeader} from '@mui/material';
import axios from 'axios';
import {domain} from './config'

const DepositHistoryMain= ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);
  const [depositRequests, setDepositRequests] = useState([]);
  console.log("abc",depositRequests)
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/deposit/history/`, { withCredentials: true });
        setDepositRequests(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  
  const [selectedDate, setSelectedDate] = useState(new Date().setHours(0,0,0,0));

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    setSelectedDate(date.setHours(0,0,0,0));
  };
  
  const filteredRequests = depositRequests.filter(request => {
    if (request.depositDate) {
      const requestDate = new Date(request.depositDate);
      // Set the requestDate to the start of the day in local timezone
      requestDate.setHours(0,0,0,0);
      return requestDate.getTime() === selectedDate;
    }
    return false;
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
                <span style={{ fontWeight: "bold" }}>Deposit History</span>
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
            <Button variant="contained" sx={{backgroundColor:"rgb(54,142,255)",width:"70px",height:"25px",fontSize:"12px"}} >Deposit</Button>
          </Grid>
          <Grid item xs={6}>
          <Typography 
    variant="body1" 
    align="right" 
    sx={{
        color: request.depositStatus === 'pending' ? '#598ff9' : 
               request.depositStatus === 'completed' ? '#34be8a' : 
               request.depositStatus === 'failed' ? 'red' :
               '#34be8a', 
        fontWeight: 'bold'
    }}
>
{request.depositStatus === 'pending' ? 'To Be Paid >' : 
 request.depositStatus === 'completed' ? 'Completed >' : 
 request.depositStatus}
</Typography>

          </Grid>
          <Grid item xs={12}>
  <Divider style={{ margin: '10px 0' }} />
</Grid>
<Grid item xs={6}>
            <Typography variant="subtitle1" align="left" sx={{color:"#888"}}>Balance</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="right" sx={{color:"#666",fontWeight:"bold"}}>{request.depositAmount}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" align="left" sx={{color:"#888"}}>Type</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="right" sx={{color:"#666",fontWeight:"bold"}}>{request.depositMethod}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" align="left" sx={{color:"#888"}}> Time</Typography>
          </Grid>
          <Grid item xs={6}>
  <Typography variant="body1" align="right" sx={{color:"#666",fontWeight:"bold"}}>
    {request.depositDate
      ? `${new Date(request.depositDate).toLocaleDateString()} ${new Date(request.depositDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : 'N/A'}
  </Typography>
</Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" align="left" sx={{color:"#888"}}>Order Number</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="right" sx={{color:"#666",fontWeight:"bold"}}>{request.depositId}</Typography>
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

export default DepositHistoryMain;