export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  mobilephone: string;
  email: string;
  password: string;
  token?: string;
}
