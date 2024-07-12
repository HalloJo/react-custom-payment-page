import { useState } from "react";
import { PaymentMethod } from "../types/types";

export const usePaymentMethods = (paymentMethods: PaymentMethod[]) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [selectedIssuer, setSelectedIssuer] = useState<string | null>(
    "Selecteer bank:"
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleMethodSelection = (methodId: string) => {
    setSelectedMethod(methodId);
    if (methodId !== "ideal") {
      setShowContinueButton(true);
    } else {
      setShowContinueButton(false);
    }
  };

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedMethod
  );

  const handleSelectedIssuer = (issuer: string) => {
    setSelectedIssuer(issuer);
    toggleDropdown();
    if (selectedMethod === "ideal") {
      setShowContinueButton(true);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return {
    selectedMethod,
    showContinueButton,
    selectedIssuer,
    isOpen,
    handleMethodSelection,
    handleSelectedIssuer,
    toggleDropdown,
    selectedPaymentMethod,
  };
};

export default usePaymentMethods;
