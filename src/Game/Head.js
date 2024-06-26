import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Mobile from "../Components/Mobile";
import { Typography, Grid, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Button } from "@mui/material";
import { Refresh, AccountBalanceWallet, VolumeUp } from "@mui/icons-material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import NoteIcon from "@mui/icons-material/Note";
import { Tabs, Tab,} from "@mui/material";
import { Drawer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { Table,TableCell,TableRow,TableBody,TableContainer,} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import RowVisualization from "./Row";
import CustomTable from "./Visualize";
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {ButtonGroup,styled } from '@mui/material';
import {domain} from '../Components/config'
import {wssdomain} from '../Components/config'
import MusicOffIcon from '@material-ui/icons/MusicOff';

const countdownSound = new Audio("/assets/sound.mp3");
countdownSound.loop = true;

const images = [
  {
    id: 1,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-afd768a9.png",
    subtitle: "1Min",
  },
  {
    id: 2,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-afd768a9.png",
    subtitle: "3Min",
  },
  {
    id: 3,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-afd768a9.png",
    subtitle: "5Min",
  },
  {
    id: 4,
    src: "games/assets/time-5d4e96a3.png",
    altSrc: "games/assets/time_a-afd768a9.png",
    subtitle: "10Min",
  },
];


const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  '& .MuiButtonGroup-grouped': {
    border: 'none',
    '&:not(:last-of-type)': {
      borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    },
  },
}));

const StyledButton = styled(Button)(({ theme, active }) => ({
    backgroundColor: active ? '#1976d2' : 'rgb(34,39,91)',
    color: 'white',
    fontSize: '0.875rem',
    padding: '3px 8px', // Reduced padding
    '&:hover': {
      backgroundColor: active ? '#1565c0' : 'rgb(34,39,91)',
    },
    '&.random': {
      backgroundColor: 'rgb(34,39,91)',
     
      paddingLeft: '10px', // Reduced padding
      paddingRight: '10px', // Reduced padding
      '&:hover': {
        backgroundColor: 'rgb(34,39,91)',
      },
    },
  }));

const multipliers = [
  { label: 'Random', value: 'random', isRandom: true },
  { label: 'X1', value: 1 },
  { label: 'X5', value: 5 },
  { label: 'X10', value: 10 },
  { label: 'X20', value: 20 },
  { label: 'X50', value: 50 },
  { label: 'X100', value: 100 },
];



const Head = () => {
  const [activeId, setActiveId] = useState(images[0].id);
  const [selectedTimer, setSelectedTimer] = useState("1Min");
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [periodId, setPeriodId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [user, setUser] = useState(null);
  const [index, setIndex] = React.useState(0);
  const [inProp, setInProp] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [betAmount, setBetAmount] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [totalBet, setTotalBet] = useState(0);
  const [betPlaced, setBetPlaced] = useState(false);
  const [betPeriodId, setBetPeriodId] = useState(null);
  const [ lastAlertedPeriodId, setLastAlertedPeriodId ] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [gameResult, setGameResult] = useState("");
  const [value, setValue] = useState(0);
  const [bets, setBets] = useState([]);
  const [selectedColor, setSelectedColor] = useState("RGB(71,129,255)");
  const [winloss, setWinLoss] = useState(0);
  const [popupperiod, setPopupPeriod] = useState(0);
  const [popupresult, setPopupResult] = useState(0);
  const [popupperiodid, setPopupPeriodId] = useState(0);
  const [popupTimer, setPopupTimer] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/user`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/wingoresult`, {
          withCredentials: true,
        });
     

        // Filter the data based on the selectedTimer
        const filteredData = response.data.Result.filter(
          (item) => item.timer === selectedTimer
        );

        setRows(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
    const intervalId = setInterval(fetchUserData, 1000);
    return () => clearInterval(intervalId);
  }, [selectedTimer]); 



  useEffect(() => {
    const socket = new WebSocket(`${wssdomain}/`);
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.timers && data.timers[selectedTimer]) {
        setPeriodId(data.timers[selectedTimer].periodId); // Set the periodId
        setRemainingTime(data.timers[selectedTimer].remainingTime); // Set the remainingTime
      } else {
        console.error("Unexpected data structure", data);
      }
    };
    return () => socket.close(); // Cleanup WebSocket connection
  }, [selectedTimer]);

  const handleClick = (id) => {
    let timerKey;
    switch (id) {
      case 1:
        timerKey = "1min";
        break;
      case 2:
        timerKey = "3min";
        break;
      case 3:
        timerKey = "5min";
        break;
      case 4:
        timerKey = "10min";
        break;
      default:
        timerKey = "1min";
    }
    setSelectedTimer(timerKey);
    setActiveId(id);
  };

  const textArray = [
    "ATTENTION TC ! Live chats are available on our apps/website",
    "24/7 Live support on dragon club ",
    "Dragon club welcomes you here !!",
  ];

  

  React.useEffect(() => {
    const timer = setInterval(() => {
      setInProp(false);

      setTimeout(() => {
        setIndex((oldIndex) => {
          return (oldIndex + 1) % textArray.length;
        });
        setInProp(true);
      }, 500); // This should be equal to the exit duration below
    }, 3000); // Duration between changing texts

    return () => clearInterval(timer);
  }, []);

  // Inside your component
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate("/"); // Replace '/path-to-page' with the actual path
  };

  const navigateToPage1 = () => {
    navigate("/recharge"); // Replace '/path-to-page' with the actual path
  };

  const navigateToPage2 = () => {
    navigate("/withdraw"); // Replace '/path-to-page' with the actual path
  };



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleOpenDrawer = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleBetAmount = (amount) => {
    setBetAmount(amount);
  };

  const handleMultiplier = (multiplier) => {
    setMultiplier(multiplier);
  };

  const handleTotalBet = () => {
    setTotalBet(betAmount * multiplier);
  };


  const handlePlaceBet = async () => {
    const totalBet = betAmount * multiplier;

    // Check if user's wallet balance is less than the total bet amount
    if (betAmount === 0) {
      alert("You can't place a bet with 0 amount.");
      return;
    }
    if (user.walletAmount < totalBet) {
      alert("You don't have enough balance to place this bet.");
      return;
    }
    if (["00:06","00:05","00:04","00:03", "00:02", "00:01"].includes(remainingTime)) {
      alert("You can't place a bet in the last 5 seconds.");
      return;
    }
    const betData = {
      selectedItem: selectedItem,
      betAmount: betAmount,
      multiplier: multiplier,
      totalBet: totalBet,
      selectedTimer: selectedTimer,
      periodId: periodId,
      result: " ",
      status: " ",
      winLoss: "",
    };
setLastAlertedPeriodId(periodId);
    // Send a POST request to the backend API endpoint
    try {
      const response = await axios.post(
        `${domain}/wingobet/`,
        betData,
        { withCredentials: true }
      );

 
    } catch (err) {
      console.error(err);
    }

    setBetPlaced(true);
    setBetPeriodId(periodId);
    handleCloseDrawer();
    setOpenSnackbar(true);
  };

  const handleCancelBet = () => {
    setSelectedItem("");
    setBetAmount(0);
    setMultiplier(1);
    setTotalBet(0);
    handleCloseDrawer();
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpenSnackbar(false);
  };
  useEffect(() => {
    handleClick(images[0].id);
  }, []);

  const [lastPlayedTime, setLastPlayedTime] = useState(null);
  const [isSoundOn, setIsSoundOn] = useState(false);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };


  useEffect(() => {
    if (["00:03", "00:02", "00:01"].includes(remainingTime)) {
      setOpenDialog(true);
      if (isSoundOn && remainingTime !== lastPlayedTime) {
        countdownSound.play();
        setLastPlayedTime(remainingTime);
        setTimeout(() => {
          countdownSound.pause();
          countdownSound.currentTime = 0;
        }, 1000 - countdownSound.duration * 1000);
      }
    } else if (remainingTime === "00:00") {
      setOpenDialog(false);
      if (isSoundOn) {
        countdownSound.pause();
        countdownSound.currentTime = 0;
        setLastPlayedTime(null);
      }
    }
  }, [remainingTime, isSoundOn]);


  const handleEventSelection = (event) => {

    switch (event) {
      case "violet":
        setSelectedColor("RGB(182,89,254)");
        break;
      case "green":
        setSelectedColor("RGB(64,173,114)");
        break;
      case "red":
        setSelectedColor("RGB(253,86,92)");
        break;
      case "yellow":
        setSelectedColor("RGB(71,129,255)");
        break;
      case "blue":
        setSelectedColor("RGB(253,86,92)");
        break;
      case "big":
        setSelectedColor("rgb(255,168,46)");
        break;
      default:
        setSelectedColor("RGB(71,129,255)");
    }
  };
  const [activeButton, setActiveButton] = useState(1);
  const [activeBetAmount, setActiveBetAmount] = useState(1);

  const getColorAndSize = (popupresult) => {
    popupresult = Number(popupresult);


    let color = "unknown";
    let size = "";

    if ([1, 3, 7, 9].includes(popupresult)) {
      color = "green";
    } else if ([2, 4, 6, 8].includes(popupresult)) {
      color = "red";
    } else if (popupresult === 0) {
      color = "red and violet";
    } else if (popupresult === 5) {
      color = "green and violet";
    }

    if (popupresult > 5) {
      size = "big";
    } else {
      size = "small";
    }

    return `${color} ${popupresult} ${size}`;
};




useEffect(() => {
  console.log("useEffect triggered");
  const fetchUserData = async () => {
    console.log("fetchUserData called");
    try {
      const response = await axios.get(
        `${domain}/user/betshistory/`,
        { withCredentials: true }
      );
      setBets(response.data);
      let latestBet = response.data[0];
 
      if (latestBet.periodId == lastAlertedPeriodId) {
        console.log( "Latest bet periodId is the same as the last alerted periodId"); 
          if (latestBet.status === "Failed") {
            console.log("Latest bet status is FAIL");
            setOpen(true);
            setDialogContent("You lost the bet");
            setGameResult(latestBet.status);
            setWinLoss(latestBet.winLoss);
            setPopupPeriod(latestBet.selectedItem);
            setPopupResult(latestBet.result);
            setPopupPeriodId(latestBet.periodId);
            setPopupTimer(latestBet.selectedTimer);
            setLastAlertedPeriodId(null);
          } else if (latestBet.status === "Succeed") {
            setOpen(true);
            setDialogContent("Bonus");
            setGameResult(latestBet.status);
            setWinLoss(latestBet.winLoss);
            setPopupPeriod(latestBet.selectedItem);
            setPopupResult(latestBet.result);
            setPopupPeriodId(latestBet.periodId);
            setPopupTimer(latestBet.selectedTimer);
            setLastAlertedPeriodId(null);
          }
       
      }else{
        console.log("Latest bet periodId is not the same as the last alerted periodId");
      }
    } catch (err) {
      console.error(err);
    }
  };
  fetchUserData();
  const intervalId = setInterval(fetchUserData, 1000);

  return () => clearInterval(intervalId);
}, [periodId, lastAlertedPeriodId]);






  useEffect(() => {
    setTotalBet(betAmount * multiplier);
  }, [betAmount, multiplier]);

  const firstFiveRows = rows.slice(0, 5);



  const [selectedMultiplier, setSelectedMultiplier] = useState(1);

  const handleMultiplierChange = (multiplier) => {
    if (!multiplier.isRandom) {
      setSelectedMultiplier(multiplier.value);
    } else {
      // In a real app, you'd generate a random multiplier here
      const randomMultipliers = [1, 5, 10, 20, 50, 100];
      const randomIndex = Math.floor(Math.random() * randomMultipliers.length);
      setSelectedMultiplier(randomMultipliers[randomIndex]);
    }
  };


  return (
    <div>
      <Mobile>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backgroundColor: "rgb(34,39,91)",
            padding: "8px 16px",
            color: "white",
          }}
        >
          <Grid item xs={6} textAlign="left">
            <IconButton color="inherit" onClick={navigateToPage}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <IconButton color="inherit">
              <SupportAgentIcon />
            </IconButton>
         
<IconButton color="inherit" onClick={() => setIsSoundOn(!isSoundOn)}>
  {isSoundOn ? <MusicNoteIcon /> : <MusicOffIcon />}
</IconButton>
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          sx={{
            height: "300px",
            backgroundColor: "rgb(34,39,91)",
            borderRadius: "0 0 70px 70px",
            textAlign: "center",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "rgb(62,93,174)",
              margin: "0 20px 20px 20px",
              borderRadius: "30px",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <Grid
              sm={12}
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color:"white"
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {user ? user.walletAmount : " Loading"}
              </Typography>
              <IconButton sx={{color:"white"}}>
                <Refresh />
              </IconButton>
            </Grid>

            <Grid
              sm={12}
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color:"white"
              }}
            >
              <AccountBalanceWallet
                sx={{ marginRight: "10px", color: "RGB(71,129,255)" }}
              />
              <Typography variant="subtitle2">Wallet Balance</Typography>
            </Grid>
            <Grid
              sm={12}
              mt={3}
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                onClick={navigateToPage2}
                fullWidth
                sx={{
                  marginLeft: "10px",
                  color: "white",
                  borderColor: "white",
                  borderRadius: "50px",
                }}
              >
                Withdraw
              </Button>
              <Button
                variant="contained"
                onClick={navigateToPage1}
                fullWidth
                sx={{
                  marginLeft: "10px",
                  backgroundColor: "RGB(71,129,255)",
                  borderRadius: "50px",
                }}
              >
                Deposit
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{
              backgroundColor: "rgb(62,93,174)",
              margin: "0 20px 20px 20px",
              borderRadius: "3px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton>
              <VolumeUp sx={{ color: "RGB(71,129,255)" }} />
            </IconButton>
            <CSSTransition
              in={inProp}
              timeout={500}
              classNames="message"
              unmountOnExit
            >
              <Typography variant="caption" sx={{ color: "white" }}>
                {textArray[index]}
              </Typography>
            </CSSTransition>

            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "RGB(71,129,255)",
                borderRadius: "50px",
                fontSize: "9px",
                paddingLeft: "12px",
                paddingRight: "12px",
              }}
              startIcon={<WhatshotIcon />}
            >
              Details
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "95%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "-50px",
            backgroundColor: "rgb(42,50,112)",
            borderRadius: "30px",
            color:"white"
          }}
        >
          {images.map((image) => (
            <Grid
              item
              xs={3}
              key={image.id}
              onClick={() => handleClick(image.id)}
              style={{
                cursor: "pointer",
                border:
                  activeId === image.id ? "1px solid rgb(65,101,188)" : "none",
                backgroundColor:
                  activeId === image.id ? "rgb(65,101,188)" : "transparent",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Align items horizontally
                justifyContent: "center", // Align items vertically
              }}
            >
              <img
                src={activeId === image.id ? image.altSrc : image.src}
                alt={image.subtitle}
                style={{ width: "80%" }}
              />
              <Typography variant="caption">{image.subtitle}</Typography>
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          spacing={0}
          mt={2}
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "95%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundImage: 'url("games/assets/diban-ad1641e9.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Grid item mt={2} sx={{ justifyContent: "flex-start" }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: "20px",
                }}
                startIcon={<NoteIcon />}
              >
                How To Play
              </Button>
            </Grid>
            <Grid item>
              <Typography
                variant="caption"
                sx={{ color: "white" }}
              >{`Win Go ${selectedTimer}`}</Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                marginBottom: "10px",
                justifyContent: "center",
              }}
            >
              {firstFiveRows.map((row, index) => (
                <img
                  key={index}
                  src={`games/assets/games/${row.numberOutcome.trim()}.png`}
                  className="auja"
                  alt={`Image ${index + 1}`}
                  style={{
                    width: "13%",
                    marginRight:
                      index !== firstFiveRows.length - 1 ? "10px" : "0",
                  }}
                />
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Typography variant="caption" sx={{ color: "white" }}>
                Seconds Remaining
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" sx={{ color: "white" }}>
                {remainingTime}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" sx={{ color: "white" }}>
                {periodId ? periodId.toString().slice(0, -2) : ""}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          mt={2}
          spacing={2}
          sx={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "95%",
            borderRadius: "20px",
            backgroundColor:"rgb(42,50,112)"
          }}
        >
          {/* First Row */}
          <Grid item xs={12} container justifyContent="space-evenly" >
            <Button
              onClick={() => {
                handleOpenDrawer("green");
                handleEventSelection("green");
              }}
              variant="contained"
              sx={{
                backgroundColor: "RGB(64,173,114)",
                width: "100px",
                borderRadius: "0 10px 0 10px",
              }}
            >
              Green
            </Button>
            <Button
              onClick={() => {
                handleOpenDrawer("violet");
                handleEventSelection("violet");
              }}
              variant="contained"
              sx={{
                backgroundColor: "white",
                width: "100px",
                borderRadius: "10px",
                color:"black"
              }}
            >
              Violet
            </Button>
            <Button
              onClick={() => {
                handleOpenDrawer("red");
                handleEventSelection("red");
              }}
              variant="contained"
              sx={{
                backgroundColor: "RGB(253,86,92)",
                width: "100px",
                borderRadius: "10px 0 10px 0",
              }}
            >
              Red
            </Button>
          </Grid>
          {/* Second Row */}
          <Grid
            container
            mt={2}
            sx={{
              backgroundColor: "rgb(50,58,124)",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "95%",
              borderRadius: "20px",
              padding: "10px",
            }}
          >
            <Grid item xs={12} container justifyContent="space-evenly">
              <img
                src="games/assets/games/0.png"
                alt="0"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("0");
                  handleEventSelection("violet");
                }}
              />
              <img
                src="games/assets/games/1.png"
                alt="1"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("1");
                  handleEventSelection("green");
                }}
              />
              <img
                src="games/assets/games/2.png"
                alt="2"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("2");
                  handleEventSelection("red");
                }}
              />
              <img
                src="games/assets/games/3.png"
                alt="3"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("3");
                  handleEventSelection("green");
                }}
              />
              <img
                src="games/assets/games/4.png"
                alt="4"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("4");
                  handleEventSelection("red");
                }}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="space-evenly">
              <img
                src="games/assets/games/5.png"
                alt="5"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("5");
                  handleEventSelection("green");
                }}
              />
              <img
                src="games/assets/games/6.png"
                alt="6"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("6");
                  handleEventSelection("red");
                }}
              />
              <img
                src="games/assets/games/7.png"
                alt="7"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("7");
                  handleEventSelection("green");
                }}
              />
              <img
                src="games/assets/games/8.png"
                alt="8"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("8");
                  handleEventSelection("red");
                }}
              />
              <img
                src="games/assets/games/9.png"
                alt="9"
                style={{ width: "15%" }}
                onClick={() => {
                  handleOpenDrawer("9");
                  handleEventSelection("green");
                }}
              />
            </Grid>
          </Grid>
          {/* Third Row */}
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <StyledButtonGroup variant="contained" aria-label="multiplier selection">
        {multipliers.map((multiplier) => (
          <StyledButton
            key={multiplier.label}
            onClick={() => handleMultiplierChange(multiplier)}
            active={!multiplier.isRandom && selectedMultiplier === multiplier.value ? 1 : 0}
            className={multiplier.isRandom ? 'random' : ''}
          >
            {multiplier.label}
          </StyledButton>
        ))}
      </StyledButtonGroup>
    </Box>
          {/* Fourth Row */}
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            sx={{ marginBottom: "10px" }}
          >
            <Grid item>
              <Button
                onClick={() => {
                  handleOpenDrawer("big");
                  handleEventSelection("big");
                }}
                variant="contained"
                sx={{
                  width: "150px",
                  borderRadius: "20px 0 0 20px",
                  margin: "0",
                  backgroundColor: "rgb(255,168,46)",
                }}
              >
                Big
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  handleOpenDrawer("small");
                  handleEventSelection("blue");
                }}
                variant="contained"
                sx={{
                  width: "150px",
                  borderRadius: "0 20px 20px 0",
                  margin: "0",
                }}
              >
                Small
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar 
  open={openSnackbar} 
  autoHideDuration={1000} 
  onClose={handleCloseSnackbar}
  style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }}
>
  <MuiAlert onClose={handleCloseSnackbar} severity="success" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white'}}>
    Bet placed successfully!
  </MuiAlert>
</Snackbar>

        <Drawer anchor="bottom" open={drawerOpen} onClose={handleCloseDrawer}>
          <Grid container alignItems="center">
            <Grid
              item
              xs={12}
              align="center"
              style={{
                position: "relative",
                marginBottom: "20px",
                height: "100px",
                color: "white",
                backgroundColor: "transparent",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: selectedColor,
                  clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
                }}
              ></div>
              <div style={{ position: "relative" }}>
                <Typography variant="h6">{`Win Go ${selectedTimer}`}</Typography>
                <Typography variant="body1">{`${selectedItem} is selected`}</Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent="space-between">
                <Typography variant="h6">Balance</Typography>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 1 ? selectedColor : undefined,
                  }}
                  onClick={() => {
                    handleBetAmount(1);
                    setActiveBetAmount(1);
                  }}
                >
                  {"\u20B9" + "1"}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 10 ? selectedColor : undefined,
                  }}
                  onClick={() => {
                    handleBetAmount(10);
                    setActiveBetAmount(10);
                  }}
                >
                  {"\u20B9" + "10"}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 100 ? selectedColor : undefined,
                  }}
                  onClick={() => {
                    handleBetAmount(100);
                    setActiveBetAmount(100);
                  }}
                >
                  {"\u20B9" + "100"}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 50,
                    backgroundColor:
                      activeBetAmount === 1000 ? selectedColor : undefined,
                  }}
                  onClick={() => {
                    handleBetAmount(1000);
                    setActiveBetAmount(1000);
                  }}
                >
                  {"\u20B9" + "1000"}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container>
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-between"
                  align="center"
                  alignItems="center"
                >
                  <Typography variant="h6">Quantity</Typography>
                  <div
                    className="button1"
                    onClick={() =>
                      setMultiplier(multiplier > 1 ? multiplier - 1 : 1)
                    }
                  >
                    -
                  </div>

                  <Typography
                    variant="body1"
                    style={{ border: "1px solid black", width: "50px" }}
                  >
                    {multiplier}
                  </Typography>
                  <div
                    className="button1"
                    onClick={() => setMultiplier(multiplier + 1)}
                  >
                    +
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container justifyContent="flex-end">
                <div
                  className={`button ${activeButton === 1 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(1);
                    setActiveButton(1);
                  }}
                  style={
                    activeButton === 1 ? { backgroundColor: selectedColor } : {}
                  }
                >
                  X1
                </div>
                <div
                  className={`button ${activeButton === 5 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(5);
                    setActiveButton(5);
                  }}
                  style={
                    activeButton === 5 ? { backgroundColor: selectedColor } : {}
                  }
                >
                  X5
                </div>
                <div
                  className={`button ${activeButton === 10 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(10);
                    setActiveButton(10);
                  }}
                  style={
                    activeButton === 10
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                >
                  X10
                </div>
                <div
                  className={`button ${activeButton === 20 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(20);
                    setActiveButton(20);
                  }}
                  style={
                    activeButton === 20
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                >
                  X20
                </div>
                <div
                  className={`button ${activeButton === 50 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(50);
                    setActiveButton(50);
                  }}
                  style={
                    activeButton === 50
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                >
                  X50
                </div>
                <div
                  className={`button ${activeButton === 100 ? "active" : ""}`}
                  onClick={() => {
                    handleMultiplier(100);
                    setActiveButton(100);
                  }}
                  style={
                    activeButton === 100
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                >
                  X100
                </div>
              </Grid>
            </Grid>

            <Grid item xs={12} mt={2}>
              <Grid container justifyContent="space-around" spacing={0}>
                <Grid item xs={3}>
                  <Button
                    onClick={handleCancelBet}
                    fullWidth
                    style={{ backgroundColor: "black" }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={9}>
                  <Button
                    onClick={handlePlaceBet}
                    fullWidth
                    style={{ background: selectedColor }}
                    variant="contained"
                  >{`Total Bet: ${betAmount * multiplier}`}</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Drawer>

        <Dialog
          open={openDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              width: "350px", // Set this to the desired size of your square
              height: "250px", // Set this to the same value as width
              backgroundColor: "rgba(0, 0, 0, 0.5)", // This sets the opacity of the dialog box background
              overflow: "hidden",
              borderRadius:"40px" // This removes the scrollbars
            },
          }}
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                textAlign: "center",
                fontSize: "120px",
                fontWeight: "bold",
                color: " RGB(71,129,255)",
              }}
            >
              {remainingTime ? remainingTime.split(":")[1] : ""}
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <Grid mt={2} sx={{ marginBottom: "100px" }}>
        <Tabs
    value={value}
    onChange={handleChange}
    indicatorColor="transparent"
    style={{
      marginLeft: "20px",
    }}
  >
    <Tab
      label="Game History"
      style={
        value === 0
          ? {
              backgroundColor: "RGB(71,129,255)",
              color: "white",
              borderRadius: "20px",
            }
          : { color: "white" }
      }
    />
    <Tab
      label="Chart"
      style={
        value === 1
          ? {
              backgroundColor: "RGB(71,129,255)",
              color: "white",
              borderRadius: "20px",
            }
          : { color: "white" }
      }
    />
    <Tab
      label="My History"
      style={
        value === 2
          ? {
              backgroundColor: "RGB(71,129,255)",
              color: "white",
              borderRadius: "20px",
            }
          : { color: "white" }
      }
    />
  </Tabs>
          <TabPanel value={value} index={0}>
            <CustomTable data={rows} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RowVisualization data={rows} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container style={{ marginLeft: "-15px" }}>
              {bets
                .slice()
                .sort((a, b) =>
                  b.timestamp && a.timestamp
                    ? b.timestamp.seconds - a.timestamp.seconds
                    : 0
                )
                .map((bet, index) => (
                  <Accordion sx={{backgroundColor:"rgb(42,50,112)"}}>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      
                    >
                      <Grid
                        container
                        style={{
                          backgroundColor: "rgb(34,39,91)",
                          marginTop: "10px",
                          padding: "18px",
                          width: "350px",
                        }}
                      >
                        <Grid item xs={3} sm={3} >
                          <Box
                            border={1}
                            borderRadius={2}
                            style={{
                              background: 
                                bet.selectedItem.toLowerCase() === 'green' || [1, 3, 7, 9].includes(Number(bet.selectedItem))
                                  ? 'RGB(64,173,114)' 
                                  : bet.selectedItem.toLowerCase() === 'red' || [2, 4, 6, 8].includes(Number(bet.selectedItem))
                                    ? 'RGB(253,86,92)' 
                                    : bet.selectedItem.toLowerCase() === 'violet' 
                                      ? 'RGB(182,89,254)' 
                                      : Number(bet.selectedItem) === 0 
                                        ? 'linear-gradient(to right, rgb(253,86,92) 50%, rgb(182,89,254) 50%)'
                                        :Number(bet.selectedItem) === 5
                                          ? 'linear-gradient(to right, rgb(64,173,114) 50%, rgb(182,89,254) 50%)'
                                        : "rgb(71,129,255)",
                              color: "white",
                              height: "40px",
                              width: "80px",
                              display: "flex",
                              border:"none",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "14px" }}
                            >
                              {isNaN(bet.selectedItem.split(" ")[0])
                                ? bet.selectedItem.split(" ")[0].toUpperCase()
                                : bet.selectedItem}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={7} sm={7} style={{ textAlign: "center" }}
                        >
                          <Typography
                            variant="body1"
                            style={{ fontSize: "12px", fontWeight: "bold",color:"white" }}
                          >
                            {bet.periodId}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "12px",color:"white" }}
                          >
                            {bet.timestamp
                              ? `${new Date(bet.timestamp).toLocaleDateString(
                                  "en-GB"
                                )} 
                 ${new Date(bet.timestamp).toLocaleTimeString("en-GB")}`
                              : "N/A"}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2}>
                          <Box
                            border={1}
                            borderRadius={1}
                            borderColor={bet.winLoss > 0 ? "green" : "red"}
                            sx={{
                              height: "20px",
                              width: "65px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body1"
                              style={{
                                color: bet.winLoss > 0 ? "green" : "red",
                              }}
                            >
                              {bet.status}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            style={{ color: bet.winLoss > 0 ? "green" : "red" }}
                          >
                            {bet.winLoss > 0
                              ? `+₹${bet.winLoss}`
                              : `₹${bet.winLoss}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ fontWeight: "bold",color:"white" }}>
                                Bet Amount
                              </TableCell>
                              <TableCell style={{ fontWeight: "bold",color:"white" }}>
                                {bet.betAmount}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: "bold",color:"white" }}>
                                Multiplier
                              </TableCell>
                              <TableCell style={{ fontWeight: "bold" ,color:"white"}}>
                                {bet.multiplier}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: "bold",color:"white" }}>
                                Total Bet
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "green" }}
                              >
                                {bet.totalBet}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: "bold" ,color:"white"}}>
                                Tax
                              </TableCell>
                              <TableCell style={{ fontWeight: "bold",color:"white" }}>
                                {bet.tax}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: "bold",color:"white" }}>
                                Fee
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "bold", color: "red",color:"white" }}
                              >
                                {bet.fee}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: "bold" ,color:"white"}}>
                                Selected Timer
                              </TableCell>
                              <TableCell style={{ fontWeight: "bold",color:"white" }}>
                                {bet.selectedTimer}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: "bold" ,color:"white"}}>
                                Result
                              </TableCell>
                              <TableCell style={{ fontWeight: "bold" ,color:"white"}}>
                                {bet.result}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ fontWeight: "bold",color:"white" }}>
                                Winloss
                              </TableCell>
                              <TableCell
                                style={{
                                  fontWeight: "bold",
                                  color: bet.status === "win" ? "green" : "red",
                                }}
                              >
                                {bet.winLoss}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Grid>
          </TabPanel>
        </Grid>
        <>
          {/* ...rest of the code... */}

          <div
            style={{
              display: open ? "block" : "none",
              position: "absolute", // changed from fixed to absolute
              zIndex: 1,
              left: 0,
              top: "100px",
              width: "100%",
              height: "100%",
              overflow: "auto",
              border:"none"
            }}
          >
            <div
              style={{
                backgroundColor: "transparent",
                margin: "15% auto",
                padding: 20,
                width: "80%",
                height: "50%",
                backgroundImage: `url(${
                  gameResult === "Succeed"
                    ? "assets/images/missningBg-6f17b242.png"
                    : "assets/images/missningLBg-73e02111.png"
                })`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  position: "absolute",
                  marginTop: "-100px",
                  color: "white",
                }}
              >
                {gameResult === "Succeed" ? "Congratulations" : "Sorry"}
              </Typography>
              <br />
              <Typography
                variant="h6"
                style={{
                  textAlign: "center",
                  position: "absolute",
                  marginTop: "-30px",
                  color: "white",
                }}
              >
                Lottery results {getColorAndSize(popupresult)}
              </Typography>
              <Typography
                sx={{
                  marginTop: "150px",
                  marginLeft: "50px",
                  marginRight: "50px",
                  fontWeight: "bold",
                }}
                variant="h5"
                color="text.secondary"
              >
                {dialogContent} 
                <br />
                <span style={{ color: gameResult === "Succeed" ? "green" : "red" }}>
                  ₹{winloss}
                </span><br />
                <span style={{ fontSize:"10px"}}>
                  Period: Win { popupTimer} {popupperiodid}
                </span>
              </Typography>

              <Button
                sx={{
                  marginTop: "380px",
                  marginLeft: "50px",
                  marginRight: "50px",
                  position: "absolute",
                }}
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </>

        
      </Mobile>
    </div>
  );
};

export default Head;
