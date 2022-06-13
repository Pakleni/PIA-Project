import { Button, Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { getArticles } from '../../../api/articles';
import InputField from '../../../components/form-comps/InputField';
import SelectField from '../../../components/form-comps/SelectField';
import { IArtikal } from '../../../types/Article';
import { User } from '../../../types/User';

interface ItemsProps {
  user: User;
}

const Items: React.FC<ItemsProps> = ({ user }) => {
  const [articles, SetArticles] = useState<IArtikal[]>([]);

  const Refresh = async () => {
    SetArticles(await getArticles(user._id));
  };

  useEffect(() => {
    Refresh();
  }, []);

  const { values, setFieldValue } = useFormikContext<{
    selected_article: string;
    selected_mag: string;
    naziv_artikla: string;
    magacin_id: string;
    kolicina: string;
    prodajna_cena: string;
    porez: string;
    stavke: {
      naziv_artikla: string;
      magacin_id: string;
      kolicina: number;
      prodajna_cena: number;
      porez: string;
    }[];
  }>();

  const selected_article = articles.find(
    (x) => x.naziv === values['selected_article']
  );

  const selected_mag = user.magacini.find(
    (x) => x.naziv === values['selected_mag']
  );

  useEffect(() => {
    if (selected_mag && selected_article) {
      const cena_stanje = selected_article.cene_stanje.find(
        (x) => x.magacin_id === selected_mag.id
      );

      if (cena_stanje) {
        setFieldValue('naziv_artikla', selected_article.naziv);
        setFieldValue('magacin_id', selected_mag.id);
        setFieldValue('prodajna_cena', cena_stanje.prodajna_cena);
        setFieldValue('porez', selected_article.stopa);
      }
    }
  }, [selected_mag, selected_article]);

  const onClick = () => {
    const {
      naziv_artikla,
      magacin_id,
      kolicina,
      prodajna_cena,
      porez,
      stavke
    } = values;

    setFieldValue('stavke', [
      ...stavke,
      {
        naziv_artikla,
        magacin_id,
        kolicina,
        prodajna_cena,
        porez
      }
    ]);
    setFieldValue('naziv_artikla', '');
    setFieldValue('magacin_id', '');
    setFieldValue('prodajna_cena', '');
    setFieldValue('porez', '');
    setFieldValue('kolicina', '');
    setFieldValue('selected_mag', '');
    setFieldValue('selected_article', '');
  };
  return (
    <>
      <Grid item xs={12}>
        <SelectField
          name="selected_article"
          label="Select Article"
          data={articles.map((x) => ({
            label: x.naziv,
            value: x.naziv
          }))}
        />
      </Grid>
      {selected_article && (
        <Grid item xs={12}>
          <SelectField
            name="selected_mag"
            label="Select Magacin"
            data={selected_article.cene_stanje.map((x) => ({
              label: x.magacin_id,
              value: x.magacin_id
            }))}
          />
        </Grid>
      )}
      {selected_mag && (
        <>
          <Grid item xs={12}>
            <InputField name="naziv_artikla" label="naziv_artikla" disabled />
          </Grid>
          <Grid item xs={12}>
            <InputField name="magacin_id" label="magacin_id" disabled />
          </Grid>
          <Grid item xs={12}>
            <InputField name="kolicina" label="kolicina" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="prodajna_cena" label="prodajna_cena" disabled />
          </Grid>
          <Grid item xs={12}>
            <InputField name="porez" label="porez" disabled />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={onClick}
              variant="contained"
              disabled={
                !values.naziv_artikla ||
                !values.magacin_id ||
                !values.kolicina ||
                !values.prodajna_cena ||
                !values.porez
              }
            >
              ADD ITEM
            </Button>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Typography variant="h6">Added Items:</Typography>
      </Grid>
      <Grid item xs={12}>
        {values.stavke.map((x) => (
          <>
            {x.naziv_artikla}
            {x.kolicina}
          </>
        ))}
      </Grid>
    </>
  );
};

export default Items;
