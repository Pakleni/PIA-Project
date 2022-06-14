import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { getArticles } from '../../../api/articles';
import InputField from '../../../components/form-comps/InputField';
import SelectField from '../../../components/form-comps/SelectField';
import { IArtikal } from '../../../types/Article';
import { Bill, BillItem } from '../../../types/Bill';
import { User } from '../../../types/User';
import CloseIcon from '@mui/icons-material/Close';

interface ItemsProps {
  user: User;
}

export const price = (x: BillItem): number => {
  return (x.kolicina * x.prodajna_cena * (100 + parseInt(x.porez))) / 100;
};

const Items: React.FC<ItemsProps> = ({ user }) => {
  const [articles, SetArticles] = useState<IArtikal[]>([]);

  const Refresh = async () => {
    SetArticles(await getArticles(user._id));
  };

  useEffect(() => {
    Refresh();
  }, []);

  const { values, setFieldValue } = useFormikContext<
    {
      selected_article: string;
      selected_mag: string;
    } & Bill &
      BillItem
  >();

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
      {values.stavke.map((x, i) => (
        <Grid item xs={12} key={i}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="h6">
                {x.kolicina} x {x.naziv_artikla}
              </Typography>
              <Typography variant="body2">
                <br />
                {x.kolicina} * {x.prodajna_cena} din * (100 + {x.porez})
                <br />=
                <br />
                {price(x).toLocaleString()} din
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                onClick={() =>
                  setFieldValue('stavke', [
                    ...values.stavke.slice(0, i),
                    ...values.stavke.slice(i + 1)
                  ])
                }
              >
                <CloseIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h6">
          Total Price:{' '}
          {values.stavke.reduce((a, x) => a + price(x), 0).toLocaleString()} din
        </Typography>
      </Grid>
    </>
  );
};

export default Items;