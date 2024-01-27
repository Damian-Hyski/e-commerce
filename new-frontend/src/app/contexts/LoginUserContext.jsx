"use client";

import { useLoginStatus } from "./LoginStatusContext";

const { createContext, useContext } = require("react");

const LoginUserContext = createContext();

export const LoginUserProvider = ({ children }) => {
    const { setLoginStatus } = useLoginStatus();

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
            } else {
                console.error("Błąd logowania:", await response.text());
            }
        } catch (error) {
            console.error("Błąd sieci: ", error);
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
