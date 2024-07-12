import { Location, PaymentMethod } from "../types/types";

export const getPaymentMethodBasedOnLocation = (
  location: Location | null,
  paymentMethods: PaymentMethod[]
): PaymentMethod[] => {
  if (!location) return [];
  return paymentMethods.filter((method) =>
    method.countries.includes(location.country.code.toLowerCase())
  );
};
