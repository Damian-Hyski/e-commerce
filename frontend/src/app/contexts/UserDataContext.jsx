"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../helpers/config";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userStatus, setUserStatus] = useState(false);

  const fetchUserData = async () => {
    if (userStatus) {
      try {
        const res = await fetch(`${API_URL}/auth/user`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Błąd sieci: ", error);
      }
    }
  };

  const fetchUserStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/status`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const { status } = await res.json();
        if (status) {
          setUserStatus(status);
        }
      } else {
        setUserStatus(false);
        console.error("Błąd przy sprawdzaniu statusu zalogowania");
      }
    } catch (error) {
      setUserStatus(false);
      console.error("Błąd sieci: ", error);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, [userStatus]);

  useEffect(() => {
    if (userStatus) {
      fetchUserData();
    }
  }, [userStatus]);

  return (
    <UserDataContext.Provider value={{ userStatus, setUserStatus, userData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
