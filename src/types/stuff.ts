import { OutletProps } from "./user";

export interface StuffProps {
  id: number;
  id_stuff: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface OutProps {
  id: number;
  out_id: number;
  outlet_id: number;
  outlet: OutletProps;
  stock_id: number;
  stock: StuffProps;
  total_paid: number;
  total_order: number;
  return_cash: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface OrderProps {
  id: number;
  outlet_id: number;
  outlet: OutletProps;
  stock_id: number;
  stock: StuffProps;
  total_paid: number;
  total_order: number;
  status: number;
}
