import { IKategorija } from '../types/Category';
import { getBaseUrl } from './utils';

export const getCategories = async (_id?: string): Promise<IKategorija[]> => {
  const response = await fetch(
    getBaseUrl() + (_id ? `/kategorije/?_id=${_id}` : '/kategorije/'),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (response.ok) {
    const body = await response.json();
    return body as IKategorija[];
  } else {
    throw await response.text();
  }
};

export const addCategory = async (
  _id: string,
  data: {
    naziv: string;
  }
): Promise<void> => {
  const response = await fetch(getBaseUrl() + `/kategorije`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id,
      naziv: data.naziv
    })
  });
  if (!response.ok) {
    throw await response.text();
  }
};

export const dodeliKategoriju = async (
  user: string,
  _id: string,
  kategorija: string
): Promise<void> => {
  const response = await fetch(getBaseUrl() + `/artikal/dodeli`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user,
      _id,
      kategorija
    })
  });
  if (!response.ok) {
    throw await response.text();
  }
};
