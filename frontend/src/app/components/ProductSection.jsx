"use client";
import Image from "next/image";
import BookCover from "/public/BookCover.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      x: () => `-${6 * bookWidth - containerWidth}px`,
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
      <div className="container mx-auto flex h-screen flex-col gap-8 pt-32 pb-8">
        <h3 className="text-4xl font-black uppercase text-dark">
          Sed ut perspiciatis.
        </h3>
        <div ref={bookContainerRef} className="-ml-8 flex flex-1 gap-2">
          <Image
            ref={bookRef}
            src={BookCover}
            alt="Book Cover"
            className="size-full"
          />
          <Image src={BookCover} alt="Book Cover" className="size-full" />
          <Image src={BookCover} alt="Book Cover" className="size-full" />
          <Image src={BookCover} alt="Book Cover" className="size-full" />
          <Image src={BookCover} alt="Book Cover" className="size-full" />
          <Image src={BookCover} alt="Book Cover" className="size-full" />
        </div>
      </div>
    </div>
  );
}
