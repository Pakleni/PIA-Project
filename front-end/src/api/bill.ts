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
