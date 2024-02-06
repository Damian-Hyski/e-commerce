"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../helpers/config";

const ProductsDataContext = createContext();

export const ProductsDataProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [productData, setProductData] = useState({});

  const fetchProductsData = async () => {
    try {
      const res = await fetch(`${API_URL}/products/`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setProductsData(data);
      }
    } catch (error) {
      console.error("Błąd sieci: ", error);
    }
  };

  const updateProductsData = async () => {
    fetchProductsData();
  };

  function selectProduct({ slug }) {
    const findProduct = productsData.find((test) => test.slug === slug);
    if (findProduct) {
      setProductData(findProduct);
    }
  }

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <ProductsDataContext.Provider
      value={{
        productsData,
        updateProductsData,
        selectProduct,
        productData,
      }}
    >
      {children}
    </ProductsDataContext.Provider>
  );
};

export const useProductsData = () => {
  return useContext(ProductsDataContext);
};
