import { CsrfTokenProvider } from "@/app/contexts/CsrfTokenContext";
import { RegisterUserProvider } from "@/app/contexts/RegisterUserContext";
import { RegistrationPanel } from "@/app/views/RegistrationPanel";

export default function SignUp() {
  return (
    <CsrfTokenProvider>
      <RegisterUserProvider>
        <RegistrationPanel />
      </RegisterUserProvider>
    </CsrfTokenProvider>
  );
}
