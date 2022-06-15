import React, { createContext, useState, useEffect } from "react";
import { getData } from "../Functions";
export const AppDataContext = createContext();

function AppDataProvider({ children }) {
  const [appData, setAppData] = useState({ customers: [], packages: [] });
  useEffect(() => {
    getData().then((res) => {
      setAppData(res);
    });
  }, []);
  return (
    <AppDataContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppDataContext.Provider>
  );
}
export default AppDataProvider;
