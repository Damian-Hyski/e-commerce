"use client";

import { createContext, useContext, useState } from "react";

const PaymentProcessedContext = createContext();

export const PaymentProcessedProvider = ({ children }) => {
  const [paymentProcessed, setPaymentProcessed] = useState(undefined);

  return (
    <PaymentProcessedContext.Provider
      value={{ paymentProcessed, setPaymentProcessed }}
    >
      {children}
    </PaymentProcessedContext.Provider>
  );
};

export const usePaymentProcessed = () => {
  return useContext(PaymentProcessedContext);
};
