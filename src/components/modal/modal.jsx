import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { AppDataContext } from "../../context/appDataContext";
import { addPackage } from "../../Functions";
import ModalBtn from "../modalBtn";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { modalValidation, checkNotEmpty } from "./modalValidation";
import {
  intialErrors,
  newPackageInfoIntialValue,
  modalStyle,
} from "./modalIntialValues";
import "./modelStyle.css";

function ModalComponent({ modalStatus, setModalStatus }) {
  const [newPackageInfo, setNewPackageInfo] = useState(
    newPackageInfoIntialValue
  );
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState(intialErrors);
  const { appData, setAppData } = useContext(AppDataContext);
  const packageId = `pack${appData.packages.length + 1}`;
  const handleChange = (value) => {
    setNewPackageInfo(value);
  };
  const addNewPackage = () => {
    if (validateInputs()) {
      const { newData, errorMsg } = addPackage(
        { ...newPackageInfo, id: packageId },
        appData
      );
      if (errorMsg) {
        alert(errorMsg);
        setNewPackageInfo(newPackageInfoIntialValue);
        return;
      }
      setAppData(newData);
      setModalStatus();
      setNewPackageInfo(newPackageInfoIntialValue);
      setDisabled(true)
    }
  };
  const validateInputs = () => {
    const errs = modalValidation(newPackageInfo);
    setErrors(errs);
    if (
      JSON.stringify(errs) === JSON.stringify(intialErrors) &&
      checkNotEmpty(newPackageInfo)
    )
      return true;
    return false;
  };
  useEffect(() => {
    const valid = validateInputs();
    if (valid) setDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPackageInfo]);
  return (
    <div>
      <Modal
        open={modalStatus}
        onClose={setModalStatus}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <form action="" className="package_form">
            <h2 className="title">New Package</h2>
            <TextField
              placeholder="Package ID"
              name="id"
              label="Package ID"
              disabled={true}
              value={packageId}
            />
            <TextField
              placeholder="weight"
              name="weight"
              label="Weight"
              required
              error={errors.weight ? true : false}
              helperText={errors.weight}
              onChange={(event) =>
                handleChange({
                  ...newPackageInfo,
                  weight: `${event.target.value}`,
                })
              }
              value={newPackageInfo.weight}
            />
            <TextField
              placeholder="Price"
              name="price"
              label="Price"
              required
              error={errors.price ? true : false}
              helperText={errors.price}
              onChange={(event) =>
                handleChange({ ...newPackageInfo, price: event.target.value })
              }
              value={newPackageInfo.price}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Customer ID</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={newPackageInfo.customerid}
                label="Customer ID"
                onChange={(event) =>
                  handleChange({
                    ...newPackageInfo,
                    customerid: event.target.value,
                  })
                }
                style={{margin:'-8px',padding:"5px"}}
              >
                {appData.customers.map((customer) => {
              return (
                <MenuItem key={customer.id} value={customer.id}>{customer.id}</MenuItem>
              );
            })}
              </Select>
            </FormControl>
            <TextField
              placeholder="Shipping Order"
              name="shippingOrder"
              label="Shipping Order"
              required
              error={errors.shippingOrder ? true : false}
              helperText={errors.shippingOrder}
              onChange={(event) =>
                handleChange({
                  ...newPackageInfo,
                  shippingOrder: event.target.value,
                })
              }
              value={newPackageInfo.shippingOrder}
            />
            <div className="modal_btns">
              <ModalBtn
                onClickFunc={setModalStatus}
                text="cancel"
                color="error"
              />

              <ModalBtn
                onClickFunc={addNewPackage}
                text="Add Package"
                color="success"
                disabled={disabled}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalComponent;
