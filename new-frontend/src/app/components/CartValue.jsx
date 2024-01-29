import Link from "next/link";

export function CartValue() {
    return (
        <div className="bg-light rounded-lg text-dark px-6 py-4">
            <h3 className="text-xl font-black">Wartość koszyka</h3>
            <div className="flex flex-col mt-8 gap-16">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-4">
                        <p>Wszystkie produkty</p>
                        <p className="lowercase">119 zł</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Dostawa</p>
                        <p className="lowercase">10 zł</p>
                    </div>
                </div>
                <div className="flex justify-between border-t-2 py-2">
                    <p>Razem</p>
                    <p className="lowercase">129 zł</p>
                </div>
            </div>
            <div className="flex justify-end mt-8">
                <Link href="/checkout" className="border-2 px-4 py-2 rounded-3xl">
                    Do kasy
                </Link>
            </div>
        </div>
    );
}