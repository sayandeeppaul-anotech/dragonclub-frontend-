import React, { useState, useEffect } from "react";
import Mobile from "../Components/Mobile";
import IconButton from "@mui/material/IconButton";
import SmsIcon from "@mui/icons-material/Sms";
import DownloadIcon from "@mui/icons-material/Download";
import { Grid} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Chip
} from "@mui/material";
import {domain} from './config'

const BetHistoryMain = ({ children }) => {
  const [apiData, setBets] = useState([]);
  const [gameType, setGameType] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);

  console.log(apiData);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${domain}/user/betshistory/`,
          { withCredentials: true }
        );
        setBets(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const filteredData = apiData.filter((data) => {
    if (gameType !== "all" && data.gameType !== gameType) {
      return false;
    }
    if (
      selectedDate &&
      new Date(data.timestamp).toDateString() !== selectedDate.toDateString()
    ) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: "rgb(42,50,112)",
                padding: "8px 16px",
                color: "white",
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Bet History</span>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <IconButton
                  color="inherit"
                  onClick={() => navigate("/messages")}
                >
                  <SmsIcon />
                </IconButton>
                <IconButton color="inherit">
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>

            {/* Add Filters */}
            <Grid container spacing={2} mt={2}>
  <Grid item xs={12} sm={12}>
    <Box width="100%" px={0.5}>
      <div class="form-control full-width">
        <select 
          id="game-type" 
          onchange="setGameType(this.value)" 
          style={{
            width: '95%', 
            backgroundColor: 'transparent', 
            color: 'white', 
            border: '1px solid white', 
            fontSize: '1.2em', 
            padding: '10px'
          }}
        >
          <option value="all">All</option>
          <option value="game1">Wingo</option>
          <option value="game2">K3</option>
          <option value="game2">TRX</option>
          <option value="game2">5d</option>
        </select>
      </div>
    </Box>
  </Grid>
  <Grid item xs={12} sm={12}>
    <input
      type="date"
      value={selectedDate}
      onChange={(event) => {
        setSelectedDate(event.target.value);
      }}
      style={{
        width: '87%', 
        backgroundColor: 'transparent', 
        color: 'white', 
        border: '1px solid white', 
        fontSize: '1.2em', 
        padding: '10px'
      }}
    />
  </Grid>
</Grid>
           

            {filteredData.map((data, index) => (
              <Box
                key={index}
                sx={{ maxWidth: 400, margin: "auto", mt: 4, mx: 2 }}
              >
                <Paper
                  elevation={3}
                  sx={{ borderRadius: 2, overflow: "hidden" }}
                >
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "grey.100",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "text.primary" }}
                    >
                      Lottery Result : {data.result}
                    </Typography>
                    <Chip
                      label={data.status}
                      sx={{
                        bgcolor: "orange",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        height: 32,
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              pl: 3,
                              py: 1.5,
                              color: "text.secondary",
                            }}
                          >
                            Type
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              pr: 3,
                              py: 1.5,
                              color: "text.primary",
                            }}
                            align="right"
                          >
                            {data.selectedTimer}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              pl: 3,
                              py: 1.5,
                              color: "text.secondary",
                            }}
                          >
                            Period
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              pr: 3,
                              py: 1.5,
                              color: "text.primary",
                            }}
                            align="right"
                          >
                            {data.periodId}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              pl: 3,
                              py: 1.5,
                              color: "text.secondary",
                            }}
                          >
                            Tax Deducted{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              pr: 3,
                              py: 1.5,
                              color: "text.primary",
                              wordBreak: "break-all",
                            }}
                            align="right"
                          >
                            {data.fee}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              pl: 3,
                              py: 1.5,
                              color: "text.secondary",
                            }}
                          >
                            Select
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              pr: 3,
                              py: 1.5,
                              color: "text.primary",
                            }}
                            align="right"
                          >
                            {data.selectedItem}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{ pl: 3, py: 1.5, color: "text.secondary" }}
                          >
                            Total bet
                          </TableCell>
                          <TableCell
                            sx={{ pr: 3, py: 1.5, color: "green" }}
                            align="right"
                          >{`\u20B9${data.totalBet}`}</TableCell>{" "}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "grey.200",
                      color: "text.secondary",
                      fontSize: "0.875rem",
                    }}
                  >
                    {new Date(data.timestamp).toLocaleString()}
                  </Box>
                </Paper>
              </Box>
            ))}
            {/* Content End */}
          </Box>
          {children}
        </Box>
      </Mobile>
    </div>
  );
};

export default BetHistoryMain;
