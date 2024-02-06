"use client";

import Cookies from "js-cookie";
import { useUserData } from "./UserDataContext";
import { API_URL } from "../helpers/config";

const { createContext, useState, useEffect, useContext } = require("react");

const CsrfTokenContext = createContext();

export const CsrfTokenProvider = ({ children }) => {
  const { userStatus } = useUserData();
  const [csrfToken, setCsrfToken] = useState("");

  const fetchCsrfToken = async () => {
    try {
      const existingToken = Cookies.get("csrftoken");
      if (!existingToken) {
        await fetch(`${API_URL}/auth/csrf`, {
          credentials: "include",
        });
        const newToken = Cookies.get("csrftoken");
        setCsrfToken(newToken);
      } else {
        setCsrfToken(existingToken);
      }
    } catch (error) {
      console.error("Problem with fetching CSRF token: ", error);
    }
  };

  useEffect(() => {
    fetchCsrfToken();
  }, [userStatus]);

  return (
    <CsrfTokenContext.Provider value={{ csrfToken }}>
      {children}
    </CsrfTokenContext.Provider>
  );
};

export const useCsrfToken = () => {
  return useContext(CsrfTokenContext);
};
