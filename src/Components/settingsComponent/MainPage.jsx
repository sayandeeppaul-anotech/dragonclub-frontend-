import React, { useState, useEffect } from 'react';
import './MainPage.css'
import uidimg from '../../assets/uidimg.png'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SettingBottomBox from './settingBottom';
import lockimg from '../../assets/lock.png'
import mailBox from '../../assets/mail.png'
import googleVerification from '../../assets/googleValidation.png'
import update from '../../assets/versionUpdate.png'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import modalimg from '../../assets/person.png'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import {domain} from '../config'





function MainPage() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openResetPassword, setOpenResetPassword] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
  
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${domain}/user`, { withCredentials: true });
          setUserData(response.data);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchUserData();
    }, []);
    const handleOpenResetPassword = () => {
        setOpenResetPassword(true);
      };
    
      const handleCloseResetPassword = () => {
        setOpenResetPassword(false);
      };
      const handleResetPassword = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(' https://dragonclubs.online/ChangePassword', {
            oldPassword,
            newPassword,
          }, { withCredentials: true });
    
          if (response.status === 200) {
            setAlertOpen(true);
            handleCloseResetPassword();
          }
        } catch (err) {
          console.error(err);
        }
      };
    


      const [username, setUsername] = useState('');
      const [openChangeUsername, setOpenChangeUsername] = useState(false);
    
    
      const handleOpenChangeUsername = () => {
        setOpenChangeUsername(true);
      };
    
      const handleCloseChangeUsername = () => {
        setOpenChangeUsername(false);
      };
    
      const handleChangeUsername = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.put(`${domain}/user/username`, {
            username,
          }, { withCredentials: true });
    
          if (response.status === 200) {
            setUserData({ ...userData, username }); // update the username in the local state
            handleCloseChangeUsername();
          }
        } catch (err) {
          console.error(err);
        }
      };
    
    return (
        <div className="settingpage-main-container">
            <div className="settingpage-top">
                <div className="settingpage-info">
                    <div className="avatar">
                        <div className="avatar-image">
                            <img src={uidimg} alt="" />
                        </div>
                        <div className="change-avatar">
                            <span>Change Avatar</span>
                            <KeyboardArrowRightIcon />
                        </div>
                    </div>
                    <div className="settingpage-name">
                        <h3>Nickname</h3>
                        <div className='name'>
                        <Button sx={{ color: 'rgb(99, 99, 99)' }} onClick={handleOpenChangeUsername}>
                            <span>{userData ? userData.username : 'Loading...'}</span>
                                <KeyboardArrowRightIcon />
                            </Button>
                        </div>
                        <Dialog
      open={openResetPassword}
      onClose={handleCloseResetPassword}
      PaperProps={{
        component: 'form',
        onSubmit: handleResetPassword,
      }}
    >
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your old password and new password.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="oldPassword"
          name="oldPassword"
          label="Old Password"
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          required
          margin="dense"
          id="newPassword"
          name="newPassword"
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions> <Button onClick={handleCloseResetPassword}>Cancel</Button>
        <Button type="submit">Change Password</Button>
      </DialogActions>
    </Dialog>

    <Dialog
      open={alertOpen}
      onClose={() => setAlertOpen(false)}
    >
      <Alert severity="success">
        Password changed successfully!
      </Alert>
    </Dialog>
                    </div>
                    <div className="settingpage-uid">
                        <h3>UID</h3>
                        <div className='uid'>
                        <span>{userData ? userData.uid : 'Loading...'}</span>
                            <ContentCopyIcon sx={{ color: 'orange' }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-page">
            <div className="bottom-heading" style={{ textAlign: 'left' }}>
  <h3>Security Information</h3>
</div>


<Dialog
          open={openChangeUsername}
          onClose={handleCloseChangeUsername}
          PaperProps={{
            component: 'form',
            onSubmit: handleChangeUsername,
          }}
        >
          <DialogTitle>Change Username</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your new username.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              name="username"
              label="New Username"
              type="text"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseChangeUsername}>Cancel</Button>
            <Button type="submit">Change Username</Button>
          </DialogActions>
        </Dialog>
                <div className="bottom-box-container">
                <SettingBottomBox
          settingBottomImage={lockimg}
          bottomBoxName='Login Password'
          bottomGoto='Edit'
          onClick={handleOpenResetPassword}
        />

                    <SettingBottomBox
                        settingBottomImage={mailBox}
                        bottomBoxName='Bind Mailbox'
                        bottomGoto='Edit' />

                    <SettingBottomBox
                        settingBottomImage={googleVerification}
                        bottomBoxName='Google Verification'
                        bottomGoto='Edit' />

                    <SettingBottomBox
                        settingBottomImage={update}
                        bottomBoxName='Updated Version'
                        bottomGoto='1.0.1' />

                </div>

            </div>
        </div>
        

    )
}

export default MainPage