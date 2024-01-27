import { CsrfTokenProvider } from "@/app/contexts/CsrfTokenContext";
import { LoginUserProvider } from "@/app/contexts/LoginUserContext";
import { LoginPanel } from "@/app/views/LoginPanel";

export default function SignIn() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <CsrfTokenProvider>
        <LoginUserProvider>
          <LoginPanel />
        </LoginUserProvider>
      </CsrfTokenProvider>
    </div>
  );
}
