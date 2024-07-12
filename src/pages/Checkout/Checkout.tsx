import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.scss";
import { CheckoutPageContent } from "../../data/Content";
import { PaymentMethod, Location } from "../../types/types";
import expertsLogo from "../../assets/logo.svg";
import shield from "../../assets/shield.svg";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";

const Checkout = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [selectedIssuer, setSelectedIssuer] =
    useState<string>("Selecteer bank:");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_IPREGISTRY_BASE_URL}${
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

    return paymentMethods.filter((method) =>
      method.countries.includes(location.country.code.toLowerCase())
    );
  };

  const availablePaymentMethods = location
    ? getPaymentMethodBasedOnLocation(location)
    : [];

  const handleMethodSelection = (methodId: string) => {
    setSelectedMethod(methodId);
    if (methodId !== "ideal") {
      setShowContinueButton(true);
    } else {
      setShowContinueButton(false);
    }
  };

  const handleSelectedIssuer = (issuer: string) => {
    setSelectedIssuer(issuer);
    toggleDropdown();
    if (selectedMethod === "ideal") {
      setShowContinueButton(true);
    }
  };

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedMethod
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="checkout">
      <div className="checkout__wrapper">
        <div className="checkout__header">
          <img
            src={expertsLogo}
            alt="Experts logo"
            className="checkout__logo"
          />
          <LanguageSelector />
        </div>
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
              <div className="checkout__method_item">
                <div className="checkout__method_image">
                  <img src={method.image} alt={method.description} />
                  <label htmlFor={method.id}>{method.description}</label>
                </div>
                <div className="checkout__radio">
                  {method.popular && (
                    <span className="checkout__popular">
                      {CheckoutPageContent.popular}
                    </span>
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
              {selectedMethod === method.id &&
                method.issuers &&
                method.issuers.length > 0 && (
                  <div className="checkout__issuers">
                    <div className="checkout__issuers_start">
                      <p onClick={toggleDropdown}>{selectedIssuer}</p>
                    </div>
                    {isOpen && (
                      <ul>
                        {method.issuers.map((issuer) => (
                          <li
                            key={issuer.id}
                            value={issuer.name}
                            onClick={() => handleSelectedIssuer(issuer.name)}
                          >
                            <img src={issuer.image} alt={issuer.name} />
                            <p>{issuer.name}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
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
        <div className="checkout__message">
          <img
            src={shield}
            alt="Experts logo"
            className="checkout__message_icon"
          />
          <p>{CheckoutPageContent.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
