"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { CsrfContext } from "./contexts/CsrfContext";

export default function Home() {
    const { csrfToken } = useContext(CsrfContext)
    const { isLoggedIn, checkLoginStatus, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    async function handleLogout() {
        await logoutUser(csrfToken)
    }

    return (
        <>
            <h1>Strona główna</h1>

            {isLoggedIn ? (
                <div>
                    <p>Zalogowany</p>
                    <button onClick={handleLogout}>Wyloguj się</button>
                </div>
            ) : (
                <a href="/sign-in">Zaloguj się</a>
            )}
        </>
    );
}
