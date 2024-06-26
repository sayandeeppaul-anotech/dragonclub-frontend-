import React, { useEffect,useState} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Typography, Button,Grid} from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import {Container,Card,CardContent,LinearProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from 'axios';
import {domain} from './config'


const depositOptions = [
  { amount: 300, bonus: 50 },
  { amount: 500, bonus: 150 },
  { amount: 1000, bonus: 200 },
  { amount: 3000, bonus: 400 },
  { amount: 4000, bonus: 500 },
  { amount: 5000, bonus: 600 },
  { amount: 10000, bonus: 1100 },
  { amount: 50000, bonus: 4100 },
  { amount: 100000, bonus: 5500 },
];

const options = [
  { label: 'Copy invitation code', image: 'assets/images/copy.png' },
  { label: 'Subordinate data', image: 'assets/images/sub.png' },
  { label: 'Commission details', image: 'assets/images/com.png' },
  { label: 'Invitation rules', image: 'assets/images/invi.png' },
  { label: 'New Subordinates', image: 'assets/images/subordinate-1cba3c06.png' },
  { label: 'Agent line customer service', image: 'assets/images/agent.png' },
];

const PromotionMain = ({ children }) => {


  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const navigate = useNavigate();
  const [commissionWallet, setCommissionWallet] = useState(0);
  const [referralCount, setReferralCount] = useState(0);


  const [inviteLink, setInviteLink] = useState('');

const [ commission , setCommission] = useState(0);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/commission-stats`, { withCredentials: true });
        setCommission(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);



  const [ subordinate , setSubordinates] = useState(0);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/api/subordinates`, { withCredentials: true });
        setSubordinates(response.data);
     
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);


  const [ totalCommission , SetTotalCommission] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/user/totalcommission`, { withCredentials: true });
        SetTotalCommission(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, [ totalCommission]);




  const handleCopyLink = async () => {
    navigate('/invite');
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${domain}/user`, { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);


 


  const dataItems = [
    { heading: 'Number of Registers ', value: subordinate?.totalDirectSubordinates?.noOfRegister || 0 },
    { heading: 'Deposit Number ', value: subordinate?.totalDirectSubordinates?.depositNumber || 0 },
    { heading: 'Total Deposit ', value: subordinate?.totalDirectSubordinates?.depositAmount || 0 },
    { heading: 'Number of People Making First Deposit ', value: subordinate?.totalDirectSubordinates?.firstDeposit || 0 },
    { heading: 'Number of Registers ', value: subordinate?.totalTeamSubordinates?.noOfRegister || 0 },
    { heading: 'Deposit Number ', value: subordinate?.totalTeamSubordinates?.depositNumber || 0 },
    { heading: 'Total Deposit ', value: subordinate?.totalTeamSubordinates?.depositAmount || 0 },
    { heading: 'Number of People Making First Deposit ', value: subordinate?.totalTeamSubordinates?.firstDeposit || 0 },
  ];


  const data = [
    { heading: 'This week', value: user?.thisWeekCommission || 0 },
    { heading: 'Total commission', value: user?.totalCommission || 0 },
    { heading: 'Direct subordinate', value: user?.directSubordinates || 0 },
    { heading: 'Total subordinates in team', value: (user?.totalSubordinates || 0) - (user?.directSubordinates || 0) },
    { heading: 'First Deposits Direct', value: user?.firstDepositsDirect || 0 },
    { heading: 'First Deposits Team', value: user?.firstDepositsTeam || 0 },
  ];


  const handleOptionClick = async (option) => {
    switch (option.label) {
      case 'Copy invitation code':
        try {
          await navigator.clipboard.writeText(user.invitationCode);
          


          alert('Invitation code copied to clipboard');
        } catch (err) {
          console.error('Failed to copy invitation code: ', err);
        }
        break;
      case 'Subordinate data':
        navigate('/subordinate-data');
        break;
      case 'Commission details':
        navigate('/commision-details');
        break;
      case 'Invitation rules':
        navigate('/invitation-rules');
        break;
      case 'Agent line customer service':
          window.open('https://t.me/Dragon_club_support', '_blank');
          break;
      case 'New Subordinates':
        navigate('/newsubordinate');
        break;
      // Add more cases for other options
      default:
        console.log(`Clicked on option: ${option.label}`);
    }
  };

  const handleDownload = () => {
    // Programmatically click the hidden anchor tag
    const link = document.createElement('a');
    link.href = `https://111club.online/abclottery.apk`; // Change this to the actual path of the APK file on your server
    link.download = 'abclottery.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(true); 

  const handleClose = () => {
    setOpen(false); 
  };
  
  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1} sx={{backgroundColor:"rgb(55,74,148)"}}>


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
                <span style={{ fontWeight: "bold" }}>Agency </span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <IconButton color="inherit" onClick={() => navigate('/messages')}>
  <SmsIcon />
</IconButton>
<IconButton style={{color:"white"}} onClick={handleDownload}>
        <DownloadIcon />
      </IconButton>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2} sx={{  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '95%',
                borderRadius:"10px"}}>
      {/* First Grid */}
      
      <Grid item xs={12} sx={{borderRadius: '10px 10px 0 0',   backgroundColor: 'rgb(42,50,112)', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="caption" sx={{ color:"white"}} align="center"> {`\u20B9${totalCommission ? totalCommission.totalCommission : " Loading"}`}
</Typography>      

   <Typography variant="caption" color={'white'} align="center">Total commission</Typography>
        <Typography variant="caption" color={'white'} align="center">Upgrade the level to increase commission income</Typography>
      </Grid>

      {/* Second Grid */}
      <Grid item xs={12} sx={{borderRadius: '8px 8px 0 0', borderTopLeftRadius: '8px', backgroundColor:"rgb(55,72,146)", borderTopRightRadius: '8px', borderBottom: '1px solid #ccc', padding: '10px' }}>
        <Grid container justifyContent="space-evenly">
          <Grid item >
            <Box display="flex" alignItems="center">
              <PeopleIcon style={{ color: 'rgb(41,166,242)' }}/>
              <Typography variant="body1" sx={{color:"white"}} align="center">Direct subordinates</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="right">
              <PeopleIcon style={{ color: 'rgb(41,166,242)' }}  />
              <Typography variant="body1" sx={{color:"white"}} align="center">Team subordinates</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* Third Grid */}
      <Grid item container xs={12} spacing={0} sx={{ padding: '10px' }}>
      <React.Fragment>
  <Grid item xs={6}>
    <Typography variant="caption" align="center" sx={{color:"white"}}>{dataItems[0].heading}</Typography>
    <Typography variant="h6" align="center" sx={{color:"white"}}>{dataItems[0].value}</Typography>
  </Grid>
  
  <Grid item xs={6}>
    <Typography variant="caption" align="center" sx={{color:"white"}}>{dataItems[4].heading}</Typography>
    <Typography variant="h6" align="center" sx={{color:"white"}}>{dataItems[4].value}</Typography>
  </Grid>
</React.Fragment>

<React.Fragment>
  <Grid item xs={6}>
    <Typography variant="caption" align="center" sx={{color:"white"}}>{dataItems[1].heading}</Typography>
    <Typography variant="h6" align="center" sx={{color:"green"}}>{dataItems[1].value}</Typography>
  </Grid>
  
  <Grid item xs={6}>
    <Typography variant="caption" align="center" sx={{color:"white"}}>{dataItems[5].heading}</Typography>
    <Typography variant="h6" align="center" sx={{color:"green"}}>{dataItems[5].value}</Typography>
  </Grid>
</React.Fragment>

<React.Fragment>
  <Grid item xs={6}>
    <Typography variant="caption" align="center" sx={{color:"white"}}>{dataItems[2].heading}</Typography>
    <Typography variant="h6" align="center" sx={{color:"orange"}}>{dataItems[2].value}</Typography>
  </Grid>
  
  <Grid item xs={6}>
    <Typography variant="caption" align="center" sx={{color:"white"}}>{dataItems[6].heading}</Typography>
    <Typography variant="h6" align="center" sx={{color:"orange"}}>{dataItems[6].value}</Typography>
  </Grid>
</React.Fragment>

<React.Fragment>
  <Grid item xs={6}>
    <Typography variant="caption" align="center" sx={{color:"white"}}>{dataItems[3].heading}</Typography>
    <Typography variant="h6" align="center" sx={{color:"white"}}>{dataItems[3].value}</Typography>
  </Grid>
  
  <Grid item xs={6}>
    <Typography variant="caption" align="center" sx={{color:"white"}}>{dataItems[7].heading}</Typography>
    <Typography variant="h6" align="center" sx={{color:"white"}}>{dataItems[7].value}</Typography>
  </Grid>
</React.Fragment>
      </Grid>
    </Grid>


    <Button
    onClick={handleCopyLink}
      variant="contained"
      color="primary"
      sx={{
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px', // Adjust as needed
        marginBottom: '20px', 
        backgroundColor: 'rgb(41,166,242)',
        borderRadius:"20px"// Adjust as needed
      }}
    >
      Invitation Link
    </Button>
    <div>
      {options.map((option, index) => (
        <MenuItem key={index} onClick={() => handleOptionClick(option)}>
          <ListItemIcon>
            <img src={option.image} alt="icon" style={{ width: 24, height: 24, marginRight: 8 }} />
          </ListItemIcon>
          <Typography variant="inherit" sx={{color:"white"}}>{option.label}</Typography>
          <ListItemIcon style={{ marginLeft: 'auto',color:"white" }}>
            <ArrowForwardIcon />
          </ListItemIcon>
        </MenuItem>
      ))}
    </div>


    <Grid mt={4} sx={{ backgroundColor: 'rgb(55,73,148)', borderRadius: '8px' ,   marginLeft: 'auto',
                marginRight: 'auto', width:"95%", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', marginBottom:"150px"  }}>
                   {/* New Grid */}
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="subtitle1" sx={{marginLeft:"5px",fontWeight:"bold",color:"white"}} align="left">Promotion data</Typography>
    </Grid>
  </Grid>
      {/* First Grid */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Typography variant="caption" sx={{color:"white"}}>{commission.commissionLast7Days}</Typography>

          <Typography variant="subtitle1" sx={{color:"white"}}>{data[0].heading}</Typography>
         
        </Grid>
        <Grid item xs={6}>
        <Typography variant="caption" sx={{color:"white"}}>{commission.totalCommissionTillNow}</Typography>

          <Typography variant="subtitle1" sx={{color:"white"}}>{data[1].heading}</Typography>
        
        </Grid>
      </Grid>
      {/* Second Grid */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Typography variant="caption" sx={{color:"white"}}>{commission.totalDirectSubordinates}</Typography>
          <Typography variant="subtitle1" sx={{color:"white"}}>{data[2].heading}</Typography>
         
        </Grid>
        <Grid item xs={6}>
        <Typography variant="caption" sx={{color:"white"}}>{commission.totalTeamSubordinates}</Typography>
          <Typography variant="subtitle1" sx={{color:"white"}}>{data[3].heading}</Typography>
         
        </Grid>
      </Grid>
    </Grid>




{/* 
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} sx={{height:"600px",marginTop:"100px",marginRight:"30px",marginLeft:"30px",width:"auto"}}>
  
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ backgroundColor: "rgb(43,50,112)", padding: 2, flexGrow: 1 }}>
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
              <Typography variant="h6" sx={{ color: "#ffffff", marginBottom: 1 }}>
                Extra first deposit bonus
              </Typography>
              <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                Each account can only receive rewards once
              </Typography>
            </Box>
            {depositOptions.map((option, index) => (
              <Card key={index} sx={{ backgroundColor: "rgb(55,73,146)", marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#ffffff" }}>
                    First deposit {option.amount.toLocaleString()}{" "}
                    <span style={{ color: "#ffa726" }}>
                      + ₹{option.bonus.toFixed(2)}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#b0b0b0", marginBottom: 2 }}>
                    Deposit {option.amount.toLocaleString()} for the first time and
                    you will receive {option.bonus.toFixed(2)} bonus
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={0}
                    sx={{ height: 10, borderRadius: 5, marginBottom: 2 }}
                  />
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#1976d2", justifyContent: "flex-end" }}
                  >
                    Deposit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Box
            sx={{
              backgroundColor: "#394363",
              padding: theme.spacing(2),
              textAlign: "center",
            }}
          >

         <IconButton
          color="inherit"
          onClick={handleClose}
          sx={{
            position: "fixed",
            bottom: theme.spacing(2),
            left: "50%",
            bottom: "20%",
            transform: "translateX(-50%)",
            zIndex: theme.zIndex.appBar + 1, 
            color: "#ffffff",

          }} >
        <CancelOutlinedIcon />
        </IconButton >
          </Box>
        </Box>
    </Dialog> */}
          

  {/* content end */}


          </Box>
          
              {children}

        </Box>
      </Mobile>
    </div>
  )
}

export default PromotionMain;