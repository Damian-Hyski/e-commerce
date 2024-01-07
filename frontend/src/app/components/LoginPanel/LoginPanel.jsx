"use client";
import { CsrfContext } from "@/app/contexts/CsrfContext";
import { AuthContext } from "@/app/contexts/AuthContext";
import styles from "./LoginPanel.module.css";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginPanel() {
    const { csrfToken } = useContext(CsrfContext);
    const { loginUser, isLoggedIn, checkLoginStatus } = useContext(AuthContext);
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const router = useRouter();

    useEffect(() => {
        checkLoginStatus();
        if (isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn]);

    async function handleSubmit(event) {
        event.preventDefault();
        await loginUser(usernameValue, passwordValue, csrfToken);
        checkLoginStatus();
    }

    if (isLoggedIn === null) {
        return <div>Ładowanie...</div>;
    } else if (!isLoggedIn) {
        return (
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
        );
    }
}
