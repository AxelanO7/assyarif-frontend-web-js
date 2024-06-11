import { OutletProps } from "./user";

export interface StuffInProps {
  id: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface StuffOutProps {
  id: number;
  name: string;
  type: string;
  quantity: number;
  total: number;
  price: number;
  unit: string;
}

export interface StockProps {
  id: number;
  name: string;
  type: string;
  quantity: number;
  total: number;
  price: number;
  unit: string;
}

export interface OrderProps {
  id: number;
  outlet_id: number;
  outlet: OutletProps;
  stock_id: number;
  stock: StockProps;
  date_order: string;
  total_paid: number;
  total_order: number;
  status: number;
}
