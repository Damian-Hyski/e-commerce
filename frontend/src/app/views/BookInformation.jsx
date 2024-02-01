"use client";
import Image from "next/image";
import Star from "/public/Star.svg";
import { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext";

export function BookInformation({ bookTitle }) {
  const [data, setData] = useState({});
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/products/${bookTitle}`,
        );
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error("Nie udało się pobrać danych produktu");
        }
      } catch (error) {
        console.error("Błąd sieci: ", error);
      }
    };

    fetchBookInfo();
  }, [bookTitle]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newCartItem = {
      id: data.id,
      slug: data.slug,
      title: data.title,
      price: data.current_price,
      image: data.book_image,
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
          <div className="w-full">
            {data.book_image && (
              <Image
                src={`http://127.0.0.1:8000/${data.book_image}`}
                alt="Book Cover"
                className="-ml-10 -mt-6 min-h-[90%] w-auto"
                width={500}
                height={710}
                style={{width: "auto", height: "710px"}}
                priority
              />
            )}
          </div>
          <div className="flex w-full flex-col justify-between uppercase leading-4 text-light">
            <div className="flex w-full flex-col gap-3 uppercase leading-4 text-light">
              <div className="flex gap-3">
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
                <Image src={Star} alt="star" />
              </div>
              <div className="text-4xl font-black">
                <h2>{data.title}</h2>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Autor:</p>
                <p>{data.author}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Wydawca:</p>
                <p>{data.publisher}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Rok wydania:</p>
                <p>{data.publication_date}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Strony:</p>
                <p>{data.pages}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Oprawa:</p>
                <p>{data.binding}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Data premiery:</p>
                <p>{data.release_date}</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Dostępne:</p>
                <p>{data.quantity_in_stock} sztuk</p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <p className="font-bold">Opis:</p>
                <p className="font-light">{data.description}</p>
              </div>
            </div>
            <div className="mb-16 flex w-full flex-col items-end gap-2">
              <div className="flex items-end gap-8">
                <p className="line-through">{data.old_price} zł</p>
                <p className="text-4xl leading-8">{data.current_price} zł</p>
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
