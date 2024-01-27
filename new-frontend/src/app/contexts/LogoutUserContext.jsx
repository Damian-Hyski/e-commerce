"use client";

import { useLoginStatus } from "./LoginStatusContext";

const { createContext, useContext } = require("react");

const LogoutUserContext = createContext();

export const LogoutUserProvider = ({ children }) => {
    const { setLoginStatus } = useLoginStatus();

    const logoutUser = async (csrfToken) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                credentials: "include",
            });

            if (response.ok) {
                setLoginStatus(false);
            } else {
                setLoginStatus(false);
                console.error("Błąd wylogowywania:", await response.text());
            }
        } catch (error) {
            setLoginStatus(false);
            console.error("Błąd sieci: ", error);
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
