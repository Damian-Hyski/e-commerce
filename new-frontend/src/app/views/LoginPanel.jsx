"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLoginUser } from "../contexts/LoginUserContext";
import { useCsrfToken } from "../contexts/CsrfTokenContext";
import { useLoginStatus } from "../contexts/LoginStatusContext";
import { useRouter } from "next/navigation";

export function LoginPanel() {
  const { csrfToken } = useCsrfToken();
  const { loginUser } = useLoginUser();
  const { loginStatus } = useLoginStatus();

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (loginStatus) {
      router.push("/");
    }
  }, [loginStatus]);

  async function handleSubmit(event) {
    event.preventDefault();
    loginUser(usernameValue, passwordValue, csrfToken);
    // checkLoginStatus();
  }

  return (
    <div className="bg-custom-gradient flex h-screen w-full flex-col items-center justify-center gap-8">
      <h2 className="text-4xl font-black uppercase text-light">Zaloguj się</h2>
      <div className="shadow-custom-shadow w-1/5 min-w-80 bg-light p-6 text-xs font-medium uppercase">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="username">Login</label>
              </div>
              <input
                className="rounded-3xl border border-dark px-4 py-2"
                type="text"
                name="username"
                id="username"
                autoComplete="username"
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
                className="rounded-3xl border border-dark px-4 py-2"
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                value={passwordValue}
                onChange={(e) => {
                  setPasswordValue(e.target.value);
                }}
              />
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <button
                type="submit"
                className="w-fit rounded-3xl border px-4 py-2 text-xs uppercase"
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
