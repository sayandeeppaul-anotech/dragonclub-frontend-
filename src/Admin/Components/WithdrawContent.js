import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import axios from "axios";
import {domain} from "../../Components/config";

function UpdateWithdrawRequest() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [disabledRows, setDisabledRows] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${domain}/all-withdraw-history-admin_only`,
          {
            withCredentials: true,
          }
        );

        console.log(res.data);

        
        const data = res.data.userWithdrawals.map((result, index) => {
          if (result.userId && Array.isArray(result.userId.bankDetails) && result.userId.bankDetails.length > 0) {
            const { accountNo, bankName, ifscCode, mobile, name } = result.userId.bankDetails[0];
            const TRXAddress = Array.isArray(result.userId.TRXAddress) && result.userId.TRXAddress.length > 0 ? result.userId.TRXAddress[0] : null;
          
            return ({
              id: result._id,
              srNo: index + 1,
              status: result.status,
              balance: result.balance,
              userId: result.userId._id, 
              createdAt: result.createdAt,
              updatedAt: result.updatedAt,
              accountNo,
              bankName,
              ifscCode,
              mobile,
              name,
              withdrawMethod: result.withdrawMethod,
              TRXAddress // Add this line
            });
          } else {
            return ({
              id: result._id,
              srNo: index + 1,
              status: result.status,
              balance: result.balance,
              userId: result.userId ? result.userId._id : null, 
              createdAt: result.createdAt,
              updatedAt: result.updatedAt,
              withdrawMethod: result.withdrawMethod,
              TRXAddress: result.userId && Array.isArray(result.userId.TRXAddress) && result.userId.TRXAddress.length > 0 ? result.userId.TRXAddress[0] : null // Add this line
            });
          }
        });
        setRows(data);
        setFilteredRows(data);
        localStorage.setItem("withdrawals", JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    };
 

    const storedDisabledRows = localStorage.getItem("disabledRows");
    if (storedDisabledRows) {
      setDisabledRows(JSON.parse(storedDisabledRows));
    }
    fetchData();
  }, []);

  const updateRowStatus = (id, newStatus) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, status: newStatus, updatedAt: new Date().toISOString() } : row
    );

    setRows(updatedRows);
    setFilteredRows(updatedRows);
    localStorage.setItem("withdrawals", JSON.stringify(updatedRows));
  };

  const handleAccept = async (id) => {
    const token = Cookies.get("token");

    try {
      const res = await axios.post(
        `${domain}/update-withdraw-status`,
        {
          withdrawId: id,
          acceptanceType: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      setDisabledRows((prev) => {
        const newDisabledRows = { ...prev, [id]: "accepted" };
        localStorage.setItem("disabledRows", JSON.stringify(newDisabledRows));
        return newDisabledRows;
      });
      updateRowStatus(id, "Completed");
    } catch (error) {
      console.error("Error updating withdraw status:", error);
    }
  };

  const handleReject = async (id) => {
    const token = Cookies.get("token");

    try {
      const res = await axios.post(
        `${domain}/update-withdraw-status`,
        {
          withdrawId: id,
          acceptanceType: "Rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      setDisabledRows((prev) => {
        const newDisabledRows = { ...prev, [id]: "rejected" };
        localStorage.setItem("disabledRows", JSON.stringify(newDisabledRows));
        return newDisabledRows;
      });
      updateRowStatus(id, "Rejected");
    } catch (error) {
      console.error("Error updating withdraw status:", error);
    }
  };
  const [filterModel, setFilterModel] = useState({
    items: [
      { columnField: 'status', operatorValue: 'contains', value: '' },
    ],
  });

  const columns = [
    { field: "srNo", headerName: "Id", width: 30 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "withdrawMethod", headerName: "Withdraw Method", width: 130 },
  { field: "balance", headerName: "Balance", width: 100 },
  {
    field: "accountNo",
    headerName: "Account No",
    width: 200,
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography>{params.value}</Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigator.clipboard.writeText(params.value)}
        >
          Copy
        </Button>
      </Box>
    ),
  },
  { field: "bankName", headerName: "Bank Name", width: 150 },
  {
    field: "ifscCode",
    headerName: "IFSC Code",
    width: 200,
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography>{params.value}</Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigator.clipboard.writeText(params.value)}
        >
          Copy
        </Button>
      </Box>
    ),
  },
  { field: "mobile", headerName: "Mobile", width: 100 },
  { field: "name", headerName: "Name", width: 100 },
  {
    field: "TRXAddress",
    headerName: "TRX Address",
    width: 250,
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography>{params.value}</Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigator.clipboard.writeText(params.value)}
        >
          Copy
        </Button>
      </Box>
    ),
  },
  { field: "createdAt", headerName: "Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={disabledRows[params.row.id]}
            onClick={() => handleAccept(params.row.id)}
            sx={{
              backgroundColor: disabledRows[params.row.id] === "accepted" ? "grey" : "primary.main",
            }}
          >
            
            Accept
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disabled={disabledRows[params.row.id]}
            onClick={() => handleReject(params.row.id)}
            sx={{
              backgroundColor: disabledRows[params.row.id] === "rejected" ? "grey" : "secondary.main",
            }}
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];

  return (
   <div style={{ height: 600, width: '100%' }}>
       
          <Typography variant="h5" sx={{ p: 3 }}>
            Withdraw Status
          </Typography>
       
<DataGrid
  rows={filteredRows}
  columns={columns}
  pageSize={10}
  rowsPerPageOptions={[10, 20, 50]}
  sortingOrder={["asc", "desc"]}
  disableSelectionOnClick
  filterModel={filterModel}
  filterMode="check"
  disableColumnFilter={false}
  components={{
    Toolbar: GridToolbar,
  }}
  onFilterModelChange={(model) => {
    if (JSON.stringify(model) !== JSON.stringify(filterModel)) {
      setFilterModel(model);
    }
  }}
/>
          
      
    </div>
  );
}

UpdateWithdrawRequest.propTypes = {
  window: PropTypes.func,
};

export default UpdateWithdrawRequest;
