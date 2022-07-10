import { INarucioc } from '../types/Beneficiary';
import { getBaseUrl } from './utils';

export const get_all_beneficiaries = async (): Promise<INarucioc[]> => {
  const response = await fetch(getBaseUrl() + `/narucioc/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const body = await response.json();
    return body as INarucioc[];
  } else {
    throw await response.text();
  }
};

export const get_beneficiaries = async (user: string): Promise<INarucioc[]> => {
  const response = await fetch(getBaseUrl() + `/narucioc?user=${user}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const body = await response.json();
    return body as INarucioc[];
  } else {
    throw await response.text();
  }
};

export const add_beneficiary = async (
  _id: string,
  data: INarucioc
): Promise<void> => {
  const response = await fetch(getBaseUrl() + `/narucioc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: _id,
      data
    })
  });
  if (!response.ok) {
    throw await response.text();
  }
};
