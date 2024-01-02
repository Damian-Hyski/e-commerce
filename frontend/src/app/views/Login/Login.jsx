"use client";

import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function Login() {
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        const fetchCsrfToken = async () => {
            const existingToken = Cookies.get("csrftoken");
            if (!existingToken) {
                await fetch("http://127.0.0.1:8001/auth/csrf", {
                    credentials: "include",
                });
                const newToken = Cookies.get("csrftoken");
                setCsrfToken(newToken);
            } else {
                setCsrfToken(existingToken);
            }
        };

        fetchCsrfToken();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: usernameValue,
                    password: passwordValue,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Zalogowano pomyślnie: ", data);
            } else {
                console.error("Błąd logowania:", await response.text());
            }
        } catch (error) {
            console.error("Błąd sieci: ", error);
        }
    }

    return (
        <>
            <h1>Zaloguj się</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="username">Login</label>
                    </div>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={usernameValue}
                        onChange={(e) => {
                            setUsernameValue(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Hasło</label>
                    </div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={passwordValue}
                        onChange={(e) => {
                            setPasswordValue(e.target.value);
                        }}
                    />
                </div>
                <button type="submit">Zaloguj się</button>
            </form>
        </>
    );
}
