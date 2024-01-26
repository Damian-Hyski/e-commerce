"use client"
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const CsrfContext = createContext();

export const CsrfProvider = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const existingToken = Cookies.get("csrftoken");
                if (!existingToken) {
                    await fetch("http://127.0.0.1:8000/auth/csrf", {
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

        fetchCsrfToken();
    }, []);

    return (
        <CsrfContext.Provider value={{ csrfToken }}>
            {children}
        </CsrfContext.Provider>
    );
};
