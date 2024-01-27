"use client";

import Cookies from "js-cookie";
import { useLoginStatus } from "./LoginStatusContext";

const { createContext, useState, useEffect, useContext } = require("react");

const CsrfTokenContext = createContext();

export const CsrfTokenProvider = ({ children }) => {
    const {loginStatus} = useLoginStatus();
    const [csrfToken, setCsrfToken] = useState("");

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

    useEffect(() => {
        fetchCsrfToken();
    }, [loginStatus]);

    return (
        <CsrfTokenContext.Provider value={{ csrfToken }}>
            {children}
        </CsrfTokenContext.Provider>
    );
};

export const useCsrfToken = () => {
    return useContext(CsrfTokenContext);
};
