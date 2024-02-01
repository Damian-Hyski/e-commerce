"use client";

import { createContext, useContext } from "react";

const AddReviewContext = createContext();

export const AddReviewProvider = ({ children }) => {
  const addReview = async (bookTitle, csrfToken, rating, review, product, user) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${bookTitle}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({ rating, review, product, user }),
        },
      );

      if (response.ok) {
      } else {
      }
    } catch (error) {
      console.error("Błąd sieci: ", error);
      showAlert("Błąd servera", "error");
    }
  };

  return (
    <AddReviewContext.Provider value={{ addReview }}>
      {children}
    </AddReviewContext.Provider>
  );
};

export const useAddReview = () => {
  return useContext(AddReviewContext);
};
