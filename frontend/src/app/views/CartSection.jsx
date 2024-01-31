"use client";

import { useEffect, useState } from "react";
import { CartProduct } from "../components/CartProduct";
import { CartValue } from "../components/CartValue";

export function CartSection() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function formatProductText(quantity) {
    let text = "książek";

    if (quantity === 1) {
      text = "książka";
    } else if (quantity > 1 && quantity < 5) {
      text = "książki";
    } else if (quantity >= 5) {
      text = "książek";
    }

    return `${quantity} ${text}`;
  }

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen w-full bg-custom-gradient py-24">
      <div className="container mx-auto">
        <div className="flex flex-col uppercase text-light">
          <h2 className="text-3xl font-black">Koszyk</h2>
          <p className="font-medium">
            W koszytku znajdują się {formatProductText(totalQuantity)}
          </p>
          <div className="mt-16 flex gap-4">
            <div className="flex w-3/5">
              <div className="flex w-full flex-col gap-4">
                {cartItems.map((item) => (
                  <CartProduct
                    key={item.id}
                    slug={item.slug}
                    image={item.image}
                    title={item.title}
                    quantity={item.quantity}
                    price={item.price}
                  />
                ))}
              </div>
            </div>
            <div className="h-max w-2/5">
              <CartValue totalPrice={totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
