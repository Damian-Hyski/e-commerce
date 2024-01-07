import Image from "next/image";
import styles from "./Hero.module.css";
import hero from "/public/hero-books.png";

export function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.frame}>
                <div className={styles.text_frame}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore
                    </p>
                    <button>Ut enim ad minima</button>
                </div>
                <div className={styles.social_frame}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                    >
                        <path
                            d="M21 10.5262C21 4.73025 16.296 0.0262451 10.5 0.0262451C4.704 0.0262451 0 4.73025 0 10.5262C0 15.6082 3.612 19.8397 8.4 20.8162V13.6762H6.3V10.5262H8.4V7.90124C8.4 5.87474 10.0485 4.22624 12.075 4.22624H14.7V7.37624H12.6C12.0225 7.37624 11.55 7.84874 11.55 8.42624V10.5262H14.7V13.6762H11.55V20.9737C16.8525 20.4487 21 15.9757 21 10.5262Z"
                            fill="#F2F2F2"
                        />
                    </svg>
                    <p>Biffco Enterprises Ltd.</p>
                </div>
            </div>

            <Image src={hero} alt="books" priority/>
        </div>
    );
}
