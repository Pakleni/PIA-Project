import { User } from '../types/User';
import { getBaseUrl } from './utils';

export const login = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await fetch(getBaseUrl() + '/korisnik/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  if (response.ok) {
    const body = await response.json();
    return body as User;
  } else {
    throw await response.text();
  }
};

export const register = async (
  username: string,
  password: string
): Promise<void> => {
  const response = await fetch(getBaseUrl() + '/korisnik/admin/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  if (!response.ok) {
    const body = await response.json();
    throw body.message;
  }
};

export const change_password = async (
  username: string,
  password: string,
  new_password: string
): Promise<void> => {
  const response = await fetch(getBaseUrl() + '/korisnik/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      new_password
    })
  });

  if (!response.ok) {
    const body = await response.json();
    throw body.message;
  }
};
