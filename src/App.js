import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PackageList from "./pages/PackageList";
import "./App.css";
import Customer from "./pages/customer";
import InvoiceList from "./pages/invoiceList";
import DrawerComponent from "./components/drawer";
import Invoice from "./pages/invoice";
import AppDataProvider from "./context/appDataContext";
function App() {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const open = drawerStatus ? "open" : "";
  const mainClasses = `main_page ${open}`; // for main content if drawer open or close
  // for open/close drawer
  const handleDrawerOpenClose = () => {
    setDrawerStatus((prev) => !prev);
  };

  return (
    <AppDataProvider>
      <div className="App">
        <Router>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleDrawerOpenClose}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Mail Delivery Service
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <DrawerComponent drawerStatus={drawerStatus} />
          <div className={mainClasses}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/customers" />
              </Route>
              <Route exact path="/customers">
                <Customer />
              </Route>
              <Route exact path="/packages">
                <PackageList />
              </Route>
              <Route exact path="/invoices">
                <InvoiceList />
              </Route>
              <Route exact path="/invoice/:customerId">
                <Invoice />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </AppDataProvider>
  );
}

export default App;
