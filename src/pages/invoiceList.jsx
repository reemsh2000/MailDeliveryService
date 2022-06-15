import React, { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllInvoices } from "../Functions";
import { AppDataContext } from "../context/appDataContext";
function InvoiceList(props) {
  const [invoices, setInvoices] = useState([]);
  const { appData } = useContext(AppDataContext);
  useEffect(() => {
    const allInvoices = getAllInvoices(appData);
    setInvoices(allInvoices);
  }, [appData]);
  return (
    <>
      <h2 style={{ margin: "25px" }}>Invoices List</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Weight</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((row) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={row.id}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.weights}</TableCell>
                  <TableCell>{row.prices}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default InvoiceList;
