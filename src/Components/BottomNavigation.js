import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountIcon from '@mui/icons-material/AccountCircle';
import RedeemIcon from '@mui/icons-material/Redeem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const BottomNavigationArea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));


  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      style={{
        position: 'fixed',
        bottom: 0,
        backgroundImage: 'url(/assets/images/tabBarBg-301df93c.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '10px 0',
        backgroundColor: 'transparent',
        marginLeft: '-5px',
        width: '100%', // make BottomNavigation responsive
        maxWidth: matches ? '400px' : 'none', // limit maximum width for larger devices
        margin: 'auto', // center BottomNavigation
      }}
    >
      <BottomNavigationAction
        style={{ color: value === '/' ? 'rgb(72,196,240)' : 'white' }}
        label="Home"
        value="/home"
        icon={<HomeIcon style={{ color: value === '/' ? 'rgb(72,196,240)' : 'white' }} />}
      />
      <BottomNavigationAction
        style={{ color: value === '/activity' ? 'rgb(72,196,240)' : 'white' }}
        label="Activity"
        value="/activity"
        icon={<RedeemIcon style={{ color: value === '/activity' ? 'rgb(72,196,240)' : 'white' }} />}
      />
     <BottomNavigationAction
      label="Promotion"
      value="/promotion"
      icon={
        value === '/promotion' ? 
        <img src="assets/images/abc.png" alt="Promotion" style={{ width: '45px', maxWidth: '100%' }} /> : // make image responsive
        <img src="assets/images/abc.png" alt="Promotion" style={{ width: '45px', maxWidth: '100%' }} /> // make image responsive
      }
      style={{
        color: value === '/promotion' ? 'rgb(72,196,240)' : 'white',
        transform: 'scale(1.3)',
        marginTop: '-25px',
      }}
    />
      <BottomNavigationAction
        style={{ color: value === '/wallet' ? 'rgb(72,196,240)' : 'white' }}
        label="Wallet"
        value="/wallet"
        icon={<WalletIcon style={{ color: value === '/wallet' ? 'rgb(72,196,240)' : 'white' }} />}
      />
      <BottomNavigationAction
        style={{ color: value === '/account' ? 'rgb(72,196,240)' : 'white' }}
        label="Account"
        value="/account"
        icon={<AccountIcon style={{ color: value === '/account' ? 'rgb(72,196,240)' : 'white' }} />}
      />
    </BottomNavigation>
  );
};

export default BottomNavigationArea;