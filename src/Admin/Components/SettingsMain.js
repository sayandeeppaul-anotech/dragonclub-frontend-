import React, { useState, useEffect } from 'react';
import {TextField,Button,Box,Typography,Container,CssBaseline ,Grid} from "@mui/material";
import axios from 'axios';
import {domain} from '../../Components/config';
import { Settings } from '@mui/icons-material';



function SettingsMain() {
    const [upi, setUpi] = useState('');
    const [trx, setTrx] = useState(''); 
    const [qr, setqr] = useState('');
    const [get1, setGet1] = useState(0);
    const [get2, setGet2] = useState(0);
    const [label1, Setlabel1] = useState('UPI Address');
    const [label2, Setlabel2] = useState('Qr CodeImage Address');
    const [image, setImage] = useState(null); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('Upi', upi);
        data.append('Trx', trx); 
        data.append('image', image); 

        axios.post(`${domain}/upsertID`, data, { withCredentials: true })
            .then(function (response) {
                alert("Successful");
                console.log(response);
                setUpi("");
                setTrx(""); // Reset the Trx state
                setImage(null); // Reset the image state
            })
            .catch(function (error) {
                console.error(error);
            });
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const data1={
            Upi:upi,
        }
        axios.post(`${domain}/upsertID`, data1, { withCredentials: true })
            .then(function (response) {
                alert("Successful");
                console.log(response);

            })
            .catch(function (error) {
                console.error(error);
            });
    };
    const handleGet = () => {
        axios.get(`${domain}/getupiaddress`, { withCredentials: true })
            .then((res) => {
                    setGet1(res.data.UPIaddress[0].Upi);
                    setGet2(res.data.UPIaddress[0].qrCodeImageAddress);
                   console.log(get1)
                   console.log(get2)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        axios.get(`${domain}/Getid`, { withCredentials: true })
            .then(function (response) {
                console.log(response);
                setUpi(response.data.Upi);
                setTrx(response.data.Trx); // Set Trx state to the received Trx value
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);


    const [level1, setLevel1] = useState('');
    const [level2, setLevel2] = useState('');
    const [level3, setLevel3] = useState('');
    const [level4, setLevel4] = useState('');
    const [level5, setLevel5] = useState('');


    const [level1bet, setLevel1bet] = useState('');
    const [level2bet, setLevel2bet] = useState('');
    const [level3bet, setLevel3bet] = useState('');
    const [level4bet, setLevel4bet] = useState('');
    const [level5bet, setLevel5bet] = useState('');


    const handleSubmit2 = (e) => {
        e.preventDefault();
    
        const formData = {
            level1: level1,
            level2: level2,
            level3: level3,
            level4: level4,
            level5: level5,
        };
    
        axios.put(`${domain}/update-commission-rates`, formData, { withCredentials: true })
            .then(function (response) {
                alert("Successful");
                console.log(response.data);
                setLevel1('');
                setLevel2('');
                setLevel3('');
                setLevel4('');
                setLevel5('');
            })
            .catch(function (error) {
                console.error(error);
            });
    };
    


    const handleSubmit3 = (e) => {
        e.preventDefault();
    
        const formData = {
            level1: level1bet,
            level2: level2bet,
            level3: level3bet,
            level4: level4bet,
            level5: level5bet,
        };
    
        axios.put(`${domain}/commissionRates`, formData, { withCredentials: true })
            .then(function (response) {
                alert("Successful");
                console.log(response.data);
                setLevel1('');
                setLevel2('');
                setLevel3('');
                setLevel4('');
                setLevel5('');
            })
            .catch(function (error) {
                console.error(error);
            });
    };
    useEffect(() => {
        axios.get(`${domain}/fetch-commission-rates`, { withCredentials: true })
            .then(response => {
                const { data } = response;
               
                setLevel1(data.data.level1);
                setLevel2(data.data.level2);
                setLevel3(data.data.level3);
                setLevel4(data.data.level4);
                setLevel5(data.data.level5);
            })
            .catch(error => {
                console.error('Error fetching commission rates:', error);
            });
    }, []);



    useEffect(() => {
        axios.get(`${domain}/commissionRates-data-get`, { withCredentials: true })
            .then(response => {
                const { data } = response;
               console.log(data);
                setLevel1bet(data.level1);
                setLevel2bet(data.level2);
                setLevel3bet(data.level3);
                setLevel4bet(data.level4);
                setLevel5bet(data.level5);
            })
            .catch(error => {
                console.error('Error fetching commission rates:', error);
            });
    }, []);


    // Select all forms
let forms = document.querySelectorAll('form');

// Find the maximum height
let maxHeight = 0;
forms.forEach(form => {
    if (form.offsetHeight > maxHeight) {
        maxHeight = form.offsetHeight;
    }
});

// Set the height of all forms to the maximum height
forms.forEach(form => {
    form.style.height = `${maxHeight}px`;
});
    return (
<div>
<Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            component="main"
            sx={{
               border:" 1px solid #D9D9D9",
            }}
        >
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
                      Update UPI / TRX Address
                    </Typography>
                    <Box component="form"  noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="upi"
                            label={label1}
                            name="upi"
                            autoComplete="upi"
                            autoFocus
                            value={upi}
                            placeholder={get1} // Use `get` as the placeholder value
                            onChange={(e) => setUpi(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="trx"
                            label="Trx"
                            name="trx"
                            autoComplete="trx"
                            autoFocus
                            value={trx}
                            onChange={(e) => setTrx(e.target.value)}
                        />
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])} // Set the image state to the selected file
                        />
                        <Box sx={{display:"flex",justifyContent:"space-around",m:3}} >
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{m:1}}
                                onClick={handleSubmit}
                            >
                              UPDATE
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        </Container>
            </Grid>

    
            <Grid item xs={12} md={4}>
                <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    border:" 1px solid #D9D9D9",
                }}
            >
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
                        <Typography component="h1" variant="h5" align='center'>
                           Update deposit bonus Commission 
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="level1"
                                label="level1"
                                name="Level1"
                                autoComplete="level1"
                                autoFocus
                                value={level1}
                                onChange={(e) => setLevel1(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="level2"
                                label="level2"
                                name="Level2"
                                autoComplete="level2"
                                autoFocus
                                value={level2}
                                onChange={(e) => setLevel2(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="level3"
                                label="level3"
                                name="level3"
                                autoComplete="level3"
                                autoFocus
                                value={level3}
                                onChange={(e) => setLevel3(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="level4"
                                label="level4"
                                name="Level4"
                                autoComplete="level4"
                                autoFocus
                                value={level4}
                                onChange={(e) => setLevel4(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="level5"
                                label="level5"
                                name="level5"
                                autoComplete="level5"
                                autoFocus
                                value={level5}
                                onChange={(e) => setLevel5(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                UPDATE
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            </Container>
            </Grid>


            <Grid item xs={12} md={4}>
                <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    border:" 1px solid #D9D9D9",
                }}
            >
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
                           Update Wngo Bet Commission
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit3} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="level1"
                                label="level1"
                                name="Level1"
                                autoComplete="level1"
                                autoFocus
                                value={level1bet}
                                onChange={(e) => setLevel1bet(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="level2"
                                label="level2"
                                name="Level2"
                                autoComplete="level2"
                                autoFocus
                                value={level2bet}
                                onChange={(e) => setLevel2bet(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="level3"
                                label="level3"
                                name="level3"
                                autoComplete="level3"
                                autoFocus
                                value={level3bet}
                                onChange={(e) => setLevel3bet(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="level4"
                                label="level4"
                                name="Level4"
                                autoComplete="level4"
                                autoFocus
                                value={level4bet}
                                onChange={(e) => setLevel4bet(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="level5"
                                label="level5"
                                name="level5"
                                autoComplete="level5"
                                autoFocus
                                value={level5bet}
                                onChange={(e) => setLevel5bet(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                UPDATE
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            </Container>
            </Grid>
          </Grid>
    </div>
);
}
export default SettingsMain;



