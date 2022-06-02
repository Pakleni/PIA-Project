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

export const register_admin = async (
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

export const register_user = async (data: {
  username: string;
  password: string;
  ime: string;
  prezime: string;
  telefon: string;
  broj_lk: string;
}): Promise<void> => {
  const user = localStorage.getItem('user');

  if (!user) throw 'Not logged';

  const response = await fetch(getBaseUrl() + '/korisnik/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: JSON.parse(user),
      data
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

export const register_corp = async (data: {
  username: string;
  password: string;
  ime: string;
  prezime: string;
  telefon: string;
  email: string;
  naziv: string;
  adresa: string;
  pib: string;
  maticni_broj: string;
}): Promise<void> => {
  const user = localStorage.getItem('user');

  const response = await fetch(getBaseUrl() + '/korisnik/corp/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      user
        ? {
            user: JSON.parse(user),
            data
          }
        : {
            data
          }
    )
  });

  if (!response.ok) {
    const body = await response.json();
    throw body.message;
  }
};
