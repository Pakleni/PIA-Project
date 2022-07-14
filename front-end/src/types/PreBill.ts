import { BillItem } from './Bill';

export interface IPredracun {
  magacin_id: string;
  _id: string;
  firma: string;
  stavke: BillItem[];
  sto?: string;
}
