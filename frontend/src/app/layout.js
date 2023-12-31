import { cookies } from "next/headers";
import { NavBar } from "./components/NavBar/NavBar";
import { AuthProvider } from "./contexts/AuthContext";
import { CsrfProvider } from "./contexts/CsrfContext";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    style: ["normal"],
    subsets: ["latin"],
    weight: ["500", "900"],
});

export const metadata = {
    title: "E-Commerce",
    description: "next E-Commerce",
};

async function getData() {
    const cookieStore = cookies();
    const sessionId = cookieStore.get("sessionid");

    const res = await fetch("http://127.0.0.1:8001/auth/status", {
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
            <body className={poppins.className}>
                <AuthProvider status={is_logged_in}>
                    <CsrfProvider>
                        <NavBar />
                        {children}
                    </CsrfProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
