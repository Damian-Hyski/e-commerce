import Image from "next/image";
import HeroBooks from "/public/HeroBooks.png"
import Link from "next/link";

export function HeroSection() {
    return (
        <div className="w-full h-screen bg-custom-gradient overflow-hidden">
            <div className="container mx-auto flex py-24 gap-24">
                <div className="text-4xl font-black leading-9 uppercase text-light w-[70%] flex flex-col gap-8">
                    <h1>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore
                    </h1>
                    <Link href="/">
                        <div className="border-2 rounded-3xl text-center font-medium text-2xl py-2">Ut enim ad minima</div>
                    </Link>
                </div>
                <div className="">
                    <Image
                        src={HeroBooks}
                        className="min-w-[150%] max-w-[150%] -translate-y-[15%]"
                        alt="Hero books"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}