import Image from "next/image";
import HeroBooks from "/public/HeroBooks.png";
import Link from "next/link";

export function Hero() {
  return (
    <div className="h-screen w-full overflow-hidden bg-custom-gradient">
      <div className="container mx-auto flex gap-24 py-24">
        <div className="flex w-[70%] flex-col gap-8 text-4xl font-black uppercase leading-9 text-light">
          <h1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </h1>
          <Link href="/">
            <div className="rounded-3xl border-2 py-2 text-center text-2xl font-medium">
              Ut enim ad minima
            </div>
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
