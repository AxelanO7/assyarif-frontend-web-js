export interface StuffIn {
  id: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface StuffOut {
  id: number;
  name: string;
  type: string;
  quantity: number;
  total: number;
  price: number;
  unit: string;
}
