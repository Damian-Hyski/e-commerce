import { AlertProvider } from "./contexts/AlertContext";
import { CsrfTokenProvider } from "./contexts/CsrfTokenContext";
import { LoginStatusProvider } from "./contexts/LoginStatusContext";
import { LogoutUserProvider } from "./contexts/LogoutUserContext";
import "./globals.css";
import { Footer } from "./views/Footer";
import { Navbar } from "./views/Navbar";

export const metadata = {
  title: "e-commerce",
  description: "e-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <LoginStatusProvider>
        <body className=" overflow-x-hidden">
          <AlertProvider>
            <CsrfTokenProvider>
              <LogoutUserProvider>
                <Navbar />
              </LogoutUserProvider>
              {children}
            </CsrfTokenProvider>
            <Footer />
          </AlertProvider>
        </body>
      </LoginStatusProvider>
    </html>
  );
}
