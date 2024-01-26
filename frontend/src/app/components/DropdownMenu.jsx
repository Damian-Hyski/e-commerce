import { useContext, useEffect, useRef, useState } from "react";
import PersonFill from "/public/PersonFill.svg";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";
import { CsrfContext } from "../contexts/CsrfContext";

export function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();
    const { csrfToken } = useContext(CsrfContext);
    const { logoutUser, checkLoginStatus, isLoggedIn } =
        useContext(AuthContext);

    checkLoginStatus();

    async function handleButton() {
        await logoutUser(csrfToken);
        setIsOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="uppercase flex items-center"
            >
                <Image src={PersonFill} alt="PersonFill" />
            </button>
            {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 py-2 px-4 bg-white rounded-md shadow-xl z-30 bg-light uppercase">
                    {isLoggedIn ? (
                        <>
                            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <Link href="">Twój profil</Link>
                            </li>
                            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <button
                                    className="uppercase"
                                    onClick={handleButton}
                                >
                                    Wyloguj się
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <Link
                                    href="/sign-in"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Zaloguj się
                                </Link>
                            </li>
                            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <Link
                                    href=""
                                    onClick={() => setIsOpen(false)}
                                >
                                    Zarejestruj się
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            )}
        </div>
    );
}
