export interface IArtikal {
  _id: string;
  user: string;
  sifra: string;
  naziv: string;
  jedinica: string;
  stopa: string;
  tip?: string;
  poreklo?: string;
  strani_naziv?: string;
  barkod?: string;
  proizvodjac?: string;
  tarifa?: string;
  eko_taksa: boolean;
  akcize: boolean;
  min_zalihe?: string;
  max_zalihe?: string;
  opis?: string;
  deklaracija?: string;
  cene_stanje: {
    magacin_id: string;
    nabavna_cena: string;
    prodajna_cena: string;
    stanje: string;
    min_zalihe: string;
    max_zalihe: string;
  }[];
  slicica: string;
}
