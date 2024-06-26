import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Paper} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { domain } from '../../Components/config';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  }
}));

const WithdrawlLimitsMain = () => {
  const classes = useStyles();
  const [settings, setSettings] = useState({
    id: '',
    withdrawalStartHour: '',
    withdrawalEndHour: '',
    maxWithdrawRequestsPerDay: '',
    minWithdrawAmount: '',
    maxWithdrawAmount: ''
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${domain}/settings-modify-withdrawl`, settings, { withCredentials: true });
      alert('Successfully submitted');
    } catch (err) {
      console.error(err);
      alert(`An error occurred: ${err.message}`);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          Modify Withdrawal Limits
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
           
            <Grid item xs={12}>
              <TextField
                name="withdrawalStartHour"
                label="Withdrawal Start Hour ( format 24 hour )"
                variant="outlined"
                fullWidth
                value={settings.withdrawalStartHour}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
  <TextField
    name="withdrawalEndHour"
    label="Withdrawal End Hour ( format 24 hour )"
    variant="outlined"
    fullWidth
    value={settings.withdrawalEndHour}
    onChange={handleChange}
  />
</Grid>
            <Grid item xs={12}>
              <TextField
                name="maxWithdrawRequestsPerDay"
                label="Max Withdraw Requests Per Day"
                variant="outlined"
                fullWidth
                value={settings.maxWithdrawRequestsPerDay}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="minWithdrawAmount"
                label="Min Withdraw Amount"
                variant="outlined"
                fullWidth
                value={settings.minWithdrawAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="maxWithdrawAmount"
                label="Max Withdraw Amount"
                variant="outlined"
                fullWidth
                value={settings.maxWithdrawAmount}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default WithdrawlLimitsMain;
