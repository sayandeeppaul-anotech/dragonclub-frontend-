import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from 'axios';
import {domain} from '../../Components/config';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const Coupon = () => {
  const [code, setCode] = useState("");
  const [bonusAmount, setBonusAmount] = useState("");
  const [redemptionLimit, setRedemptionLimit] = useState("");
  const [error, setError] = useState("");

  const generateCode = () => {
    // Generate a random alphanumeric string of length 10
    const newCode = Math.random().toString(36).substring(2, 12).toUpperCase();
    setCode(newCode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = {
        code: code,
        bonusAmount: bonusAmount,
        redemptionLimit: redemptionLimit,
      };
      axios.post(`${domain}/create-coupon`, response, { withCredentials: true })
      .then(function (response) {
        alert("Successful");
        console.log(response);
        setCode('');
        setBonusAmount('null');
        setRedemptionLimit('null');
      })
      .catch(function (error) {
        setError("Coupon creation failed. Please check your inputs and try again.")
          });
  };

  const [data, setData] = useState([]);
console.log(data);

  useEffect(() => {

    axios
    .get(`${domain}/coupons-list`, {
      withCredentials: true,
    })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log("Error while fetching today's registration:", err);
    });
  }, [data]);
  
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard');
  };
  return (
    <div>
    <Grid container component="main" sx={{ flexGrow: 1 }}>
      <Grid item xs={false} sm={2} md={3} />
      <Grid item xs={12} sm={8} md={6}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create Coupon
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Code"
              name="code"
              autoComplete="code"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={generateCode}>
                      <AutorenewIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="bonusAmount"
              label="Bonus Amount"
              type="number"
              id="bonusAmount"
              autoComplete="bonus-amount"
              value={bonusAmount}
              onChange={(e) => setBonusAmount(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="redemptionLimit"
              label="Redemption Limit"
              type="number"
              id="redemptionLimit"
              autoComplete="redemption-limit"
              value={redemptionLimit}
              onChange={(e) => setRedemptionLimit(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={false} sm={2} md={3} />
    </Grid>
    <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Code</TableCell>
        <TableCell align="right">Bonus Amount</TableCell>
        <TableCell align="right">Redemption Limit</TableCell>
        <TableCell align="right">Redemption Count</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row) => (
        <TableRow key={row._id}>
          <TableCell component="th" scope="row">
            {row.code}
            <IconButton onClick={() => handleCopy(row.code)}>
              <FileCopyIcon />
            </IconButton>
          </TableCell>
          <TableCell align="right">{row.bonusAmount}</TableCell>
          <TableCell align="right">{row.redemptionLimit}</TableCell>
          <TableCell align="right">{row.redemptionCount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </div>
  );
};

export default Coupon;