import { Poppins } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { CsrfProvider } from "./contexts/CsrfContext";
import { AuthProvider } from "./contexts/AuthContext";
import { cookies } from "next/headers";

const poppins = Poppins({
    style: ["normal"],
    subsets: ["latin"],
    weight: ["300", "500", "700", "900"],
});

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

async function getData() {
    const cookieStore = cookies();
    const sessionId = cookieStore.get("sessionid");

    const res = await fetch("http://127.0.0.1:8000/auth/status", {
        method: "GET",
        headers: {
            Cookie: sessionId ? `sessionid=${sessionId.value}` : "",
        },
    });

    return res.json();
}

export default async function RootLayout({ children }) {
    const { is_logged_in } = await getData();
    return (
        <html lang="pl">
            <body className="overflow-x-hidden">
                <AuthProvider status={is_logged_in}>
                    <CsrfProvider>
                        <Navigation />
                        {children}
                        <Footer />
                    </CsrfProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
