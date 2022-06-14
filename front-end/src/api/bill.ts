import { Bill } from '../types/Bill';
import { getBaseUrl } from './utils';

export const new_bill = async (_id: string, data: Bill): Promise<void> => {
  const response = await fetch(getBaseUrl() + `/racun`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id,
      data
    })
  });
  if (!response.ok) {
    throw await response.text();
  }
};

export const get_bills_id = async (broj_lk: string): Promise<Bill[]> => {
  const response = await fetch(
    getBaseUrl() + `/racun/licna?broj_lk=${broj_lk}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (response.ok) {
    const body = await response.json();
    return body as Bill[];
  } else {
    throw await response.text();
  }
};
