import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { domain } from '../../Components/config';
import { Typography } from '@mui/material';

const Recharge = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    axios.get(`${domain}/admin/deposit/history`, { withCredentials: true })
      .then(res => setDeposits(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAccept = (deposit) => {
    axios.post(`${domain}/wallet-manual`, { userId: deposit.userId, amount: deposit.depositAmount, depositId: deposit._id }, { withCredentials: true })
      .then(res => {
        setDeposits(deposits.map(d => 
          d._id === deposit._id ? { ...d, depositStatus: 'completed' } : d
        ));
      })
      .catch(err => console.error(err));
  };
  const handleReject = (deposit) => {
    axios.post(`${domain}/rejectDeposit`, { userId: deposit.userId, depositId: deposit._id }, { withCredentials: true })
      .then(res => {
        setDeposits(deposits.map(d => 
          d._id === deposit._id ? { ...d, depositStatus: 'failed' } : d
        ));
      })
      .catch(err => console.error(err));
  };

  const columns = [
    { field: 'depositId', headerName: 'UTR', width: 150 },
    { field: 'uid', headerName: 'UID', width: 150 },
    { field: 'depositAmount', headerName: 'Amount', width: 150 },
    { field: 'depositStatus', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <>
          {params.row.depositStatus === 'pending' && <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleAccept(params.row)}>Accept</Button>}
          {params.row.depositStatus === 'pending' && <Button variant="contained" color="secondary" onClick={() => handleReject(params.row)}>Reject</Button>}
        </>
      ),
    }
  ];
  const [filterModel, setFilterModel] = useState({
    items: [
      { columnField: 'depositStatus', operatorValue: 'contains', value: '' },
    ],
  });
  return (
    <div style={{ height: 600, width: '100%' }}>
        <Typography variant="h5" sx={{ p: 3 }}>
            Recharge Status
          </Typography>
<DataGrid 
  rows={deposits.slice().reverse()} 
  columns={columns} 
  pageSize={5} 
  getRowId={(row) => row._id}
  filterModel={filterModel}
  onFilterModelChange={(model) => {
    if (JSON.stringify(model) !== JSON.stringify(filterModel)) {
      setFilterModel(model);
    }
  }}
  components={{
    Toolbar: GridToolbar,
  }}
/>
  </div>
  );
};

export default Recharge;