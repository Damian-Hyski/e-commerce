"use client"
import Link from "next/link";
import Cart from "/public/Cart.svg";
import PersonFill from "/public/PersonFill.svg";
import Image from "next/image";
import { DropdownMenu } from "./DropdownMenu";

export function Navigation() {
    const handleScroll = (e, anchor) => {
        e.preventDefault();
        const scrollTarget = document.querySelector(anchor);
        if (scrollTarget) {
            scrollTarget.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="w-full bg-light shadow-custom-shadow fixed z-50">
            <div className="container mx-auto flex justify-between py-3 font-medium">
                <div className="w-40">
                    <Link href="/" className="uppercase">
                        Logo
                    </Link>
                </div>
                <div className="w-40 text-center">
                    <a
                        href="#books"
                        className="uppercase"
                        onClick={(e) => handleScroll(e, "#books")}
                    >
                        Książki
                    </a>
                </div>
                <div className="flex gap-8 w-40 justify-end">
                    <DropdownMenu />
                    {/* <Link href="/sign-in" className="uppercase">
                        <Image src={PersonFill} alt="PersonFill" />
                    </Link> */}
                    <Link href="/cart" className="uppercase">
                        <Image src={Cart} alt="Cart" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
