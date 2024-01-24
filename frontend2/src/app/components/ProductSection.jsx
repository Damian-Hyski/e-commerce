"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Book } from "./Book";

export function ProductSection() {
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
        [0, width.containerlWidth - width.containerScrollWidth + 32]
    );

    return (
        <section
            ref={targetRef}
            className="h-[400vh] bg-light relative"
            id="books"
        >
            <div className="container mx-auto py-24 h-screen sticky top-0">
                <h3 className="text-4xl font-black uppercase text-dark mb-8">
                    Sed ut perspiciatis.
                </h3>
                <motion.div
                    ref={bookContainerRef}
                    style={{ x }}
                    className="flex h-full -ml-8"
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
