import React, { useEffect, useState, useContext } from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { AppDataContext } from "../context/appDataContext";
import ModalComponent from "../components/modal/modal";

function PackageList(props) {
  const { appData } = useContext(AppDataContext);
  const [packagesList, setPackagesList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleModalOpenClose = () => setOpen((prev) => !prev);
  useEffect(() => {
    setPackagesList(appData.packages);
  }, [appData]);
  const getCustomerName = (customerId) => {
    const { name } = appData.customers.filter(
      (customer) => parseInt(customerId) === customer.id
    )[0];
    return name;
  };

  const reorderToUp = (index) => {
    setPackagesList((prevState) => {
      if (index === 0) return prevState;
      let data = [...prevState];
      let temp = data[index - 1];
      data[index - 1] = data[index];
      data[index] = temp;
      return data;
    });
  };
  const reorderToDown = (index) => {
    setPackagesList((prevState) => {
      if (index === prevState.length - 1) return prevState;
      let data = [...prevState];
      let temp = data[index + 1];
      data[index + 1] = data[index];
      data[index] = temp;
      return data;
    });
  };

  return (
    <>
      <h2 style={{ margin: "25px" }}>Packages List</h2>
      <ModalComponent
        modalStatus={open}
        setModalStatus={handleModalOpenClose}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleModalOpenClose}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packagesList.map((row, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={row.id}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{getCustomerName(row.customerid)}</TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <Button variant="contained">Delete</Button>
                    <ArrowUpwardIcon
                      onClick={() => {
                        reorderToUp(index);
                      }}
                    />
                    <ArrowDownwardIcon
                      onClick={() => {
                        reorderToDown(index);
                      }}
                    />
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

export default PackageList;
