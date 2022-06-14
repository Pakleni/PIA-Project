export interface Bill {
  firma: string;
  stavke: BillItem[];
  nacin?: 'gotovina' | 'cek' | 'kartica' | 'virman';
  vrednost?: number;
  ime?: string;
  prezime?: string;
  broj_lk?: string;
  broj_slip_racuna?: string;
  narucioc?: string;
  datum: number;
}

export interface BillItem {
  naziv_artikla: string;
  magacin_id: string;
  kolicina: number;
  prodajna_cena: number;
  porez: string;
}
