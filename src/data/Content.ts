export type PaymentProps = {
  warning: string;
  title: string;
  subTitle: string;
  callToAction: string;
  table: {
    receipt: string;
    receiptNumber: string;
    receiptCallToAction: string;
    paymentSpecifications: PaymentSpecification[];
    total: string;
  };
};

export type PaymentSpecification = {
  title: string;
  amount: number;
  description: string;
};

export const PaymentPageContent: PaymentProps = {
  warning: "Vermijd extra kosten. Betaal uw openstaande factuur direct!",
  title: "Te betalen bedrag",
  subTitle: "Hieronder ziet u de factuurgegevens",
  callToAction: "Betaal nu",
  table: {
    receipt: "Factuurnummer:",
    receiptNumber: "#9c6111",
    receiptCallToAction: "Downloaden",
    paymentSpecifications: [
      {
        title: "Opzegbrief Basic Fit",
        amount: 30,
        description: "Standaard prijs voor het opstellen van een opzegbrief",
      },
      {
        title: "Betalingsherinnering",
        amount: 15,
        description:
          "Aanmaning voor het niet op tijd betalen van de opzegbrief",
      },
    ],
    total: "Totaal",
  },
};

export const CheckoutPageContent = {
  title: "Betaalmethoden",
  subTitle: "Kies een betaalmethode die het beste bij u past.",
  callToAction: "Betalen",
  popular: "Populair",
  message:
    "Wij houden ons volledig aan de databeveiligingsnormen van de betalingskaartindustrie.",
};
