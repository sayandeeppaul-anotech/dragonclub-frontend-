import React, { useEffect,useState} from 'react'
import Mobile from '../Components/Mobile';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Divider from '@mui/material/Divider';
import { useAuth } from '../contexts/AuthContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MenuList,MenuItem,ListItemText } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import axios from 'axios';
import { domain } from './config'; 



const ImageSubtitleGrid = ({ imageSrc, subtitle1, subtitle2,fontSize }) => (
  <Grid container spacing={1} sx={{ backgroundColor: 'rgb(42,50,112)', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', marginBottom: '10px' , width:"80%",paddingBottom:"3px" }}>
    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}  >
      <img src={imageSrc} alt="placeholder" style={{ width: '130%', borderRadius: '8px' }} />
    </Grid>
    <Grid item xs={9} align="left" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="caption"  sx={{ display: 'flex', alignItems: 'center', height: '100%',fontWeight:"bold",opacity:0.6,color:"white" }} >{subtitle1}</Typography>
      <Typography variant=""  sx={{ display: 'flex', alignItems: 'center', height: '100%',color:"white",fontSize:"14px" }}>{subtitle2}</Typography>
    </Grid>
  </Grid>
);



const images = [
  { url: 'assets/images/download (21).png', caption: 'Settings' },
  { url: 'assets/images/download (22).png', caption: 'Feedback' },
  { url: 'assets/images/download (23).png', caption: 'Notifications' },
  { url: 'assets/images/serviceCenter-ed250156.png', caption: '24/7 Customer service' },
  { url: 'assets/images/download (24).png', caption: 'Beginners,s Guide' },
  { url: 'assets/images/download (25).png', caption: 'About Us' },
];


const AccountMain = ({ children }) => {
  const profilePhotoUrl = 'assets/images/15-80f41fc6.png';
  const heading = 'Profile Name';
  const subtitle = 'UID: 1234567890';
  const lastLogin = 'Last Login: 2024-02-24';
  const captionText = 'Daily intrest rate 0.1% + VIP extra incocme safe, calculated every 1 minute '
  const [userData, setUserData] = React.useState(null);

 

  const handleCopy = () => {
    navigator.clipboard.writeText(subtitle);
  };

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);



  const handleRefresh = () => {
    // Handle refresh logic
  };

  const handleButtonClick = (action) => {
    // Handle button click logic
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = sessionStorage.getItem('admin');
    setIsAdmin(admin === 'true');
  }, []);


  const options = [
    { label: 'Notifications', icon: 'assets/images/download22.png', subLabel: null, onClick: () => navigate('/messages') },
    { label: 'Gifts', icon: 'assets/images/download (19).png', subLabel: null, onClick: () => navigate('/coupen-user') },
    { label: 'Game Statistics', icon: 'assets/images/download (20).png', subLabel: null, },
    { label: 'Language', icon: 'assets/images/languageIcon-4c117d4d.png', subLabel: 'English', onClick: () => navigate('/language') },
    isAdmin ? { label: 'Administrative Area', icon: 'assets/images/management.png', onClick: () => navigate('/dashboard') } : null,
  ].filter(Boolean);



  const { logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };


  const handleImageClick = (index) => {
    switch (index) {
      case 0: // Settings
        navigate('/settings');
        break;
      case 2: // Notifications
        navigate('/messages');
        break;
      case 3: // 24/7 Customer service
        navigate('/support');
        break;
      default:
        console.log(`Clicked Image ${index+1}`);
        break;
    }
  };

  const [user, setUser] = useState(null);
  console.log(user);

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

  return (
    <div>
      <Mobile>
        
        <Box
           display="flex"
           flexDirection="column"
           height="calc(var(--vh, 1vh) * 100)"
           position="relative"
            sx={{
              backgroundColor: 'rgb(34,39,91)', // Base background color
              overflowY: 'scroll',
              overflowX: 'hidden',
              '&::-webkit-scrollbar': {
                width: '1px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgb(34,39,91)',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(34,39,91)',
              },
            }}
       
          
          
        >
          <Box flexGrow={1} >
            <Grid
              container
              sx={{
                backgroundImage: 'linear-gradient(90deg, rgb(42,50,112) 0%, rgb(42,50,112) 100%)', // Base grid background color
                borderRadius: '0 0 20px 20px', // Border radius in the lower corners of both sides
                padding: '20px',
              }}
            >
              <Grid item xs={4} align="center">
                <Avatar src="https://91club.bet/assets/png/1-a6662edb.png" sx={{ width: 80, height: 80 }} />
              </Grid>
              <Grid item xs={8} container direction="column" justifyContent="space-between">
  <Grid item align="left">
    <Typography variant="caption" align="center" color="white" sx={{ fontWeight: "bold" }}>{user ? user.username : "Loading.."}</Typography>
  </Grid>
  <Grid item container alignItems="center" justifyContent="center" sx={{ borderRadius: '50px',height:"30px",backgroundColor: 'rgb(221,144,56)',width:"200px" }}>
  <Grid item xs={6} container alignItems="center" direction="row">
  <Typography variant="caption" align="left" color="white">{`UID`}</Typography>
  <Box sx={{ height: '15px', borderLeft: '1px solid white', mx: 1 }} />
  <Typography variant="caption" align="left" color="white">{`${user ? user.uid : 0}`}</Typography>
</Grid>
    <Grid item xs={4} container alignItems="center">
      <IconButton onClick={handleCopy}>
        <FileCopyIcon sx={{ color: "white",width:"15px",height:"15px" }} />
      </IconButton>
    </Grid>
  </Grid>

                <Grid item align="left">
                  <Typography variant="caption" align="left" color="white">{`Last Login: ${user ? new Date(user.lastLoginTime).toLocaleString() : "Loading.."}`}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{
                height: '100px',
              }}>



              </Grid>
            </Grid>

            <div style={{ position: 'relative', marginTop: '-20%', zIndex: 1 }}>
              <Grid container sx={{
                backgroundColor: 'rgb(55,72,146)',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '95%', // Decreased width

              }}>
                <Grid item xs={12}>
                  <Typography variant="h6" align="left" sx={{color:"white",fontSize:"14px"}}>Total Balance</Typography>
                </Grid>

                <Grid item xs={12} align="Left">
                  <Typography variant="caption" align="center" sx={{color:"white",fontWeight:"bold",fontSize:"20px"}}>{`\u20B9${user ? user.walletAmount : "Loading"}`}<IconButton onClick={handleRefresh}>
                    <AutorenewIcon style={{color:"white",width:"20",height:"20"}} />
                  </IconButton></Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{opacity:0.3}} />
                </Grid>
                <Grid item xs={12}>
  <Grid container spacing={3}>
    <Grid item xs={3}>
      <IconButton onClick={() => navigate('/wallet')}>
        <img src="assets/images/download.png" alt="Wallet" width="30" height="30"  />
      </IconButton>
      <Typography variant="subtitle2" align="center" sx={{color:"white"}}>Wallet</Typography>
    </Grid>
    <Grid item xs={3}>
      <IconButton onClick={() => navigate('/recharge')}>
        <img src="assets/images/download (1).png" width="30" height="30" alt="Deposit" />
      </IconButton>
      <Typography variant="subtitle2" align="center" sx={{color:"white"}}>Deposit</Typography>
    </Grid>
    <Grid item xs={3}>
      <IconButton onClick={() => navigate('/withdraw')}>
        <img src="assets/images/download (2).png" width="30" height="30" alt="Withdraw" />
      </IconButton>
      <Typography variant="subtitle2" align="center" sx={{color:"white"}}>Withdraw</Typography>
    </Grid>
    <Grid item xs={3}>
      <IconButton onClick={() => navigate('/vip')}>
        <img src="assets/images/VipIcon-3c72b1cc.png" width="30" height="30" alt="VIP" />
      </IconButton>
      <Typography variant="subtitle2" align="center" sx={{color:"white"}}>VIP</Typography>
    </Grid>
  </Grid>
</Grid>
              </Grid>
            </div>

           



            <Grid container spacing={0} mt={2} >
      <Grid item xs={6}>
        <Grid container direction="column" spacing={2} sx={{ margin: '10px' }}>
          <Grid item onClick={() => navigate('/bet-history')}>
            <ImageSubtitleGrid imageSrc="/assets/images/download (3).png" subtitle1="Bet" subtitle2="My betting history" fontSize="10px"/>
          </Grid>
          <Grid item onClick={() => navigate('/transaction')}>
            <ImageSubtitleGrid imageSrc="/assets/images/download (4).png" subtitle1="Transaction" subtitle2="My transaction history" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column" spacing={2} sx={{ margin: '10px' }}>
          <Grid item  onClick={() => navigate('/deposit-history')}>
            <ImageSubtitleGrid imageSrc="/assets/images/download (1).png" subtitle1="Deposit" subtitle2="My deposit history" />
          </Grid>
          <Grid item onClick={() => navigate('/withdraw-history')}> 
            <ImageSubtitleGrid imageSrc="/assets/images/download (5).png" subtitle1="Withdraw" subtitle2="My withdraw  history" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    
    
<MenuList sx={{ backgroundColor: 'rgb(42,50,112)', borderRadius: '8px' ,   marginLeft: 'auto', marginRight: 'auto', width:"90%", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', }}>
   
{options.map((option, index) => [
        <MenuItem key={index} sx={{ display: 'flex', alignItems: 'center' }} onClick={option.onClick}>
          <img src={option.icon} alt={option.label} style={{ width: '24px', marginRight: '8px' }} />
          <ListItemText primary={option.label} sx={{ textAlign: 'left' ,color:"white"}} />
          {option.subLabel && <ListItemText secondary={option.subLabel} secondaryTypographyProps={{ style: { color: 'white' } }} />}
          <ArrowForwardIcon style={{color:"white"}} />
        </MenuItem>,
        index < options.length - 1 && <Divider key={`divider-${index}`} />
      ].filter(Boolean))}
</MenuList>


    <Grid container spacing={2} mt={2} sx={{ backgroundColor: 'rgb(42,50,112)', borderRadius: '8px', padding: '10px',  marginLeft: 'auto',
                marginRight: 'auto', width:"90%", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', }}>
  {images.map((image, index) => (
    <Grid item xs={4} key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        onClick={() => handleImageClick(index)}
        style={{ cursor: 'pointer', width: '100%', marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img src={image.url} alt={` ${index+1}`} style={{ width: '30%', borderRadius: '8px' }} />
        <Typography variant="caption" align="center" sx={{ marginTop: '8px',color:"white" }}>{image.caption}</Typography>
      </div>
    </Grid>
  ))}
</Grid>


<IconButton
  onClick={handleLogout}
  sx={{ width: '80%', border: '1px solid rgb(92,166,255)', borderRadius: '50px' ,marginTop:"10px",marginBottom:"150px"}}
>
  <Grid container alignItems="center">
    <Grid item>
      <ExitToAppIcon style={{color:"rgb(92,166,255)"}} />
    </Grid>
    <Grid item xs={10}>
      <Typography variant="body1" sx={{ marginLeft: '8px',color:"rgb(92,166,255)" }}>Log Out</Typography>
    </Grid>
  </Grid>
</IconButton>


            {/* content end */}
          </Box>



          {children}

        </Box>
      </Mobile>
    </div>
  )
}

export default AccountMain;