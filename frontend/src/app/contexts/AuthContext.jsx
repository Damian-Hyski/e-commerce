"use client";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ status, children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(status);

    // Funkcja logująca użytkownika
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
                setIsLoggedIn(true);
            } else {
                console.error("Błąd logowania:", await response.text());
            }
        } catch (error) {
            console.error("Błąd sieci: ", error);
        }
    };

    // Funkcja sprawdzająca stan zalogowania
    const checkLoginStatus = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/status", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const { is_logged_in } = await response.json();
                if (is_logged_in) {
                    // Użytkownik Zalogowany
                    setIsLoggedIn(true);
                } else {
                    // Użytkownik nie zalogowany
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
                console.error("Błąd przy sprawdzaniu statusu zalogowania");
            }
        } catch (error) {
            setIsLoggedIn(false);
            console.error("Błąd sieci: ", error);
        }
    };

    // Funkcja wylogowywująca użytkownika
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
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(false);
                console.error("Błąd wylogowywania:", await response.text());
            }
        } catch (error) {
            setIsLoggedIn(false);
            console.error("Błąd sieci: ", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, loginUser, checkLoginStatus, logoutUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};
