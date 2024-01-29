import { CsrfTokenProvider } from "@/app/contexts/CsrfTokenContext";
import { LoginUserProvider } from "@/app/contexts/LoginUserContext";
import { LoginPanel } from "@/app/views/LoginPanel";

export default function SignIn() {
  return (
    <CsrfTokenProvider>
      <LoginUserProvider>
        <LoginPanel />
      </LoginUserProvider>
    </CsrfTokenProvider>
  );
}
