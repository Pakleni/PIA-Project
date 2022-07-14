import { IPredracun } from '../types/PreBill';
import { getBaseUrl } from './utils';

export const get_predracun = async (_id: string): Promise<IPredracun[]> => {
  const response = await fetch(getBaseUrl() + `/predracun/?_id=${_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const body = await response.json();
    return body as IPredracun[];
  } else {
    throw await response.text();
  }
};

export const post_predracun = async (
  _id: string, //of user
  data: IPredracun
): Promise<void> => {
  const response = await fetch(getBaseUrl() + `/predracun`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id, data })
  });
  if (!response.ok) {
    throw await response.text();
  }
};

export const put_predracun = async (
  _id: string, //of article
  data: IPredracun
): Promise<void> => {
  const response = await fetch(getBaseUrl() + `/predracun`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id, data })
  });
  if (!response.ok) {
    throw await response.text();
  }
};

export const close_predracun = async (
  _id: string,
  racun_id: string,
  data: IPredracun
): Promise<void> => {
  const response = await fetch(getBaseUrl() + `/predracun`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id, racun_id, data })
  });
  if (!response.ok) {
    throw await response.text();
  }
};
