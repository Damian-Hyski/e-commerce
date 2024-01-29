import { CartProduct } from "../components/CartProduct";
import { CartValue } from "../components/CartValue";


export function CartSection() {
  return (
    <div className="min-h-screen w-full bg-custom-gradient py-24">
      <div className="container mx-auto">
        <div className="flex flex-col uppercase text-light">
          <h2 className="text-3xl font-black">Koszyk</h2>
          <p className="font-medium">W koszytku znajdują się 4 produkty</p>
          <div className="mt-16 flex gap-4">
            <div className="flex w-3/5">
              <div className="flex w-full flex-col gap-4">
                <CartProduct />
                <CartProduct />
                <CartProduct />
              </div>
            </div>
            <div className="h-max w-2/5">
              <CartValue />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
