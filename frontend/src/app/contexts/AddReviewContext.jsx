"use client";

import { createContext, useContext } from "react";
import { API_URL } from "../helpers/config";

const AddReviewContext = createContext();

export const AddReviewProvider = ({ children }) => {
  const addReview = async (slug, csrfToken, rating, review, product, user) => {
    try {
      const response = await fetch(`${API_URL}/products/${slug}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ rating, review, product, user }),
      });

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
