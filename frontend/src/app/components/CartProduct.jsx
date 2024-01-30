import Image from "next/image";
import BookCover from "/public/BookCover.png";
import Link from "next/link";

export function CartProduct() {
  return (
    <div className="flex w-full justify-between rounded-lg bg-light px-6 py-4 text-dark">
      <div className="flex gap-4">
        <div>
          <Link href="/book/book">
            <Image src={BookCover} className="h-24 w-auto" />
          </Link>
        </div>
        <div className="flex h-full flex-col justify-between font-medium">
          <Link href="/book/book">Lorem ipsum dolor sit amet consectetur.</Link>
          <p className="lowercase">1x</p>
        </div>
      </div>
      <div className="flex h-full items-center text-3xl font-black">
        <p>24.99 zł</p>
      </div>
    </div>
  );
}
