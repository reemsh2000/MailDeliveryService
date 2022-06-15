import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useCustomerInfo from "../hooks/useCustomerInfo";
import { AppDataContext } from "../context/appDataContext";
import { getCustomerName } from "../Functions";
import "./styles/invoice.css";
function Invoice() {
  const [customerName, setcustomerName] = useState("");
  const todayDate = new Date().toISOString().slice(0, 10);
  const { customerId } = useParams();
  const { appData } = useContext(AppDataContext);
  const { weights, prices, packages } = useCustomerInfo(customerId, appData);
  useEffect(() => {
    setcustomerName(getCustomerName(customerId, appData.customers));
  }, [appData.customers, customerId]);

  return (
    <>
      <div className="header">
        <div className="left">
          <p>{todayDate} </p>
          <h4>{customerName}</h4>
        </div>
        <div className="right">
          <h1>Invoice</h1>
          <p>No {customerId + 10}</p>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell> Weight</TableCell>
              <TableCell> Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell> {row.weight}</TableCell>
                  <TableCell> {row.price}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell> {weights}kg</TableCell>
              <TableCell> {prices}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <footer className="invoice_footer">
        <p>You received {packages.length} packages</p>
        <p>Thank you for using our services</p>
      </footer>
    </>
  );
}

export default Invoice;
