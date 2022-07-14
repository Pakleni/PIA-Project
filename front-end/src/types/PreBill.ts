import { BillItem } from './Bill';

export interface IPredracun {
  firma: string;
  stavke: BillItem[];
  odeljenje?: string;
  sto?: string;
}
