import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import BonusIcon from '@mui/icons-material/CardGiftcard';
import GiftIcon from '@mui/icons-material/CardGiftcard';
import SalaryIcon from '@mui/icons-material/Money';
import UpdateIcon from '@mui/icons-material/Update';

const drawerWidth = 240;

const AdminPanel = ({children}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const location = useLocation();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
      {[
  { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
  { text: 'Wingo', icon: <InboxIcon />, link: '/wingo-admin' },
  { text: 'Members', icon: <PeopleIcon />, link: '/members' },
  { text: 'Withdraw', icon: <PaymentIcon />, link: '/withdraw-admin' },
  { text: 'Recharge', icon: <PaymentIcon />, link: '/recharge-admin' },
  { text: 'Settings', icon: <SettingsIcon /> , link: '/settings-admin'},
  { text: 'Notifications', icon: <NotificationsIcon />, link: '/notifications-admin' },
  { text: 'First Deposit Bonus', icon: <BonusIcon /> , link: '/bonus-settings'},
  { text: 'Create Giftcode', icon: <GiftIcon /> ,link: '/create-coupon' },
  { text: 'Created Salary', icon: <SalaryIcon /> , link: '/create-salary' },
  { text: 'Update Salary Bonus', icon: <SalaryIcon /> , link: '/playersSalary' },
  { text: 'Wallet Update', icon: <UpdateIcon /> , link: '/wallet-update' },
  { text: 'Withdrawl Limits', icon: <UpdateIcon /> , link: '/withdrawl-limits' },
  { text: 'Support', icon: <HelpIcon />, link: '/support-admin' },
].map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.link || '#'}
            style={{backgroundColor: location.pathname === item.link ? 'lightgray' : 'transparent'}}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dragon Club
          </Typography>
          <IconButton
            color="inherit"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 3, // Adjust the margin to match the height of the AppBar
        }}
      >
        <Toolbar />
       {children}
      </Box>
    </Box>
  );
};

export default AdminPanel;
