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
  issuers: any;
};
