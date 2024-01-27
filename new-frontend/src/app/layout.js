import { LoginStatusProvider } from "./contexts/LoginStatusContext";
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
          <Navbar />
          {children}
      </body>
        </LoginStatusProvider>
    </html>
  );
}
