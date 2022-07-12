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
  drzava: string;
  grad: string;
  postanski_broj: string;
  ulica_broj: string;
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
  grb: string;
  odeljenja: {
    naziv: string;
    stolovi: {
      id: string;
      okrugao: boolean;
      vis: string;
      sir: string;
      x: string;
      y: string;
    }[];
  }[];
}

export interface CompanyDataExternal {
  _id: string;
  naziv: string;
  magacini: {
    id: string;
    naziv: string;
  }[];
  pib: string;
  grb: string;
}

export type User = BaseUser & Buyer & Company;
