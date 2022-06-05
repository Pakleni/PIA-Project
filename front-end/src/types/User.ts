export interface BaseUser {
  _id: string;
  username: string;
  type: 'Admin' | 'Buyer' | 'Company';
}

export interface Buyer extends BaseUser {
  ime: string;
  prezime: string;
  telefon: string;
  broj_lk: string;
}

export interface Company extends BaseUser {
  ime: string;
  prezime: string;
  telefon: string;
  email: string;
  naziv: string;
  adresa: string;
  pib: string;
  maticni_broj: string;
  kategorija: string;
  sifra_delatnosti: number[];
  pdv: boolean;
  racuni: {
    broj: string;
    banka: string;
  }[];
  magacini: {
    id: string;
    naziv: string;
  }[];
  kase: {
    lokacija: string;
    tip: string;
  }[];
}

export type User = BaseUser & Buyer & Company;
