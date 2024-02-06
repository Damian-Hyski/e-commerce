"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext";
import { useProductsData } from "../contexts/ProductsDataContext";
import { API_URL } from "../helpers/config";
import { RatingStars } from "../components/RatingStars";

export function BookInformation({ slug }) {
  const { showAlert } = useAlert();
  const { selectProduct, productData } = useProductsData();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    selectProduct({ slug });
  }, [selectProduct]);

  useEffect(() => {
    if (productData && Array.isArray(productData.reviews)) {
      const totalRating = productData.reviews.reduce(
        (acc, review) => acc + review.rating,
        0,
      );
      const average = totalRating / productData.reviews.length;
      setAverageRating(average);
    }
  }, [productData]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newCartItem = {
      id: productData.id,
      slug: productData.slug,
      title: productData.title,
      price: productData.current_price,
      image: productData.book_image,
      quantity: 1,
    };

    const existingItem = cart.find((item) => item.id === newCartItem.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(newCartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showAlert("Dodano produkt do koszyka", "success");
  };

  return (
    <div className="flex h-screen w-full items-center bg-custom-gradient p-3 pb-8 pt-32">
      <div className="container mx-auto">
        <div className="flex w-full">
          <div className="h-auto w-auto">
            {productData.book_image && (
              <Image
                src={API_URL + productData.book_image}
                alt="Book Cover"
                className="-ml-10 -mt-6"
                width={1000}
                height={1000}
                priority
              />
            )}
          </div>
          <div className="flex w-full flex-col justify-between uppercase leading-4 text-light">
            <div className="flex w-full flex-col gap-3 uppercase leading-4 text-light">
              <div className="flex gap-3">
                <RatingStars rating={averageRating} />
              </div>
              <div className="text-4xl font-black">
                <h2>{productData.title}</h2>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Autor:</p>
                <p>{productData.author}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Wydawca:</p>
                <p>{productData.publisher}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Rok wydania:</p>
                <p>{productData.publication_date}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Strony:</p>
                <p>{productData.pages}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Oprawa:</p>
                <p>{productData.binding}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Data premiery:</p>
                <p>{productData.release_date}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Dostępne:</p>
                <p>{productData.quantity_in_stock} sztuk</p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <p className="font-bold">Opis:</p>
                <p className="font-light">{productData.description}</p>
              </div>
            </div>
            <div className="mb-16 flex w-full flex-col items-end gap-2">
              <div className="flex items-end gap-8">
                <p className="line-through">{productData.old_price} zł</p>
                <p className="text-4xl leading-8">
                  {productData.current_price} zł
                </p>
              </div>
              <div className="">
                <button
                  className="w-[325px] rounded-3xl border-2 px-8 py-4"
                  onClick={addToCart}
                >
                  Dodaj do koszyka
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
