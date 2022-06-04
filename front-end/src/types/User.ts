export interface User {
  _id: string;
  username: string;
  type: 'Admin' | 'Buyer' | 'Company';
}

export interface Buyer extends User {
  ime: string;
  prezime: string;
  telefon: string;
  broj_lk: string;
}

export interface Company extends User {
  ime: string;
  prezime: string;
  telefon: string;
  email: string;
  naziv: string;
  adresa: string;
  pib: string;
  maticni_broj: string;
}
