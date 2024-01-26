import Image from "next/image";
import BookCover from "/public/BookCover.png";

export function CartProduct() {
    return (
        <div className="flex bg-light text-dark px-6 py-4 rounded-lg w-full justify-between">
            <div className="flex gap-4">
                <div>
                    <Image src={BookCover} className="h-24 w-auto" />
                </div>
                <div className="flex flex-col h-full justify-between font-medium">
                    <h3>Lorem ipsum dolor sit amet consectetur.</h3>
                    <p className="lowercase">1x</p>
                </div>
            </div>
            <div className="text-3xl font-black h-full flex items-center">
                <p>24.99 zł</p>
            </div>
        </div>
    );
}
