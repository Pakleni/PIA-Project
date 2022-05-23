export interface User {
  username: string;
  type: 'Admin' | 'Buyer' | 'Company';
}

export interface Buyer extends User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  idNumber: string;
}

export interface Company extends User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  name: string;
  //TODO...
}
