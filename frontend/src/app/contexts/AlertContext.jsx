"use client";

import classNames from "classnames";
import { createContext, useState, useCallback, useContext } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((message, type = "info", timeout = 5000) => {
    const id = new Date().getTime();
    setAlerts((currentAlerts) => [...currentAlerts, { id, message, type }]);

    setTimeout(() => {
      setAlerts((currentAlerts) =>
        currentAlerts.filter((alert) => alert.id !== id),
      );
    }, timeout);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alerts.map((alert, index) => {
        const bottomOffset = 10 + index * 60;
        return (
          <div
            key={alert.id}
            className={classNames(
              "fixed left-10 z-50 rounded-3xl px-8 py-4 uppercase text-light",
              {
                "bg-red": alert.type === "error",
                "bg-yellow": alert.type === "warning",
                "bg-green": alert.type === "success",
              },
            )}
            style={{ bottom: `${bottomOffset}px` }}
          >
            {alert.message}
          </div>
        );
      })}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
