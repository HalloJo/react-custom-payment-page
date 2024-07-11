import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.scss";
import { CheckoutPageContent } from "../../data/Content";
import { PaymentMethod, Location } from "../../types/types";

const Checkout = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showContinueButton, setShowContinueButton] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://api.ipregistry.co/?key=${
            import.meta.env.VITE_IPREGISTRY_API_KEY
          }`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLocation(data.location);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch("/paymentMethods.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: PaymentMethod[] = await response.json();
        setPaymentMethods(data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const getPaymentMethodBasedOnLocation = (
    location: Location
  ): PaymentMethod[] => {
    if (!location) return [];
    console.log(
      "Filtering payment methods for country:",
      location.country.code.toLowerCase()
    );
    return paymentMethods.filter((method) =>
      method.countries.includes(location.country.code.toLowerCase())
    );
  };

  const availablePaymentMethods = location
    ? getPaymentMethodBasedOnLocation(location)
    : [];

  const handleMethodSelection = (methodId: string) => {
    setSelectedMethod(methodId);
    setShowContinueButton(true);
  };

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedMethod
  );

  return (
    <div className="checkout">
      <h1 className="checkout__title">{CheckoutPageContent.title}</h1>
      <p className="checkout__subTitle">{CheckoutPageContent.subTitle}</p>
      <ul className="checkout__list">
        {availablePaymentMethods.map((method) => (
          <div
            key={method.id}
            className={`checkout__method ${
              selectedMethod === method.id ? "selected" : ""
            }`}
          >
            <div className="checkout__method_image">
              <img src={method.image} alt={method.description} />
              <label htmlFor={method.id}>{method.description}</label>
            </div>
            <div className="checkout__radio">
              {method.popular && (
                <span className="checkout__popular">Populair!</span>
              )}
              <input
                type="radio"
                id={method.id}
                name="paymentMethod"
                checked={selectedMethod === method.id}
                onChange={() => handleMethodSelection(method.id)}
              />
            </div>
          </div>
        ))}
        {showContinueButton && selectedPaymentMethod && (
          <Link to={"/completed"} className="checkout__button">
            Betalen met{" "}
            <img
              src={selectedPaymentMethod.image}
              alt={selectedPaymentMethod.description}
            />
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Checkout;
