import { IArtikal } from '../types/Article';
import { getBaseUrl } from './utils';

export const getArticles = async (_id?: string): Promise<IArtikal[]> => {
  const response = await fetch(
    getBaseUrl() + (_id ? `/artikal/?_id=${_id}` : '/artikal/'),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

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
    slicica: File;
  }
): Promise<void> => {
  const formData = new FormData();
  formData.append('_id', _id);
  formData.append('data', JSON.stringify({ ...data, slicica: '' }));
  formData.append('slicica', data.slicica);

  const response = await fetch(getBaseUrl() + `/artikal`, {
    method: 'POST',
    body: formData
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
    slicica: File;
  }
): Promise<void> => {
  const formData = new FormData();
  formData.append('_id', _id);
  formData.append('user', user);
  formData.append('data', JSON.stringify({ ...data, slicica: '' }));
  data.slicica && formData.append('slicica', data.slicica);

  const response = await fetch(getBaseUrl() + `/artikal`, {
    method: 'PUT',
    body: formData
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
