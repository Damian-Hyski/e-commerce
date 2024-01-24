import Image from "next/image";
import BookCover from "/public/BookCover.png";
import Link from "next/link";

export function Book() {
    return (
        <div className="product-hover relative min-w-fit">
            <Image
                src={BookCover}
                alt="Book Cover"
                className="product-image h-full"
            />
            <div className="image-overlay absolute inset-0 p-4">
                <Link
                    href="/book/book"
                    className="w-fit rounded-3xl border-4 border-dark px-4 py-2 text-2xl font-bold uppercase"
                >
                    Zobacz więcej
                </Link>
            </div>
        </div>
    );
}
