import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { getArticles } from '../../../api/articles';
import InputField from '../../../components/form-comps/InputField';
import SelectField from '../../../components/form-comps/SelectField';
import { IArtikal } from '../../../types/Article';
import { User } from '../../../types/User';

// naziv_artikla: string;
// magacin_id: string;

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

  const { values } = useFormikContext<{ selected_article: string }>();

  const selected_article = articles.find(
    (x) => x.naziv === values['selected_article']
  );

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
    </>
  );
};

export default Items;
