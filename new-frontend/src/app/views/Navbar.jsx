"use client";

import Link from "next/link";
import ShoppingCart from "/public/ShoppingCart.svg";
import Person from "/public/Person.svg";
import PersonFill from "/public/PersonFill.svg";
import PersonPlus from "/public/PersonPlus.svg";
import BoxArrowLeft from "/public/BoxArrowLeft.svg";
import BoxArrowRight from "/public/BoxArrowRight.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLoginStatus } from "../contexts/LoginStatusContext";

export function Navbar() {
  const { loginStatus } = useLoginStatus();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  async function handleButton() {
    // await logoutUser(csrfToken);
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
    <div className="fixed left-0 top-0 w-full bg-light text-dark shadow-xl">
      <div className="container mx-auto flex justify-between py-2 font-medium uppercase">
        <div className="flex">
          <Link href="/">Logo</Link>
        </div>
        <div className="flex gap-4">
          <Link href="">Książki</Link>
        </div>
        <div className="flex gap-4">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center uppercase"
            >
              <Image src={PersonFill} alt="Person Icon" />
            </button>
            {isOpen && (
              <ul className="absolute right-0 z-20 mt-2 w-60 bg-light px-4 py-2 font-normal shadow-xl">
                {loginStatus ? (
                  <>
                    <li className="block px-4 py-2">
                      <Link
                        className="flex items-center gap-4"
                        href=""
                        onClick={() => setIsOpen(false)}
                      >
                        <Image
                          src={Person}
                          alt="Profil Icon"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Twój profil
                      </Link>
                    </li>
                    <li className="block px-4 py-2">
                      <button
                        className="flex items-center gap-4 uppercase"
                        onClick={handleButton}
                      >
                        <Image
                          src={BoxArrowLeft}
                          alt="Logout Icon"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Wyloguj się
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="block px-4 py-2">
                      <Link
                        className="flex items-center gap-4"
                        href="/sign-in"
                        onClick={() => setIsOpen(false)}
                      >
                        <Image
                          src={BoxArrowRight}
                          alt="Login Icon"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Zaloguj się
                      </Link>
                    </li>
                    <li className="block px-4 py-2">
                      <Link
                        className="flex items-center gap-4"
                        href="/sign-up"
                        onClick={() => setIsOpen(false)}
                      >
                        <Image
                          src={PersonPlus}
                          alt="Register Icon"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Zarejestruj się
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
          <Link href="/cart">
            <Image src={ShoppingCart} alt="Cart Icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
