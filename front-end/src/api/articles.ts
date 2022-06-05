import { IArtikal } from '../types/Article';
import { getBaseUrl } from './utils';

export const getArticles = async (_id: string): Promise<IArtikal[]> => {
  const response = await fetch(getBaseUrl() + `/artikal/?_id=${_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const body = await response.json();
    return body as IArtikal[];
  } else {
    throw await response.text();
  }
};

export const addArticle = async (
  _id: string,
  data: {
    sifra?: string;
    naziv?: string;
    stopa?: string;
    jedinica?: string;
    tip?: string;
    poreklo?: string;
    strani_naziv?: string;
    barkod?: string;
    proizvodjac?: string;
    tarifa?: string;
    eko_taksa?: boolean;
    akcize?: boolean;
    min_zalihe?: string;
    max_zalihe?: string;
    opis?: string;
    deklaracija?: string;
    cene_stanje: {
      magacin_id: string;
      nabavna_cena: string;
      prodajna_cena: string;
      stanje: string;
      min_zalihe: string;
      max_zalihe: string;
    }[];
  }
): Promise<void> => {
  const response = await fetch(getBaseUrl() + `/artikal`, {
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

export const editArticle = async (
  user: string,
  _id: string,
  data: {
    sifra?: string;
    naziv?: string;
    jedinica?: string;
    stopa?: string;
    tip?: string;
    poreklo?: string;
    strani_naziv?: string;
    barkod?: string;
    proizvodjac?: string;
    tarifa?: string;
    eko_taksa?: boolean;
    akcize?: boolean;
    min_zalihe?: string;
    max_zalihe?: string;
    opis?: string;
    deklaracija?: string;
    cene_stanje: {
      magacin_id: string;
      nabavna_cena: string;
      prodajna_cena: string;
      stanje: string;
      min_zalihe: string;
      max_zalihe: string;
    }[];
  }
): Promise<void> => {
  const response = await fetch(getBaseUrl() + `/artikal`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user,
      _id,
      data
    })
  });
  if (!response.ok) {
    throw await response.text();
  }
};

export const deleteArticle = async (
  user: string,
  _id: string
): Promise<void> => {
  const response = await fetch(getBaseUrl() + `/artikal`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user,
      _id
    })
  });
  if (!response.ok) {
    throw await response.text();
  }
};
