import Image from "next/image";
import Ellipse from "/public/Ellipse.svg";
import { RatingStars } from "./RatingStars";

export function Review({ id, user, user_name, review, rating, left }) {
  return (
    <div
      className={`relative ${left ? `w-2/3` : `flex justify-end`} after:absolute after:bottom-0 after:top-0 after:block after:w-2 after:bg-custom-gradient after:content-['']`}
    >
      <div className={`flex flex-col gap-4 ${left ? `pl-6` : `w-2/3 px-6`}`}>
        <div className={`flex gap-6 ${left ? `` : `justify-end`}`}>
          <Image src={Ellipse} className="h-12 w-12" alt="star" />
          <div className="">
            <p className="font-bold uppercase">{user_name}</p>
            <div className="flex gap-1">
              <RatingStars rating={rating} />
            </div>
          </div>
        </div>
        <div className={`${left ? `` : `flex justify-end`}`}>
          <p className="uppercase">{review}</p>
        </div>
      </div>
    </div>
  );
}
