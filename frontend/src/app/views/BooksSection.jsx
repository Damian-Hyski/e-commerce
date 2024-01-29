"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Book } from "../components/Book";

export function BooksSection() {
  const [width, setWidth] = useState({
    containerlWidth: 0,
    containerScrollWidth: 0,
  });

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
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, width.containerlWidth - width.containerScrollWidth + 32],
  );

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-light" id="books">
      <div className="container sticky top-0 mx-auto h-screen py-24">
        <h3 className="mb-8 text-4xl font-black uppercase text-dark">
          Sed ut perspiciatis.
        </h3>
        <motion.div
          ref={bookContainerRef}
          style={{ x }}
          className="-ml-8 flex h-full"
        >
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
        </motion.div>
      </div>
    </section>
  );
}
