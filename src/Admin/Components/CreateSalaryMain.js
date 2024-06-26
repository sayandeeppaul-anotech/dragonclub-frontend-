import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { domain } from '../../Components/config';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  formControl: {
    minWidth: 120,
  },
  button: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const SalaryForm = () => {
  const classes = useStyles();
  const [uid, setUid] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [salaryFrequency, setSalaryFrequency] = useState('');
  const [frequencyLimit, setFrequencyLimit] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const salaryDetails = {
      uid,
      salaryAmount,
      salaryFrequency,
      frequencyLimit,
    };

    try {
      await axios.post(`${domain}/set-salary`, salaryDetails, { withCredentials: true });
      alert('Salary details set successfully');
    } catch (error) {
      console.error('Error setting salary details:', error);
    }
  };


  const [salaryRecords, setSalaryRecords] = useState([]);


  useEffect(() => {
    const fetchSalaryRecords = async () => {
      try {
        const response = await axios.get(`${domain}/get-salary-records`, { withCredentials: true });
        setSalaryRecords(response.data);
      } catch (error) {
        console.error('Error fetching salary records:', error);
      }
    };

    fetchSalaryRecords();
  }, []);
  return (
    <div>
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Set Salary Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="UID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Salary Amount"
              value={salaryAmount}
              onChange={(e) => setSalaryAmount(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required className={classes.formControl}>
              <InputLabel>Salary Frequency</InputLabel>
              <Select
                value={salaryFrequency}
                onChange={(e) => setSalaryFrequency(e.target.value)}
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Frequency Limit"
              value={frequencyLimit}
              onChange={(e) => setFrequencyLimit(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Start Salary Cron Job
            </Button>
          </Grid>
        </Grid>
      </form>
      
    </Box>
    <br></br>
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>UID</TableCell>
          <TableCell align="right">Salary Amount</TableCell>
          <TableCell align="right">Salary Frequency</TableCell>
          <TableCell align="right">Frequency Limit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {salaryRecords.map((record) => (
          <TableRow key={record.uid}>
            <TableCell component="th" scope="row">
              {record.uid}
            </TableCell>
            <TableCell align="right">{record.salaryAmount}</TableCell>
            <TableCell align="right">{record.salaryFrequency}</TableCell>
            <TableCell align="right">{record.frequencyLimit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  );
};

export default SalaryForm;