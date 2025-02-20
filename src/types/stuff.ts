import { OutletProps } from "./user";

export interface Stuff {
  id: number;
  id_stuff: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  price: number;
  id_out?: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface Out {
  id: number;
  out_id: number;
  order_id: number;
  order: Order;
  total_paided: number;
  return_cash: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface Order {
  id: number;
  outlet_id: number;
  outlet: OutletProps;
  stock_id: number;
  stock: Stuff;
  total_paid: number;
  total_order: number;
  status: number;
}

export interface Retur {
  id: number;
  outlet_id: number;
  outlet: OutletProps;
  stock_id: number;
  stock: Stuff;
  total_return: number;
  reason: string;
  proof: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface Opname {
  id: number;
  id_opname: string;
  name: string;
  start_date: string;
  end_date: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface StockRep {
  id: number;
  id_stuff: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  price: number;
  id_out?: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  initial_stock: number;
  final_stock: number;
  in_stock: number;
  out_stock: number;
}

export interface PeriodOut {
  date: string;
  outs: Out[];
}

export interface PeriodIn {
  date: string;
  ins: Stuff[];
}

export interface ResOpname {
  in?: Stuff[];
  out?: Out[];
  rtr?: Retur[];
}
export interface PeriodStock {
  date: string;
  stocks: StockRep[];
}

export interface PeriodRetur {
  date: string;
  rtrs: Retur[];
}

export interface PeriodOpname {
  date: string;
  opnames: Opname[];
}
