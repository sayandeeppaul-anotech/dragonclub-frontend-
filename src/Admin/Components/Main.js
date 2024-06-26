import React, { useState } from 'react';
import { AppBar,Toolbar,IconButton,Typography,CssBaseline,Drawer,List,ListItem,ListItemText,ListItemIcon,Divider,Box,Menu,MenuItem,useMediaQuery,useTheme} from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import Dashboard from './Dashboard';
import MembersContent from './MembersContent';

const drawerWidth = 240;

const App = () => {
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

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, link: '/main' },
          { text: 'Members', icon: <PersonIcon />, link: '/members' },
          { text: 'Messages', icon: <MessageIcon />, link: '/messages' },
          { text: 'Settings', icon: <SettingsIcon /> },
          { text: 'Notifications', icon: <NotificationsIcon /> },
          { text: 'Analytics', icon: <AnalyticsIcon /> },
          { text: 'Users', icon: <GroupIcon /> },
          { text: 'Reports', icon: <ReportIcon /> },
          { text: 'Help', icon: <HelpIcon /> }
        ].map((item) => (
          <ListItem button key={item.text} component={Link} to={item.link || '#'}>
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
            Admin Panel
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
              keepMounted: true,
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
    mt: 3, 
  }}
>
  
  <Toolbar />
  <Routes>

  <Route  path="/" element={<Dashboard />} />
  <Route  path="/members" element={<MembersContent />} />  

  </Routes>

        </Box>
      </Box>
  );
};

export default App;


