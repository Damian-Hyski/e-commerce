"use client";

import { API_URL } from "../helpers/config";
import { useAlert } from "./AlertContext";
import { useUserData } from "./UserDataContext";

const { createContext, useContext } = require("react");

const LoginUserContext = createContext();

export const LoginUserProvider = ({ children }) => {
  const { setUserStatus } = useUserData();
  const { showAlert } = useAlert();

  const loginUser = async (username, password, csrfToken) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setUserStatus(true);
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
