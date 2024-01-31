"use client";

import Image from "next/image";
import Link from "next/link";
import DashCircleFill from "/public/DashCircleFill.svg";
import PlusCircleFill from "/public/PlusCircleFill.svg";
import TrashFill from "/public/TrashFill.svg";
import { useAlert } from "../contexts/AlertContext";

export function CartProduct({ id, slug, image, title, quantity, price, updateCart }) {
  const { showAlert } = useAlert();

  const incrementQuantity = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = cart.find((item) => item.id === productId);

    if (cartItem) {
      cartItem.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      showAlert("Zwiększono ilość produktu w koszyku", "success");
      updateCart();
    } else {
      showAlert("Produkt nie znaleziony w koszyku", "error");
    }
  };

  const decrementQuantity = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemIndex = cart.findIndex((item) => item.id === productId);

    if (cartItemIndex !== -1) {
      const cartItem = cart[cartItemIndex];

      if (cartItem.quantity > 1) {
        cart[cartItemIndex].quantity -= 1;
      } else {
        cart.splice(cartItemIndex, 1);
        showAlert("Usunięto produkt z koszyka", "warning");
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      showAlert("Zmniejszono ilość produktu w koszyku", "success");
      updateCart();
    } else {
      showAlert("Produkt nie znaleziony w koszyku", "error");
    }
  };

  const deleteProduct = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemIndex = cart.findIndex((item) => item.id === productId);

    if (cartItemIndex !== -1) {
      cart.splice(cartItemIndex, 1);
      showAlert("Usunięto produkt z koszyka", "warning");

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    } else {
      showAlert("Produkt nie znaleziony w koszyku", "error");
    }
  };

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
              alt={`cover - ${title}`}
              style={{ width: "75px", height: "auto" }}
              priority
            />
          </Link>
        </div>
        <div className="flex h-full flex-col justify-between pb-3 font-medium">
          <Link href={`/book/${slug}`}>{title}</Link>
          <div className="item-center flex gap-4">
            <button
              onClick={() => {
                deleteProduct(id);
              }}
            >
              <Image src={TrashFill} alt="TrashFill" />
            </button>
            <button onClick={() => decrementQuantity(id)}>
              <Image src={DashCircleFill} alt="-" />
            </button>
            <p className="lowercase">{quantity}x</p>
            <button onClick={() => incrementQuantity(id)}>
              <Image src={PlusCircleFill} alt="+" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-full items-center gap-4 text-3xl font-black">
        <p>{price * quantity} zł</p>
      </div>
    </div>
  );
}
