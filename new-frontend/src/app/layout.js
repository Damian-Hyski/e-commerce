import { CsrfTokenProvider } from "./contexts/CsrfTokenContext";
import { LoginStatusProvider } from "./contexts/LoginStatusContext";
import { LogoutUserProvider } from "./contexts/LogoutUserContext";
import "./globals.css";
import { Navbar } from "./views/Navbar";

export const metadata = {
  title: "e-commerce",
  description: "e-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <LoginStatusProvider>
        <body>
          <CsrfTokenProvider>
            <LogoutUserProvider>
              <Navbar />
            </LogoutUserProvider>
          </CsrfTokenProvider>
          {children}
        </body>
      </LoginStatusProvider>
    </html>
  );
}
