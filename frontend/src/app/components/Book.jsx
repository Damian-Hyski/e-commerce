import Image from "next/image";
import BookCover from "/public/BookCover.png";
import Link from "next/link";

export function Book({ src, title }) {
  return (
    <div className="min-w-fit">
      <Link href={`/book/${title}`}>
        <Image
          src={`http://127.0.0.1:8000${src}`}
          alt="Book Cover"
          className="product-image h-[623] w-[439]"
          width={439}
          height={623}
        />
      </Link>
    </div>
  );
}
