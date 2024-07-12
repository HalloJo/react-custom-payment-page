import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.scss";
import { CheckoutPageContent } from "../../data/Content";
import { PaymentMethod, Location } from "../../types/types";
import expertsLogo from "../../assets/logo.svg";
import shield from "../../assets/shield.svg";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import CustomRadioButton from "../../components/CustomRadioButton/CustomRadioButton";
import { getPaymentMethodBasedOnLocation } from "../../utils/get-payment-method-on-location";
import { usePaymentMethods } from "../../hooks/usePaymentMethods";

const Checkout = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const {
    selectedMethod,
    showContinueButton,
    selectedIssuer,
    isOpen,
    handleMethodSelection,
    handleSelectedIssuer,
    toggleDropdown,
    selectedPaymentMethod,
  } = usePaymentMethods(paymentMethods);

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

  const availablePaymentMethods = location
    ? getPaymentMethodBasedOnLocation(location, paymentMethods)
    : [];

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
                <CustomRadioButton
                  method={method}
                  selectedMethod={selectedMethod}
                  handleMethodSelection={handleMethodSelection}
                />
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
