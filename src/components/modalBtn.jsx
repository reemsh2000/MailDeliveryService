import React from "react";
import Button from "@mui/material/Button";

function ModalBtn({ onClickFunc, text, color ,disabled=false}) {
  return (
    <Button
      size="medium"
      variant="contained"
      onClick={onClickFunc}
      color={color}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}
export default ModalBtn;
