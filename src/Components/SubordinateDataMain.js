import React, { useEffect, useState } from "react";
import Mobile from "../Components/Mobile";
import IconButton from "@mui/material/IconButton";
import SmsIcon from "@mui/icons-material/Sms";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Typography,
  Grid,
  Box,
  CardHeader,
  CardContent,
  Card,
  Tooltip,
  Button,
} from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import axios from "axios";
import {domain} from './config'

const SubordinateDataMain = ({ children }) => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", setVh);
    setVh();

    return () => window.removeEventListener("resize", setVh);
  }, []);

  const [dailyDeposits, setDailyDeposits] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchLevel, setSearchLevel] = useState("");


  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/user/subordinatedata`, { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [user]);




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
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: "rgb(42,50,112)",
                padding: "8px 16px",
                color: "white",
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Subordinate Data</span>
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

            {/* Content */}
            <Grid container spacing={2} sx={{ padding: "16px" }}>
            <Grid item xs={6} sm={6}>
  <input
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    placeholder="Search User ID"
    style={{
      width: '100%',
      border: '1px solid white',
      backgroundColor: 'transparent',
      color: 'white',
      outline: 'none',
      padding: '10px',
      boxSizing: 'border-box'
    }}
  />
</Grid>
              <Grid item xs={6} sm={6}>
                <Button
                  variant="contained"
                  sx={{ height: "40px" }}
                  color="primary"
                  onClick={() => setSearchTerm("")}
                  fullWidth
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={6} sm={6}>
  <input
    value={searchDate}
    onChange={(event) => setSearchDate(event.target.value)}
    label="Search Date"
    type="date"
    style={{
      width: '100%',
      border: '1px solid white',
      backgroundColor: 'transparent',
      color: 'white',
      outline: 'none',
      padding: '10px',
      boxSizing: 'border-box'
    }}
  />
</Grid>
<Grid item xs={6} sm={6}>
  <select
    value={searchLevel}
    onChange={(event) => setSearchLevel(event.target.value)}
    style={{
      width: '100%',
      border: '1px solid white',
      backgroundColor: 'transparent',
      color: 'white',
      outline: 'none',
      padding: '10px',
      boxSizing: 'border-box'
    }}
  >
    <option value="">None</option>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
  </select>
</Grid>
            </Grid>

            <Grid container spacing={2} sx={{ padding: "16px" }}>
  {user && user
    .filter(
      (deposit) =>
        deposit.uid.toString().includes(searchTerm) &&
        deposit.date.includes(searchDate) &&
        deposit.level.toString().includes(searchLevel)
    )
    .map((deposit, index) => (
      <Grid item xs={12} key={index}>
        <Card
          sx={{
            borderRadius: "15px",
            padding: "10px",
            backgroundColor: "RGB(255,255,255)",
          }}
        >
          <CardHeader
            title={
              <Box display="flex" alignItems="center">
                <Typography variant="body2" component="span">{`${
                  index + 1
                } - User ID: ${deposit.uid}`}</Typography>
                <CopyToClipboard text={deposit.uid}>
                  <Tooltip title="Copy User ID">
                    <IconButton>
                      <FileCopyIcon
                        style={{ color: "white", fontSize: "15px" }}
                      />
                    </IconButton>
                  </Tooltip>
                </CopyToClipboard>
              </Box>
            }
            titleTypographyProps={{ align: "left" }}
            style={{
              backgroundColor: "RGB(54,142,255)",
              color: "white",
              height: "10px",
              lineHeight: "40px",
            }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                style={{
                  backgroundColor: "RGB(241,243,255)",
                  marginTop: "10px",
                  padding: "10px",
                }}
              >
                <Typography variant="caption">Date:</Typography>
              </Grid>
              <Grid
                item
                xs={9}
                style={{
                  textAlign: "right",
                  backgroundColor: "RGB(241,243,255)",
                  marginTop: "10px",
                  padding: "10px",
                }}
              >
                <Typography variant="caption">
                  {deposit.date}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  backgroundColor: "RGB(241,243,255)",
                  marginTop: "10px",
                  padding: "10px",
                }}
              >
                <Typography variant="caption">Amount:</Typography>
              </Grid>
              <Grid
                item
                xs={9}
                style={{
                  textAlign: "right",
                  backgroundColor: "RGB(241,243,255)",
                  marginTop: "10px",
                  color: "red",
                  padding: "10px",
                }}
              >
                <Typography variant="caption">
                  ₹{deposit.depositAmount}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  backgroundColor: "RGB(241,243,255)",
                  marginTop: "10px",
                  padding: "10px",
                }}
              >
                <Typography variant="caption">
                  Bet Amount:
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                style={{
                  textAlign: "right",
                  backgroundColor: "RGB(241,243,255)",
                  marginTop: "10px",
                  color: "red",
                  padding: "10px",
                }}
              >
                <Typography variant="caption">
                  ₹{deposit.betAmount || 0}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  backgroundColor: "RGB(241,243,255)",
                  marginTop: "10px",
                  padding: "10px",
                }}
              >
                <Typography variant="caption">
                  Commission:
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                style={{
                  textAlign: "right",
                  backgroundColor: "RGB(241,243,255)",
                  marginTop: "10px",
                  color: "red",
                  padding: "10px",
                }}
              >
                <Typography variant="caption">
                  ₹{deposit.commission || 0}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  backgroundColor: "RGB(241,243,255)",
                  marginTop: "10px",
                  padding: "10px",
                }}
              >
                <Typography variant="caption">Level:</Typography>
              </Grid>
              <Grid
                item
                xs={9}
                style={{
                  textAlign: "right",
                  backgroundColor: "RGB(241,243,255)",
                  marginTop: "10px",
                  padding: "10px",
                }}
              >
                <Typography variant="caption">
                  {deposit.level}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    ))}
</Grid>


            {/* Content End */}

            {/* content end */}
          </Box>

          {children}
        </Box>
      </Mobile>
    </div>
  );
};

export default SubordinateDataMain;
