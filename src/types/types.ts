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
