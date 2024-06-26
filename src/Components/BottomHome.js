import React from 'react';
import { Box, Grid, Typography, Avatar, Card } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Language, Notifications, HeadsetMic, Book, Info, GetApp, ChevronRight } from '@mui/icons-material';


const BottomHome = () => {
    const menuItems = [
        { icon: <Language />, text: 'Language', value: 'English' },
        { icon: <Notifications />, text: 'Notification' },
        { icon: <HeadsetMic />, text: '24/7 Customer service' },
        { icon: <Book />, text: 'Beginners Guide' },
        { icon: <Info />, text: 'About us' },
        { icon: <GetApp />, text: 'Download APP' },
      ];

  return (
    <Box sx={{ color: 'white', p: 3 }}>
      {/* Upper Area */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: 'turquoise',fontWeight:"bold" }}>DragonClubs</Typography>
        <Avatar sx={{ bgcolor: 'red', color: 'white' }}>+18</Avatar>
        <Avatar sx={{ bgcolor: 'red', color: 'white' }}>📞</Avatar>
      </Box>


      <Grid container spacing={2} sx={{ mb: 3 }}>
    <Grid item xs={12}>
    <img src="assets/images/homedata.png" alt="Placeholder" style={{width:"100%"}}/>

    </Grid>
</Grid>


      {/* Lower Area */}
      <Box sx={{ p: 0,  }}>
        <Typography sx={{ mb: 2, fontSize:"12px" }}>
          ◆ The DragonClubs platform advocates fairness, justice, and openness. We mainly operate fair lottery, blockchain games, live casinos, and slot machine games.
        </Typography>
        <Typography sx={{ mb: 2,fontSize:"12px" }}>
          ◆ DragonClubs works with more than 10'000 online live game dealers and slot games, all of which are verified fair games.
        </Typography>
        <Typography sx={{ mb: 2,fontSize:"12px" }}>
          ◆ DragonClubs supports fast deposit and withdrawal, and looks forward to your visit.
        </Typography>
        <Typography sx={{ color: 'turquoise' ,fontSize:"12px",float:"left"}}>
          Gambling can be addictive, please play rationally.
        </Typography>
        <Typography sx={{ color: 'turquoise',fontSize:"12px",float:"left" }}>
        DragonClubs only accepts customers above the age of 18.
        </Typography>
      </Box>


      <Box sx={{ color: 'white' }}>
      <List>
        {menuItems.map((item) => (
         <ListItem key={item.text} sx={{ py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
         <ListItemIcon sx={{ color: 'skyblue', minWidth: 40 }}>
           {item.icon}
         </ListItemIcon>
         <ListItemText 
           primary={
             <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
               <span>{item.text}</span>
               <span>{item.value}</span>
             </Box>
           } 
         />
         <ListItemSecondaryAction>
           <IconButton edge="end" sx={{ color: 'white' }}>
             <ChevronRight />
           </IconButton>
         </ListItemSecondaryAction>
       </ListItem>
        ))}
      </List>
    </Box>
    </Box>
  );
};

export default BottomHome;