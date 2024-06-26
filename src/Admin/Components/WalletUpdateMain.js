import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import {domain} from '../../Components/config';

const WalletUpdateMain = () => {
  const [uid, setUid] = useState('');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch(`${domain}/updateWallet`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uid, amount: Number(amount), action })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.alert(data.message);
    })
    .catch((error) => {
      console.error('Error:', error);
      window.alert('An error occurred');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Increase / Decrease Wallet Amount</h3>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <TextField label="User ID" value={uid} onChange={(e) => setUid(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Action</InputLabel>
            <Select value={action} onChange={(e) => setAction(e.target.value)}>
              <MenuItem value="increase">Increase</MenuItem>
              <MenuItem value="decrease">Decrease</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default WalletUpdateMain;