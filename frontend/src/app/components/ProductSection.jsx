"use client";
import Image from "next/image";
import BookCover from "/public/BookCover.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Star from "/public/Star.svg";

export function ProductSection() {
  const productSectionRef = useRef(null);
  const bookContainerRef = useRef(null);
  const bookRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: productSectionRef.current,
      start: "top top", // Rozpoczęcie gdy górna krawędź sekcji dotknie górnej krawędzi viewportu
      end: "+=100%", // Długość przewijania po "przypięciu" sekcji
      pin: true, // "Przypięcie" sekcji
      scrub: true, // Synchronizacja z ruchem skrolowania
      markers: false, // Marker do celów debugowania
    });

    const bookWidth = bookRef.current.offsetWidth;
    const containerWidth = bookContainerRef.current.offsetWidth;

    gsap.to(bookContainerRef.current, {
      x: () => `-${4 * bookWidth - containerWidth}px`,
      ease: "none",
      scrollTrigger: {
        trigger: productSectionRef.current,
        start: "center center",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={productSectionRef}
      className="container-fluid h-screen overflow-hidden bg-light"
    >
      <div className="container mx-auto flex h-screen flex-col gap-8 py-24">
        <h3 className="text-4xl font-black uppercase text-dark">
          Sed ut perspiciatis.
        </h3>
        <div ref={bookContainerRef} className="-ml-8 flex h-full gap-2">
          <div className="product-hover relative min-w-fit">
            <Image
              ref={bookRef}
              src={BookCover}
              alt="Book Cover"
              className="product-image h-full"
            />
            <div className="image-overlay absolute inset-0 p-4">
              <a href="" className="w-fit rounded-3xl border-4 border-dark px-4 py-2 text-2xl font-bold uppercase">
                Zobacz więcej
              </a>
            </div>
          </div>

          <div className="product-hover relative min-w-fit">
            <Image
              ref={bookRef}
              src={BookCover}
              alt="Book Cover"
              className="product-image h-full"
            />
            <div className="image-overlay absolute inset-0 p-4">
              <button className="w-fit rounded-3xl border-4 border-dark px-4 py-2 text-2xl font-bold uppercase">
                Zobacz więcej
              </button>
            </div>
          </div>

          <div className="product-hover relative min-w-fit">
            <Image
              ref={bookRef}
              src={BookCover}
              alt="Book Cover"
              className="product-image h-full"
            />
            <div className="image-overlay absolute inset-0 p-4">
              <button className="w-fit rounded-3xl border-4 border-dark px-4 py-2 text-2xl font-bold uppercase">
                Zobacz więcej
              </button>
            </div>
          </div>

          <div className="product-hover relative min-w-fit">
            <Image
              ref={bookRef}
              src={BookCover}
              alt="Book Cover"
              className="product-image h-full"
            />
            <div className="image-overlay absolute inset-0 p-4">
              <button className="w-fit rounded-3xl border-4 border-dark px-4 py-2 text-2xl font-bold uppercase">
                Zobacz więcej
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
