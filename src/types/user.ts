export interface UserProps {
  id: string;
  username: string;
  password: string;
  role: string;
}

export interface EmployeeProps {
  id: string;
  name: string;
  phone: string;
  address: string;
  id_user: number;
  user: UserProps;
}

export interface OutletProps {
  id: string;
  name: string;
  phone: string;
  address: string;
  id_user: number;
  user: UserProps;
}
