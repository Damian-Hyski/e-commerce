"use client";

import { useEffect, useState } from "react";
import { CartValue } from "../components/CartValue";
import { CheckoutForm } from "../components/CheckoutForm";
import { useUserData } from "../contexts/UserDataContext";
import { useRouter } from "next/navigation";

export function CheckoutSection() {
  const [cartItems, setCartItems] = useState([]);
  const { userStatus } = useUserData();

  const router = useRouter();

  useEffect(() => {
    if (!userStatus) {
      router.push("/");
    }
  }, [userStatus]);

  const [userData, setUserData] = useState({
    address: {
      name: "",
      email: "",
      address: "",
      city: "",
      zip_code: "",
    },
    delivery_method: "",
    payment_method: "",
    cart: [],
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);

    setUserData((prevUserData) => ({
      ...prevUserData,
      cart: cart,
    }));
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen w-full bg-custom-gradient py-24">
      <div className="container mx-auto">
        <div className="flex flex-col uppercase text-light">
          <h2 className="text-3xl font-black">Zrealizuj zamówienie</h2>
          <div className="mt-16 flex gap-4">
            <div className="flex w-3/5">
              <div className="flex w-full flex-col gap-4">
                <CheckoutForm setUserData={setUserData} />
              </div>
            </div>
            <div className="h-max w-2/5">
              <CartValue
                totalPrice={totalPrice}
                checkput={true}
                userData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
