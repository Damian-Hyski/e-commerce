"use client";

const { createContext, useEffect, useContext, useState } = require("react");

const LoginStatusContext = createContext();

export const LoginStatusProvider = ({ children }) => {
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

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <LoginStatusContext.Provider value={{loginStatus, setLoginStatus}}>
            {children}
        </LoginStatusContext.Provider>
    );
};

export const useLoginStatus = () => {
    return useContext(LoginStatusContext);
};
