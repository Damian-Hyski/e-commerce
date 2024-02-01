"use client";

const { createContext, useEffect, useContext, useState } = require("react");

const LoginStatusContext = createContext();

export const LoginStatusProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [loginStatus, setLoginStatus] = useState(undefined);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/status", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const { is_logged_in } = await response.json();
        if (is_logged_in) {
          setLoginStatus(true);
        } else {
          setLoginStatus(false);
        }
      } else {
        setLoginStatus(false);
        console.error("Błąd przy sprawdzaniu statusu zalogowania");
      }
    } catch (error) {
      setLoginStatus(false);
      console.error("Błąd sieci: ", error);
    }
  };

  const checkUserData = async () => {
    try {
      if (loginStatus) {
        const response = await fetch("http://127.0.0.1:8000/auth/user", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const jsonData = await response.json();
          setUserData(jsonData);
        } else {
          setUserData(undefined);
        }
      }
    } catch (error) {
      setUserData(undefined);
      console.error("Błąd sieci: ", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    checkUserData();
  }, [loginStatus]);

  return (
    <LoginStatusContext.Provider
      value={{ loginStatus, setLoginStatus, userData }}
    >
      {children}
    </LoginStatusContext.Provider>
  );
};

export const useLoginStatus = () => {
  return useContext(LoginStatusContext);
};
