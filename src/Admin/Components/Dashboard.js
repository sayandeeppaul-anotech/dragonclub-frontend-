import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import axios from "axios";
import {domain} from '../../Components/config';
const Dashboard = () => {
  const [data, setData] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [todayrecharge, setTodayrecharge] = useState(0);
  const [todayWithdrawal, setTodayWithdrawal] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [pendingRecharge, setPendingRecharge] = useState(0);
  const [successRecharge, setSuccessRecharge] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);

  useEffect(() => {
    axios
      .get(`${domain}/todays-registrations`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.countOfDailyUsers);
      })
      .catch((err) => {
        console.log("Error while fetching today's registration:", err);
      });
    axios
      .get(`${domain}/user-balance`, { withCredentials: true })
      .then((res) => {
        setUserBalance(res.data.walletAmount);
      })
      .catch((err) => {
        console.log("Error while fetching user balance:", err);
      });
    axios
      .get(`${domain}/transactions-last-24-hours`, {
        withCredentials: true,
      })
      .then((res) => {
        setTodayrecharge(res.data.totalRechargeAmount);
      })
      .catch((err) => {
        console.log("Error while fetching user balance:", err);
      });

    axios
      .get(`${domain}/total-withdraw-amount-last-24-hours`, {
        withCredentials: true,
      })
      .then((res) => {
        setTodayWithdrawal(res.data.totalWithdrawAmount);
      })
      .catch((err) => {
        console.log("Error while fetching withdraw details:", err);
      });

    axios
      .get(`${domain}/total-registrations`, {
        withCredentials: true,
      })
      .then((res) => {
        setTotalUser(res.data.count);
      })
      .catch((err) => {
        console.log("Error while fetching user details:", err);
      });

    axios
      .get(`${domain}/pending-recharge`, { withCredentials: true })
      .then((res) => {
        setPendingRecharge(res.data.pendingAmount);
      })
      .catch((err) => {
        console.log("Error while fetching user details:", err);
      });

      axios
      .get(`${domain}/success-recharge`, { withCredentials: true })
      .then((res) => {
        setSuccessRecharge(res.data.successAmount);
      })
      .catch((err) => {
        console.log("Error while fetching user details:", err);
      });
      axios
      .get(`${domain}/total-withdrawl-amount`, { withCredentials: true })
      .then((res) => {
        setTotalWithdrawal(res.data.completeWithdrawAmount);
      })
      .catch((err) => {
        console.log("Error while fetching user details:", err);
      });
   }, []);
   
  const dat = [
    { heading: "Today User Join", value: data },
    { heading: "Today's Recharge", value: todayrecharge },
    { heading: "Today's Withdrawal", value: todayWithdrawal },
    { heading: "User Balance", value: userBalance },
    { heading: "Total User", value: totalUser },
    { heading: "Pending Recharges", value: pendingRecharge },
    { heading: "Success Recharge", value: successRecharge },
    { heading: "Total Withdrawal", value: totalWithdrawal },
    { heading: "Withdrawal Requests", value: 0 },
    { heading: "Website Mode", value: 0 },
    { heading: "Withdrawal Status", value: 0 },
    { heading: "Pending Complaints", value: 0 },
  ];
  return (
    <div>

      <Grid container spacing={4}>
      {dat.map((item, index) => (
  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
    <Paper
      style={{
        padding: "25px",
        textAlign: "left",
        backgroundColor: " rgb(24,118,209) ",
        color: "#FFFFFF",
      }}
    >
      <Typography variant="h6">{item.heading}</Typography>
      <Typography variant="h6">{item.value}</Typography>
    </Paper>
  </Grid>
))}
      </Grid>

    </div>
  );
};

export default Dashboard;
