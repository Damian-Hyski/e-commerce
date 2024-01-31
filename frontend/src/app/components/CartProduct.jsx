import Image from "next/image";
import Link from "next/link";

export function CartProduct({ slug, image, title, quantity, price }) {
  return (
    <div className="flex w-full justify-between rounded-lg bg-light px-6 py-4 text-dark">
      <div className="flex gap-4">
        <div>
          <Link href={`/book/${slug}`}>
            <Image
              src={`http://127.0.0.1:8000/${image}`}
              width={100}
              height={96}
              className="h-24 w-auto"
            />
          </Link>
        </div>
        <div className="flex h-full flex-col justify-between font-medium">
          <Link href={`/book/${slug}`}>{title}</Link>
          <p className="lowercase">{quantity}x</p>
        </div>
      </div>
      <div className="flex h-full items-center text-3xl font-black">
        <p>{price} zł</p>
      </div>
    </div>
  );
}
