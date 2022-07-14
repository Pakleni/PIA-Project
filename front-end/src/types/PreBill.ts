import { BillItem } from './Bill';

export interface IPredracun {
  _id: string;
  firma: string;
  stavke: BillItem[];
  sto?: string;
}
