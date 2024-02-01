import Image from "next/image";
import StarFill from "/public/StarFill.svg";
import Star from "/public/Star.svg";

export function RatingStars ({ rating }) {
  const totalStars = 5;

  const stars = [...Array(totalStars)].map((star, index) => {
    if (index < rating) {
      return (
        <Image key={index} src={StarFill} className="h-6 w-6" alt="star" />
      );
    } else {
      return <Image key={index} src={Star} className="h-6 w-6" alt="star" />;
    }
  });

  return stars;
};
