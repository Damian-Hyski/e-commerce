"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CsrfContext } from "../contexts/CsrfContext";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export function SignInSection() {
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
    }, [isLoggedIn])

    async function handleSubmit(event) {
        event.preventDefault();
        await loginUser(usernameValue, passwordValue, csrfToken);
        checkLoginStatus();
    }

    return (
        <div className="w-full h-screen bg-custom-gradient flex flex-col justify-center items-center gap-8">
            <h2 className="text-4xl text-light uppercase font-black">
                Zaloguj się
            </h2>
            <div className="bg-light w-1/5 min-w-80 p-6 shadow-custom-shadow uppercase text-xs font-medium">
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <div>
                                <label htmlFor="username">Login</label>
                            </div>
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="text"
                                name="username"
                                id="username"
                                value={usernameValue}
                                onChange={(e) => {
                                    setUsernameValue(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <label htmlFor="password">Hasło</label>
                            </div>
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="password"
                                name="password"
                                id="password"
                                value={passwordValue}
                                onChange={(e) => {
                                    setPasswordValue(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex w-full gap-4 items-center justify-between">
                            <button
                                type="submit"
                                className="border w-fit px-4 py-2 rounded-3xl uppercase text-xs"
                            >
                                Zaloguj się
                            </button>
                            <Link href="/sign-up">Zarejestruj się</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
