import { IRequest } from '../types/Request';
import { getBaseUrl } from './utils';

export const getRequests = async (): Promise<IRequest[]> => {
  const user = localStorage.getItem('user');

  if (!user) throw 'Not logged';

  const { username, password } = JSON.parse(user);

  const response = await fetch(
    getBaseUrl() + `/zahtev?username=${username}&password=${password}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (response.ok) {
    const body = await response.json();
    return body as IRequest[];
  } else {
    throw await response.text();
  }
};

export const RequestRespond = async (
  _id: string,
  status: boolean
): Promise<void> => {
  const user = localStorage.getItem('user');

  if (!user) throw 'Not logged';

  const { username, password } = JSON.parse(user);

  const response = await fetch(getBaseUrl() + `/zahtev`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id,
      username,
      password,
      status
    })
  });
  if (!response.ok) {
    throw await response.text();
  }
};
