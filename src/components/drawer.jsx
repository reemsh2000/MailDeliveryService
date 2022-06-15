import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
const drawerStyle={
  width: 200,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 200,
    boxSizing: "border-box",
    marginTop: 8,
  },
}
function DrawerComponent({ drawerStatus }) {
  return (
    <Drawer
      anchor={"left"}
      open={drawerStatus}
      onClose={() => {}}
      sx={drawerStyle}
      variant="persistent"
    >
      <List style={{ width: "300px" }}>
        <Link to="/customers">
          <ListItem button>
            <ListItemText primary={"Customers"} />
          </ListItem>
        </Link>
        <Link to="/packages">
          <ListItem button>
            <ListItemText primary={"Packages"} />
          </ListItem>
        </Link>
        <Link to="/invoices">
          <ListItem button>
            <ListItemText primary={"Invoices"} />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}

export default DrawerComponent;
