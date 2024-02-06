"use client";

import { API_URL } from "../helpers/config";
import { useAlert } from "./AlertContext";
import { useUserData } from "./UserDataContext";

const { createContext, useContext } = require("react");

const LogoutUserContext = createContext();

export const LogoutUserProvider = ({ children }) => {
  const { setUserStatus } = useUserData();
  const { showAlert } = useAlert();

  const logoutUser = async (csrfToken) => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
      });

      if (response.ok) {
        setUserStatus(false);
        showAlert("Pomyślnie wylogowano", "success")
      } else {
        console.error("Błąd wylogowywania:", await response.text());
        showAlert("Wylogowywanie nie powiodło się", "warning")
      }
    } catch (error) {
      console.error("Błąd sieci: ", error);
      showAlert("Błąd servera", "error")
    }
  };

  return (
    <LogoutUserContext.Provider value={{ logoutUser }}>
      {children}
    </LogoutUserContext.Provider>
  );
};

export const useLogoutUser = () => {
  return useContext(LogoutUserContext);
};
