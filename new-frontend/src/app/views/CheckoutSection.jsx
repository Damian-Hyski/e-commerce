import { CartValue } from "../components/CartValue";
import { CheckoutForm } from "../components/CheckoutForm";


export function CheckoutSection() {
    return (
        <div className="w-full min-h-screen bg-custom-gradient py-24">
            <div className="container mx-auto">
                <div className="flex flex-col uppercase text-light">
                    <h2 className="text-3xl font-black">Zrealizuj zamówienie</h2>
                    <div className="flex mt-16 gap-4">
                        <div className="flex w-3/5">
                            <div className="flex flex-col w-full gap-4">
                                <CheckoutForm />
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
