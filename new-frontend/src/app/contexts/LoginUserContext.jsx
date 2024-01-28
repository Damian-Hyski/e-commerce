"use client";

import { useAlert } from "./AlertContext";
import { useLoginStatus } from "./LoginStatusContext";

const { createContext, useContext } = require("react");

const LoginUserContext = createContext();

export const LoginUserProvider = ({ children }) => {
  const { setLoginStatus } = useLoginStatus();
  const { showAlert } = useAlert();

  const loginUser = async (username, password, csrfToken) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setLoginStatus(true);
        showAlert("Pomyślnie zalogowano", "success");
      } else {
        console.error("Błąd logowania:", await response.text());
        showAlert("Logowanie nie powiodło się", "warning");
      }
    } catch (error) {
      console.error("Błąd sieci: ", error);
      showAlert("Błąd servera", "error");
    }
  };

  return (
    <LoginUserContext.Provider value={{ loginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};

export const useLoginUser = () => {
  return useContext(LoginUserContext);
};
