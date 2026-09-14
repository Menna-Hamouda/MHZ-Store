import { IcartItem } from './icart-item';

export interface IShippingInformation {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  governorate: string;
  postalCode: string;
  phone: string;
}

export interface IOrder {
  id: string;
  items: IcartItem[];
  shipping: IShippingInformation;
  subtotal: number;
  shippingCost: number;
  total: number;
  createdAt: string;
}