import { AlertProvider } from "./contexts/AlertContext";
import { CsrfTokenProvider } from "./contexts/CsrfTokenContext";
import { LogoutUserProvider } from "./contexts/LogoutUserContext";
import { PaymentProcessedProvider } from "./contexts/PaymentContext";
import { ProductsDataProvider } from "./contexts/ProductsDataContext";
import { UserDataProvider } from "./contexts/UserDataContext";
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
      <body className=" overflow-x-hidden">
        <UserDataProvider>
          <AlertProvider>
            <CsrfTokenProvider>
              <LogoutUserProvider>
                <Navbar />
              </LogoutUserProvider>
              <ProductsDataProvider>
                <PaymentProcessedProvider>{children}</PaymentProcessedProvider>
              </ProductsDataProvider>
            </CsrfTokenProvider>
            <Footer />
          </AlertProvider>
        </UserDataProvider>
      </body>
    </html>
  );
}
