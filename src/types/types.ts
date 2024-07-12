export type Location = {
  country: {
    code: string;
  };
};

export type PaymentMethod = {
  id: string;
  description: string;
  popular?: boolean;
  countries: string[];
  image: string;
  issuers: Issuer[];
};

export type Issuer = {
  id: string;
  name: string;
  resource: string;
  image: string;
};

export type Language = {
  emoji: string;
  title: string;
};

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

export type CheckoutPageProps = {
  title: string;
  subTitle: string;
  callToAction: string;
  popular: string;
  message: string;
};

export type CompletionPageProps = {
  title: string;
  subTitle: string;
  callToAction: string;
};

export type Method = {
  id: string;
  popular?: boolean;
  name?: string;
};
