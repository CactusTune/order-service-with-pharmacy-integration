export interface GenericOrderPaylooad {
  pharmacyId: string;
  product: string;
  quantity: number;
  customerInfo: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
}
