import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { CsrfProvider } from "./contexts/CsrfContext";
import "./globals.css";

export const metadata = {
    title: "E-Commerce",
    description: "next E-Commerce",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
            <body>
                <Header />
                <AuthProvider>
                    <CsrfProvider>{children}</CsrfProvider>
                </AuthProvider>
                <Footer />
            </body>
        </html>
    );
}
