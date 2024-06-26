import React, { useState, useEffect } from 'react';
import Mobile from '../Components/Mobile';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TranslateIcon from '@mui/icons-material/Translate';
import FlagIcon from '@mui/icons-material/Flag';
import ReactCountryFlag from 'react-country-flag';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { collection, doc, setDoc, query, where, getDocs, updateDoc} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { setLogLevel, LogLevel } from '@firebase/logger';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {domain} from '../Components/config';

const Register = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setOpenDrawer(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  const { login } = useAuth();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [countryCode, setCountryCode] = useState('+1');
  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };
  const navigate = useNavigate();
  // Email registration states

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialInviteCode = query.get('invitecode');
  const [otp, setOtp] = useState("");
  const [mobile,setEmail] = useState("");
  const [email,setEmai] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invitecode, setInviteCode] = useState(initialInviteCode || "");
  const [phone, setPhone] = useState("");

  const handleEmailRegister = async (e) => {
    e.preventDefault();
  
    if (mobile === "" || password === "" || password !== confirmPassword || invitecode === "") {
      alert("Please make sure all fields are filled out, the passwords match, and an invite code is provided.");
      return;
    }
  
    try {
      const registerData = {
        mobile: mobile,
        password: password,
        invitecode: invitecode
      };
      
      const response = await axios.post(`${domain}/register`, registerData);

      if (response.data.success) {
        login(response.data.token);
        console.log(response);
        alert("Registration complete.");
        navigate('/');
      } else if (response.data.msg === "User already exists") {
        alert(response.data.msg);
      } else {
        alert("An error occurred while creating your account..");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert('An error occurred while creating your account. Please try again');
      }
    }
  };

  const [serverOtp, setServerOtp] = useState("");
  const handlePhoneRegister = async (e) => {
    const phoneNumber = `${phone}`; // Removed countryCode and replace function
    console.log(phoneNumber);

    if (!phoneNumber.trim() || !email.trim()) {
      alert("Please enter a valid phone number and email.");
      return;
    }

    try {
      // Generate a random OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpString = otp.toString(); // Convert OTP to a string
      setServerOtp(otpString); // Save the OTP string to verify later

      // Send the OTP to the user's phone number using Fast2SMS
      await axios({
        method: 'post',
        url: 'https://abclottery.shop/sendOtp', // Send requests to your new server
        data: {
          sender_id: 'FSTSMS',
          message: otpString, // Use the OTP string
          language: 'english',
          route: 'otp',
          numbers: phoneNumber,
          variables_values: otpString
        }
      });
      alert("OTP sent to your phone number. Please verify it.");
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending the OTP. Please try again.");
    }
  };
  const handleOtpVerification = async () => {
    if (otp !== "" && otp === serverOtp) {
      alert("OTP verified successfully. You can now proceed with registration.");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();
    if (otp !== "" && otp === serverOtp) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const referralLink = `${window.location.origin}/register?ref=${userCredential.user.uid}`; // Generate a unique referral link
        const username = `MEMBER${nanoid(6)}`; // Replace 6 with the number of characters you want after "MEMBER"
        const UID = Math.floor(1000000 + Math.random() * 9000000); // Generate a unique 7-digit number
        const referralUid = new URLSearchParams(window.location.search).get('ref');

        const newInviteCode = `INVITE${nanoid(6)}`; // Generate a unique invite code

        let walletAmount = 0;
        if (invitecode !== "") {
          alert("Applying invite code...");
          const sharedUserDoc = await getDocs(query(collection(db, 'users'), where('invitationCode', '==', invitecode)));
          await Promise.all(sharedUserDoc.docs.map(async (docSnapshot) => {
            const user = docSnapshot.data();
            const userRef = doc(db, 'users', docSnapshot.id);
            await updateDoc(userRef, {
              wallet: user.wallet + 50   //Add 50 to the sharer's wallet
            });
          }));

          walletAmount = 20;  //Add 20 to new user's wallet for using invite code.
          alert("Invite code applied.");
        }
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          phone: phone,
          email: email,
          invitationCode: newInviteCode,
          username: username,
          UID: UID,
          referralLink: referralLink,
          referral: referralUid,
        });

        alert("Account setup complete.");
        navigate('/login');
      } catch (err) {
        console.error(err);
        alert("An error occurred while creating your account. Please try again.");
      }
    } else {
      alert("Please verify OTP before proceeding with registration.");
    }
  };

  setLogLevel(LogLevel.DEBUG);


  const handleLogin = async () => {

    navigate('/login');
  };
  useEffect(() => {
    // Get the invite code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCodeFromUrl = urlParams.get('ref'); // Changed 'inviteCode' to 'ref'

    // If there's an invite code in the URL, set it in the state
    if (inviteCodeFromUrl) {
      setInviteCode(inviteCodeFromUrl);
    }
  }, []);
  return (
    <div>


      <Mobile>
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

            color: 'white',

          }}
        >
          <div id="recaptcha-container"></div>
          <Grid item xs={4} textAlign="left">
            <IconButton sx={{ marginLeft: '-8px' }} color="inherit">
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} textAlign="center">
           <img src="assets/images/banner3.png" alt="logo" style={{width:"100px",height:"30px"}}/>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <IconButton onClick={() => setOpenDrawer(true)} color="inherit">
              <TranslateIcon />
              {selectedLanguage && (
                <>
                  {selectedLanguage === 'EN' && <FlagIcon component="span" fontSize="small" sx={{ marginLeft: '4px' }} />}
                  {selectedLanguage === 'HN' && <FlagIcon component="span" fontSize="small" sx={{ marginLeft: '4px' }} />}
                  <span>{selectedLanguage}</span>
                </>
              )}
            </IconButton>
          </Grid>
        </Grid>
        <Drawer anchor="bottom" open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Grid container justifyContent="space-around" alignItems="center" sx={{ padding: '16px' }}>
            <Button onClick={() => handleLanguageSelect('EN')}>
              <ReactCountryFlag countryCode="US" svg />
              EN
            </Button>
            <Button onClick={() => handleLanguageSelect('HN')}>
              <ReactCountryFlag countryCode="IN" svg />
              HN
            </Button>
          </Grid>

        </Drawer>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            backgroundColor: 'rgb(42,50,112)',
            padding: '16px',
            color: 'white',
            minHeight: 'fit-content'
          }}
          direction="column"
        >
          <Typography variant="h5">Register</Typography>
          <Typography variant="subtitle2">Please register by phone no or email</Typography>


        </Grid>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            backgroundColor: '#F7F8FF',
            padding: '16px',
            color: 'white',
            minHeight: 'fit-content'
          }}
        >
          <Grid item xs={12} sx={{ marginBottom: '50px' }} >
            <form onSubmit={tabValue === 0 ? handleEmailRegister : handleRegistration}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                TabIndicatorProps={{ style: { backgroundColor: tabValue === 0 ? '#FF7172' : 'grey' } }}
              >
                <Tab
                  icon={<EmailIcon style={{ color: tabValue === 0 ? 'rgb(42,50,112)' : 'grey' }} />}
                  label="Register With Mobile"
                  style={{ color: tabValue === 0 ? '#FF7172' : 'grey' }}
                />
                {/* <Tab
                  icon={<PhoneIcon style={{ color: tabValue === 1 ? 'rgb(42,50,112)' : 'grey' }} />}
                  label="Register Your Phone"
                  style={{ color: tabValue === 1 ? '#FF7172' : 'grey' }}
                /> */}
              </Tabs>
              <TabPanel value={tabValue} index={0}>
                <Box display="flex" alignItems="center" mt={2}>
                  <EmailIcon sx={{ color: "rgb(42,50,112)" }} />
                  <FormLabel>Mobile No</FormLabel>
                </Box>
                <TextField
                  label="Mobile No"
                  fullWidth
                  value={mobile}
                  onChange={e => setEmail(e.target.value)}
                  variant="outlined"
                  margin="normal"

                  sx={{ backgroundColor: '#FFFFFF' }}
                  InputProps={{
                    style: { borderRadius: "10px" }
                  }}

                />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Box display="flex" alignItems="center" mt={2}>
                  <EmailIcon sx={{ color: "rgb(42,50,112)" }} />
                  <FormLabel>Mobile No</FormLabel>
                </Box>
                <TextField
                 label="Mobile No"
                  fullWidth
                  value={mobile}
                  onChange={e => setEmail(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: '#FFFFFF' }}
                  InputProps={{
                    style: { borderRadius: "10px" }
                  }}
                />
                <Box display="flex" alignItems="center" mt={2}>
                  <PhoneIcon sx={{ color: "rgb(42,50,112)" }} />
                  <FormLabel>Phone Number</FormLabel>
                </Box>
                <TextField
                  label="Phone"
                  fullWidth
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: '#FFFFFF' }}

                />
                <Box display="flex" alignItems="center" mt={2}>
                  <LockIcon sx={{ color: "rgb(42,50,112)" }} />
                  <FormLabel>Enter OTP</FormLabel>
                </Box><TextField
                  label="OTP"
                  fullWidth
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: '#FFFFFF' }}
                  InputProps={{
                    style: { borderRadius: "10px" }
                  }}
                /><Button
                  variant="contained"
                  color="primary"
                  onClick={handlePhoneRegister}
                >
                  Send OTP
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOtpVerification}
                >
                  Verify OTP
                </Button>
              </TabPanel>
              <Box display="flex" alignItems="center" mt={2}>
                <LockIcon sx={{ color: "rgb(42,50,112)" }} />
                <FormLabel>Set Password</FormLabel>
              </Box>
              <TextField
                label="Set Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={password}
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: '#FFFFFF' }}
                InputProps={{
                  style: { borderRadius: "10px" },
                  endAdornment: (
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />

              <Box display="flex" alignItems="center" mt={2}>
                <LockIcon sx={{ color: "rgb(42,50,112)" }} />
                <FormLabel>Confirm Password</FormLabel>
              </Box>
              <TextField
                label="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                margin="normal"
                sx={{ backgroundColor: '#FFFFFF' }}
                InputProps={{
                  style: { borderRadius: "10px" },
                  endAdornment: (
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <Box display="flex" alignItems="center" mt={2}>
                <MoveToInboxIcon sx={{ color: "rgb(42,50,112)" }} />
                <FormLabel>Invite Code</FormLabel>
              </Box>
              <TextField
      label="Invite Code"
      value={invitecode}
      onChange={e => setInviteCode(e.target.value)}
      fullWidth
      variant="outlined"
      margin="normal"
      InputProps={{
        style: { borderRadius: "10px" }
      }}
      sx={{ backgroundColor: '#FFFFFF' }}
    />
              <Box sx={{ display: 'flex', alignItems: 'center', margin: '16px 0 8px' }}>
                <RadioGroup row >
                  <FormControlLabel
                    value="remember"
                    control={<Radio />}
                    label="I have read and agree "
                    labelPlacement="end"
                    style={{ color: 'black' }}

                  />
                </RadioGroup>

              </Box>
              <Button variant="contained" type='submit' fullWidth style={{ marginBottom: '8px', backgroundColor: "rgb(42,50,112)", borderRadius: "300px" }}>
                Register
              </Button>
              <Button onClick={handleLogin} variant="outlined" color="primary" fullWidth style={{ borderRadius: "300px", borderColor: "RGB(54,142,255)", marginBottom: "150px" }}>
                <span style={{ color: 'black', fontWeight: "bold" }}>I have an account  </span>
                <span style={{ color: 'rgb(42,50,112)', marginLeft: "3px", fontWeight: "bold" }}> LOGIN</span>
              </Button>


            </form>
          </Grid>
        </Grid>
      </Mobile>
    </div>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
};


export default Register;