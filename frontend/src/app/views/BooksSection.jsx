"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useProductsData } from "../contexts/ProductsDataContext";
import Image from "next/image";
import { API_URL } from "../helpers/config";
import classNames from "classnames";
import Link from "next/link";

export function BooksSection() {
  const bookContainerRef = useRef(null);
  const targetRef = useRef(null);

  const { productsData } = useProductsData();
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [animation, setAnimation] = useState(false);
  const [width, setWidth] = useState({
    containerlWidth: 0,
    containerScrollWidth: 0,
  });

  useEffect(() => {
    const updateWidth = () => {
      setWidth({
        containerlWidth: bookContainerRef.current
          ? bookContainerRef.current.clientWidth
          : 0,
        containerScrollWidth: bookContainerRef.current
          ? bookContainerRef.current.scrollWidth
          : 0,
      });
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => window.removeEventListener("resize", updateWidth);
  }, [productsData, bookContainerRef.current, targetRef.current]);

  useEffect(() => {
    if (width.containerlWidth >= width.containerScrollWidth) {
      setAnimation(false);
    } else {
      setAnimation(true);
    }
  }, [width]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, width.containerlWidth - width.containerScrollWidth],
  );

  const dynamicClass = classNames({
    "relative bg-light": true,
    "h-[300vh]": animation === true,
    "h-[100vh]": animation === false,
  });

  return (
    <section ref={targetRef} className={dynamicClass} id="books">
      <div className="container sticky top-0 mx-auto h-screen py-24">
        <h3 className="mb-8 text-4xl font-black uppercase text-dark">
          Sed ut perspiciatis.
        </h3>
        <motion.div
        
          ref={bookContainerRef}
          style={animation ? { x } : {}}
          className="flex h-full"
        >
            {productsData.map((product) => {
              return (
                <div
                  key={product.id}
                  className="h-auto w-[450px] min-w-[450px] -ml-8"
                >
                  <Link href={`/book/${product.slug}/`}>
                    <Image
                      src={`${API_URL}${product.book_image}`}
                      width={1000}
                      height={1000}
                      alt="book cover"
                      priority
                    />
                  </Link>
                </div>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
}
