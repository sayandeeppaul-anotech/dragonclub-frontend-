import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import {domain} from '../../Components/config';

const DepositBonusAdmin = () => {
    const [data, setData] = useState([]);
    const [minimumDeposit, setMinimumDeposit] = useState('');
    const [bonus, setBonus] = useState('');
    const [minimumSubordinates, setMinimumSubordinates] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${domain}/get-salary-criteria`, { withCredentials: true });
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${domain}/update-salary-criteria`, { minimumDepositAmount:minimumDeposit, bonusAmount:bonus,minimumSubordinates }, { withCredentials: true });
            fetchData();
        } catch (error) {
            console.error('Error updating deposit bonus', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center">Update Deposit Bonus</Typography>
            <form onSubmit={handleSubmit}>
            <TextField
                    label="Minimum Subordinates"
                    value={minimumSubordinates}
                    onChange={(e) => setMinimumSubordinates(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Minimum Deposit"
                    value={minimumDeposit}
                    onChange={(e) => setMinimumDeposit(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Bonus"
                    value={bonus}
                    onChange={(e) => setBonus(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update
                </Button>
            </form>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align="left">MinimumSubordinates</TableCell>
                            <TableCell>Minimum Deposit</TableCell>
                            <TableCell align="right">Bonus</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
    {data.map((row) => (
        <TableRow key={row._id}>
             <TableCell component="th" scope="row">
                {row.minimumSubordinates} {/* Changed from row.minimumDeposit */}
            </TableCell>
            <TableCell component="th" scope="row">
                {row.minimumDepositAmount} {/* Changed from row.minimumDeposit */}
            </TableCell>
            <TableCell align="right">{row.bonusAmount}</TableCell> {/* Changed from row.bonus */}
        </TableRow>
    ))}
</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default DepositBonusAdmin;