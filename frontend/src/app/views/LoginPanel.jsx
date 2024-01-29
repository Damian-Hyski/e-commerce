"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLoginUser } from "../contexts/LoginUserContext";
import { useCsrfToken } from "../contexts/CsrfTokenContext";
import { useLoginStatus } from "../contexts/LoginStatusContext";
import { useRouter } from "next/navigation";
import { InputField } from "../components/ImputField";
import { FormContainer } from "../components/FormContainer";

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
    setUsernameValue("");
    setPasswordValue("");
  }

  return (
    <FormContainer title="Zaloguj się">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <InputField
            type="text"
            name="username"
            id="username"
            label="Login"
            autoComplete="username"
            value={usernameValue}
            onChange={(e) => {
              setUsernameValue(e.target.value);
            }}
          />
          <InputField
            type="password"
            name="password"
            id="password"
            label="hasło"
            autoComplete="current-password"
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          />
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
    </FormContainer>
  );
}
