import React from 'react';
import { Typography, Container } from '@mui/material';
import Mobile from '../Components/Mobile';

const OpenPageMain = () => {
  return (
    <Mobile>
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1a2d69',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <img
        src="/assets/2.png"
        alt="Main"
        style={{
          width: '100%',
          maxWidth: 400,
          marginBottom: 16, 
        }}
      />
      <Typography variant="h6">
        Withdraw fast, safe and stable
      </Typography>
      <div style={{ marginBottom: 20 }} /> 

      <img
        src="/assets/1.png"
        alt="Logo"
        style={{
          width: 200,
          marginBottom: 8, 
        }}
      />
    </Container>
    </Mobile>
  );
};

export default OpenPageMain;