import Link from "next/link";

export function CartValue({ totalPrice }) {
  return (
    <div className="rounded-lg bg-light px-6 py-4 text-dark">
      <h3 className="text-xl font-black">Wartość koszyka</h3>
      <div className="mt-8 flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <p>Wszystkie książki</p>
            <p className="lowercase">{totalPrice} zł</p>
          </div>
          <div className="flex justify-between">
            <p>Dostawa</p>
            <p className="lowercase">10 zł</p>
          </div>
        </div>
        <div className="flex justify-between border-t-2 py-2">
          <p>Razem</p>
          <p className="lowercase">{totalPrice + 10} zł</p>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Link href="/checkout" className="rounded-3xl border-2 px-4 py-2">
          Do kasy
        </Link>
      </div>
    </div>
  );
}
