import { CartProduct } from "./CartProduct";
import { CartValue } from "./CartValue";

export function CartSection() {
    return (
        <div className="w-full min-h-screen bg-custom-gradient py-24">
            <div className="container mx-auto">
                <div className="flex flex-col uppercase text-light">
                    <h2 className="text-3xl font-black">Koszyk</h2>
                    <p className="font-medium">
                        W koszytku znajdują się 4 produkty
                    </p>
                    <div className="flex mt-16 gap-4">
                        <div className="flex w-3/5">
                            <div className="flex flex-col w-full gap-4">
                                <CartProduct />
                                <CartProduct />
                                <CartProduct />
                            </div>
                        </div>
                        <div className="w-2/5 h-max">
                            <CartValue />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
