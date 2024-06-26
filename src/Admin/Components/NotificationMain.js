import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    CssBaseline
} from "@mui/material";
import axios from 'axios';
import {domain} from '../../Components/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


function NotificationMain() {
    const [title, settitle] = useState('');
    const [message, setmessage] = useState('');
    

  
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
           title:title,
           message:message
        };

        axios.post(`${domain}/createNotification`, formData, { withCredentials: true })
            .then(function (response) {
                alert('Notification submitted Successfully');
                console.log(response);
                settitle('');
                setmessage('');
               
               
            })
            .catch(function (error) {
                console.error(error);
            });
    };
   


    const [notifications, setNotifications] = useState([]);
    console.log(notifications);

    useEffect(() => {
        axios.get(`${domain}/notifications`, { withCredentials: true })
            .then(response => {
                if (response.data.success) {
                    setNotifications(response.data.notifications);
                } else {
                    console.error(response.data.message);
                }
            })
            .catch(error => {
                console.error("Error fetching notifications:", error);
            });
    }, [notifications]);
    return (
        <div>
    <Box sx={{ border:" 1px solid #D9D9D9",}}>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: 'white',
                        flexGrow: 2,
                        p: 1,
                    }}
                >
                    <Box
                        sx={{
                            marginTop: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Create Notification
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
    <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        autoFocus
        value={title}
        onChange={(e) => settitle(e.target.value)}
    />
    <TextField
        margin="normal"
        required
        fullWidth
        id="message"
        label="Message"
        name="message"
        autoComplete="message"
        autoFocus
        value={message}
        onChange={(e) => setmessage(e.target.value)}
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
                </Box>
           </Box>
        
       
        <TableContainer component={Paper} sx={{mt:2}} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Serial No.</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Message</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notifications.map((notification, index) => (
                        <TableRow key={notification._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{notification.title}</TableCell>
                            <TableCell>{notification.message}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}

export default NotificationMain;
