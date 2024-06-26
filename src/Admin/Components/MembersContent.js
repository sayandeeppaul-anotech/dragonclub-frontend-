import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { domain } from "../../Components/config";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const MembersContent = () => {
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [dailyDeposits, setDailyDeposits] = useState([]);
  const [commissionWallet, setCommissionWallet] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [inviteLink, setInviteLink] = useState("");
  const [userDetailsDialogOpen, setUserDetailsDialogOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [setData] = useState("");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  console.log(rows);
  console.log(rows);
  useEffect(() => {
    axios
      .get(`${domain}/fetchuserdetails`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setRows(res.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteUser = (mobile) => {
    console.log(mobile);
    axios
      .delete(`${domain}/deleteuser`, {
        data: { mobile: mobile },
        withCredentials: true,
      })
      .then((res) => {
        console.log("User deleted successfully.");
        const updatedRows = rows.filter((user) => user.mobile !== mobile);
        setRows(updatedRows);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleReRegister = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    const filteredRows = rows.filter((row) =>
      String(row.mobile).includes(searchTerm)
    );
    setRows(filteredRows);
  };
  const handleReRegisterSubmit = () => {
    const data = {
      mobile: mobile,
      password: password,
    };
    axios
      .post(`${domain}/re-register`, data, {
        withCredentials: true,
      })
      .then((res) => {
        alert("User re-registered successfully.");
        setData("");
        setRows([...rows, res.data.user]);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error re-registering user:", error);
      });
  };

  const handleProfile = (_id) => {
    navigate(`/profile/${_id}`);
  };

  const columns = [
    { field: "id", headerName: "Sr No", width: 130 },
    { field: "username", headerName: "Username", width: 220 },
    { field: "mobile", headerName: "Mobile", width: 220 },
    { field: "uid", headerName: "UID", width: 200 },
    { field: "walletAmount", headerName: "Wallet Amount", width: 130 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 240,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onDeleteClick = () => {
          handleDeleteUser(params.row.mobile);
        };

        const onProfileClick = () => {
          handleProfile(params.row._id);
        };

        return (
          <div>
            <Button
              variant="contained"
              onClick={onDeleteClick}
              sx={{ backgroundColor: "red" }}
            >
              Lock Up
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: "10px" }}
              onClick={onProfileClick}
            >
              Profile
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ p: 3 }}>
        User Management
      </Typography>
      <Box display="flex" justifyContent="space-between" width="100%">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search user by mobile"
    style={{ flexGrow: 1, marginRight: '10px' }}
  />
  <Button variant="contained" onClick={handleSearch} style={{ flexGrow: 1, marginLeft: '10px' }}>
    Search
  </Button>
</Box>
      <br></br>
      <Box display="flex" justifyContent="flex-end"></Box>

      <DataGrid
        rows={rows.map((user, index) => ({ ...user, id: index + 1 }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      <hr />
    </div>
  );
};

export default MembersContent;
