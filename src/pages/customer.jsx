import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AppDataContext } from "../context/appDataContext";
import { deleteCustomerById } from "../Functions";
function Customer(props) {
  const [customers, setCustomers] = useState([]);
  const { appData, setAppData } = useContext(AppDataContext);
  useEffect(() => {
    setCustomers(appData.customers);
  }, [appData]);
  
  const deleteCustomer = (id) => {
    const newAppData = deleteCustomerById(id, appData);
    setAppData(newAppData);
  };
  return (
    <>
      <h2 style={{ margin: "25px" }}>Customers</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.map((row) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={row.id}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Link to={`/invoice/${row.id}`}>
                      <Button variant="contained">Create Invoice</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => deleteCustomer(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Customer;
