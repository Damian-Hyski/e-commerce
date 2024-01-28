"use client";

import classNames from "classnames";

const { createContext, useState, useCallback, useContext } = require("react");

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = useCallback((message, type = "info", timeout = 5000) => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, timeout);
  }, []);

  const dynamicClass = classNames({
    "absolute bottom-10 right-10 z-50 rounded-3xl px-8 py-4 uppercase text-light": true,
    "bg-red": alert.type === "error",
    "bg-yellow": alert.type === "warning",
    "bg-green": alert.type === "success",
  });

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
      {alert.message && <div className={dynamicClass}>{alert.message}</div>}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
