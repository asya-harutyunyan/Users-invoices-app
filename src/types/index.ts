export type User = {
  UserId: string;
  Name: string;
  Password: string;
};

export type Invoice = {
  Name: string;
  PaidDate: string;
  UserId: string;
  InvoiceId: string;
};

export type InvoiceLine = {
  InvoiceId: string;
  ProductId: string;
  Quantity: number;
};

export type Product = {
  ProductId: string;
  Name: string;
  Price: number;
};
