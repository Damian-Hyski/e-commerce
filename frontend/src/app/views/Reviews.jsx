"use client";

import { useEffect, useState } from "react";
import { Review } from "../components/Review";
import Link from "next/link";
import { useCsrfToken } from "../contexts/CsrfTokenContext";
import { useAddReview } from "../contexts/AddReviewContext";
import { useUserData } from "../contexts/UserDataContext";
import { useProductsData } from "../contexts/ProductsDataContext";

export function Reviews({ slug }) {
  const { csrfToken } = useCsrfToken();
  const { userStatus, userData } = useUserData();
  const { updateProductsData, selectProduct, productData } = useProductsData();
  const { addReview } = useAddReview();

  const [reviews, setReviews] = useState([]);
  const [ratingValue, setRatingValue] = useState(1);
  const [reviewValue, setReviewValue] = useState("");

  useEffect(() => {
    selectProduct({ slug });
    if (productData.reviews) {
      setReviews(productData.reviews);
    }
  }, [productData, slug]);

  async function handleSubmit(event) {
    event.preventDefault();
    await addReview(
      productData.slug,
      csrfToken,
      ratingValue,
      reviewValue,
      productData.id,
      userData.id,
    );
    setRatingValue(1);
    setReviewValue("");
    updateProductsData();
  }

  return (
    <div className="w-full bg-light">
      <div className="container mx-auto flex flex-col gap-8 pb-8 pt-32">
        <h3 className="mb-8 text-4xl font-black uppercase text-dark">
          Recenzje
        </h3>
        <div className="mx-auto flex w-4/5 flex-col gap-16">
          {reviews.map((review, index) => {
            const isEven = index % 2 === 0;
            return (
              <Review
                key={review.id}
                id={review.id}
                user={review.user}
                user_name={review.user_name}
                review={review.review}
                rating={review.rating}
                {...(isEven && { left: true })}
              />
            );
          })}
        </div>

        <div className="mt-8 flex w-full justify-center">
          {!userStatus ? (
            <Link
              href="/sign-in"
              className="text-md w-fit rounded-lg border border-dark px-4 py-2 uppercase text-dark"
            >
              Zaloguj się by dodać komentarz
            </Link>
          ) : (
            <div className="flex h-fit w-4/5 flex-col gap-8 rounded-3xl bg-[#fff] p-8 text-xs font-medium uppercase text-dark shadow-md">
              <h4 className="text-2xl font-bold">Napisz nam swoją opinie</h4>
              <form
                method="POST"
                className="flex flex-col gap-8"
                onSubmit={handleSubmit}
              >
                <div className="flex w-32 flex-col gap-2">
                  <label>Ocena:</label>
                  <select
                    name="rating"
                    id="rating"
                    className="h-8 rounded-lg border border-dark px-2 shadow-md"
                    value={ratingValue}
                    onChange={(e) => {
                      setRatingValue(e.target.value);
                    }}
                  >
                    <option value={1}>★☆☆☆☆</option>
                    <option value={2}>★★☆☆☆</option>
                    <option value={3}>★★★☆☆</option>
                    <option value={4}>★★★★☆</option>
                    <option value={5}>★★★★★</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label>Komentarz:</label>
                  <textarea
                    className="h-32 w-full rounded-lg border border-dark px-4 py-2 shadow-md"
                    value={reviewValue}
                    onChange={(e) => {
                      setReviewValue(e.target.value);
                    }}
                  ></textarea>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="text-md w-fit rounded-lg border border-dark px-4 py-2 uppercase text-dark"
                  >
                    Wyślij
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
