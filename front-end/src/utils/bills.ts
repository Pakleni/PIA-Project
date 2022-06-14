import { Bill, BillItem } from '../types/Bill';

export const single_price = (x: BillItem): number => {
  return (x.kolicina * x.prodajna_cena * (100 + parseInt(x.porez))) / 100;
};

export const get_price = (x: Bill): number => {
  return x.stavke.reduce((a, x) => a + single_price(x), 0);
};
