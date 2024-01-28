"use client"

import { useState } from "react";
import { FormContainer } from "../components/FormContainer";
import { InputField } from "../components/ImputField";
import Link from "next/link";

export function RegistrationPanel() {
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");

  return (
    <FormContainer title="Zarejestruj się">
      <form method="POST">
        <div className="flex flex-col gap-6">
          <InputField
            type="text"
            name="username"
            id="username"
            label="Login"
            autoComplete="off"
            value={usernameValue}
            onChange={(e) => {
              setUsernameValue(e.target.value);
            }}
          />
          <InputField
            type="email"
            name="email"
            id="email"
            label="Adres email"
            autoComplete="off"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          />
          <InputField
            type="password"
            name="password"
            id="password"
            label="hasło"
            autoComplete="off"
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          />
          <InputField
            type="password"
            name="password2"
            id="password2"
            label="potwierdź hasło"
            autoComplete="off"
            value={password2Value}
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          />
          <div className="flex w-full items-center justify-between gap-4">
            <button
              type="submit"
              className="w-fit rounded-3xl border px-4 py-2 text-xs uppercase"
            >
              Zarejestruj się
            </button>
            <Link href="/sign-in">Zaloguj się</Link>
          </div>
        </div>
      </form>
    </FormContainer>
  );
}
