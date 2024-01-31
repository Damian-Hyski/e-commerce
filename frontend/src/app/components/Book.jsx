import Image from "next/image";
import Link from "next/link";

export function Book({ src, slug }) {
  return (
    <div className="min-w-fit">
      <Link href={`/book/${slug}`}>
        <Image
          src={`http://127.0.0.1:8000${src}`}
          alt="Book Cover"
          className="product-image"
          width={439}
          height={623}
          priority
        />
      </Link>
    </div>
  );
}
