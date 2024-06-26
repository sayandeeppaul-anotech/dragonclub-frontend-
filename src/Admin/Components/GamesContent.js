import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {domain} from '../../Components/config';
import { Grid, Paper, Typography } from "@mui/material";

const GamesContent = () => {
  const [data, setData] = useState({});
  const [selectedTimer, setSelectedTimer] = useState('1min');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${domain}/latest-bet-sums`, { withCredentials: true });
      setData(result.data);
    };

    fetchData();
  }, []);

  const handleTimerChange = (event) => {
    setSelectedTimer(event.target.value);
  };

  const renderGrid = (betSums) => {
  return (
    <Grid container spacing={3} direction="row" wrap="wrap">
      <Grid item xs={12}>
        <Typography variant="h5">Period ID: <span style={{color:"red"}}>{betSums.periodId}</span></Typography>
      </Grid>
      {betSums.numberBetSums.map((item, index) => (
        <Grid item key={index}>
          <Paper style={{ padding: '10px', margin: '10px', maxWidth: '200px' }}>
            <Typography variant="body1">Number: {item.number}</Typography>
            <Typography variant="body2" sx={{color:"green"}}>Total Bet: {item.totalBet}</Typography>
          </Paper>
        </Grid>
      ))}
      {Object.entries(betSums.sizeBetSums).map(([key, value]) => (
        <Grid item key={key}>
          <Paper style={{ padding: '10px', margin: '10px', maxWidth: '200px' }}>
            <Typography variant="body1">Size: {key}</Typography>
            <Typography variant="body2" sx={{color:"red"}}>Total Bet: {value}</Typography>
          </Paper>
        </Grid>
      ))}
      {Object.entries(betSums.colorBetSums).map(([key, value]) => (
        <Grid item key={key}>
          <Paper style={{ padding: '10px', margin: '10px', maxWidth: '200px' }}>
            <Typography variant="body1">Color: {key}</Typography>
            <Typography variant="body2" sx={{color:"blue"}}>Total Bet: {value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
  return (
    <div>
   <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  <select 
    value={selectedTimer} 
    onChange={handleTimerChange} 
    style={{ 
      width: '100%', 
      height: '50px', 
      fontSize: '20px', 
      maxWidth: '100%', 
      margin: '0 auto' 
    }}
  >
    <option value="1min">1min</option>
    <option value="3min">3min</option>
    <option value="5min">5min</option>
    <option value="10min">10min</option>
  </select>
</div><br></br><br></br>
      {data[selectedTimer] && renderGrid(data[selectedTimer])}
    </div>
  );
};

export default GamesContent;