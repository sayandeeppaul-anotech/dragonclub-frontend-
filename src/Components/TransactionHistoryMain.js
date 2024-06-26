import React, { useEffect, useState } from 'react';
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,  CardContent,Grid , Box,Select, MenuItem, FormControl, InputLabel, Card, CardHeader,} from '@mui/material';
import axios from 'axios';
import {domain} from './config'
const TransactionHistoryMain = ({ children }) => {
  
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const [transactions, setTransactions] = useState([]);
  console.log(transactions);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/transaction`, { withCredentials: true });
        if (response.data.success) {
          setTransactions(response.data.transactionHistory);
        } else {
          console.error("Failed to fetch transaction history");
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchUserData();
  }, []);

  const [filter, setFilter] = useState('all');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const selectedDateObj = new Date(selectedDate);
  
    return transactionDate.getUTCFullYear() === selectedDateObj.getFullYear() &&
      transactionDate.getUTCMonth() === selectedDateObj.getMonth() &&
      transactionDate.getUTCDate() === selectedDateObj.getDate();
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
                <span style={{ fontWeight: "bold" }}>Transaction History</span>
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


            <div style={{ marginBottom: '20px', marginTop: '10px',marginLeft:"auto", marginRight:"auto", width: '95%' }}>

  <select 
    value={filter} 
    onChange={handleFilterChange} 
    id="filter-label" 
    style={{ width: '100%', fontSize: '20px', padding: '10px', backgroundColor: 'transparent', color: 'white', border: '1px solid white' }}
  >

    <option value="all">All</option>
    <option value="deposit">Deposit</option>
    <option value="withdrawal">Withdrawal</option>
    <option value="commission">Agent Commission</option>
    <option value="Bet">Bet</option>
    <option value="Envelop">Envelop</option>
    <option value="DepositBonus">Deposit bonus</option>
    <option value="Salary">Salary</option>
  </select>
</div>

<input
  type="date"
  value={selectedDate}
  onChange={handleDateChange}
  style={{
    width: '95%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid white',
    boxSizing: 'border-box',
    margin: '10px 0',
    backgroundColor: 'transparent',
    color: 'white'
  }}
/>
<Grid container spacing={1} sx={{width:"98%", marginLeft:"auto",marginRight:"auto",marginBottom:"100px"}}>
{filteredTransactions.filter(transaction => filter === 'all' || transaction.type === filter).map((transaction, index) => (
  <Grid item xs={12} sm={12} md={12} key={index}>
    <Card style={{ borderRadius: '1px', padding: '10px', backgroundColor: 'rgb(42,50,112)' }}>
    <CardHeader
      title={transaction.type.toUpperCase()}
      titleTypographyProps={{ align: 'left', variant: 'body2' }}
      style={{ backgroundColor: 'rgb(34,39,91)', color: 'white', height: '10px', lineHeight: '40px' }}
    />
    <CardContent>
      <Grid container>
        <Grid item xs={3} style={{ backgroundColor: 'rgb(34,39,91)', marginTop: '10px',padding:"10px" }}>
          <Typography variant="caption" sx={{color:"white"}}>Amount:</Typography>
        </Grid>
        <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'rgb(34,39,91)', color: 'red', marginTop: '10px',padding:"10px" }}>
          <Typography variant="caption">₹{transaction.amount}</Typography>
        </Grid>
        <Grid item xs={3} style={{ backgroundColor: 'rgb(34,39,91)', marginTop: '10px',padding:"10px" }}>
          <Typography variant="caption" sx={{color:"white"}}>Time:</Typography>
        </Grid>
        <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'rgb(34,39,91)', marginTop: '10px',padding:"10px" }}>
          <Typography variant="caption" sx={{color:"white"}}>{new Date(transaction.date).toLocaleString()}</Typography>
        </Grid>
      </Grid>
    </CardContent>
    </Card>
  </Grid>
))}
</Grid>
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default TransactionHistoryMain;