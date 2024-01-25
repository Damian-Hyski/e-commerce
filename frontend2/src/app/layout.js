import { Poppins } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

const poppins = Poppins({
    style: ["normal"],
    subsets: ["latin"],
    weight: ["300", "500", "700", "900"],
});

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="overflow-x-hidden">
                <Navigation />
                {children}
                <Footer />
            </body>
        </html>
    );
}