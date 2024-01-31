"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Book } from "../components/Book";
import classNames from "classnames";

export function BooksSection() {
  const [width, setWidth] = useState({
    containerlWidth: 0,
    containerScrollWidth: 0,
  });

  const [animation, setAnimation] = useState(false);

  const [products, setProducts] = useState([]);

  const bookContainerRef = useRef(null);
  const targetRef = useRef(null);

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

      if (width.containerlWidth >= width.containerScrollWidth) {
        setAnimation(false);
      } else {
        setAnimation(true);
      }
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => window.removeEventListener("resize", updateWidth);
  }, [products]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, width.containerlWidth - width.containerScrollWidth + 32],
  );

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products, status: ", res.status);
        }
      } catch (error) {
        console.error("Problem with fetching products: ", error);
      }
    };

    getProducts();
  }, []);

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
          className="-ml-8 flex h-full"
        >
          {products.map((product) => {
            return (
              <Book
                key={product.id}
                src={product.book_image}
                slug={product.slug}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
