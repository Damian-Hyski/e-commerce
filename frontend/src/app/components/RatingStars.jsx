import Image from "next/image";
import StarFill from "/public/StarFill.svg";
import StarHalf from "/public/StarHalf.svg";
import Star from "/public/Star.svg";

export function RatingStars({ rating }) {
  const totalStars = 5;

  const stars = [...Array(totalStars)].map((_, index) => {
    const starNumber = index + 1;
    if (starNumber <= Math.floor(rating)) {
      return (
        <Image
          key={index}
          src={StarFill}
          width={24}
          height={24}
          alt="Pełna gwiazdka"
        />
      );
    } else if (starNumber - 1 < rating && starNumber > rating) {
      return (
        <Image
          key={index}
          src={StarHalf}
          width={24}
          height={24}
          alt="Pół gwiazdki"
        />
      );
    } else {
      return (
        <Image
          key={index}
          src={Star}
          width={24}
          height={24}
          alt="Pusta gwiazdka"
        />
      );
    }
  });

  return <div className="flex">{stars}</div>;
}
