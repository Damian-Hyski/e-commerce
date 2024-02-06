"use client";


import { useRouter } from "next/navigation";
import { useAlert } from "./AlertContext";
import { API_URL } from "../helpers/config";

const { createContext, useContext } = require("react");

const RegisterUserContext = createContext();

export const RegisterUserProvider = ({ children }) => {
  const { showAlert } = useAlert();
  const router = useRouter();

  const registerUser = async (
    username,
    email,
    password,
    password2,
    csrfToken,
  ) => {
    if (password !== password2) {
      showAlert("Hasła różnią się od siebie", "warning");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        showAlert(
          "Rejestracja zakończona pomyślnie",
          "success",
        );
        router.push("/sign-in");
      } else {
        console.error("Błąd rejestracji:", await response.text());
        showAlert("Rejestracja nie powiodła się", "warning");
      }
    } catch (error) {
      console.error("Błąd sieci: ", error);
      showAlert("Błąd serwera", "error");
    }
  };

  return (
    <RegisterUserContext.Provider value={{ registerUser }}>
      {children}
    </RegisterUserContext.Provider>
  );
};

export const useRegisterUser = () => {
  return useContext(RegisterUserContext);
};
