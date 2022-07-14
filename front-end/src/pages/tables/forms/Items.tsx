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
import InputTextField from '../../../components/form-comps/InputTextField';
import SelectField from '../../../components/form-comps/SelectField';
import { IArtikal } from '../../../types/Article';
import { Bill, BillItem } from '../../../types/Bill';
import { User } from '../../../types/User';
import CloseIcon from '@mui/icons-material/Close';
import { get_price, single_price } from '../../../utils/bills';

interface ItemsProps {
  user: User;
  zauzet: boolean;
}

const Items: React.FC<ItemsProps> = ({ user, zauzet }) => {
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
    } & Bill &
      BillItem
  >();

  const selected_article = articles.find(
    (x) => x.sifra === values['selected_article']
  );

  const selected_mag = user.magacini.find((x) => x.id === values.magacin_id);

  useEffect(() => {
    if (selected_mag && selected_article) {
      const cena_stanje = selected_article.cene_stanje.find(
        (x) => x.magacin_id === selected_mag.id
      );

      if (cena_stanje) {
        setFieldValue('sifra', selected_article.sifra);
        setFieldValue('naziv_artikla', selected_article.naziv);
        setFieldValue('prodajna_cena', cena_stanje.prodajna_cena);
        setFieldValue('porez', selected_article.stopa);
      }
    }
  }, [selected_mag, selected_article]);

  useEffect(() => {
    setFieldValue('stavke', []);
  }, [selected_mag]);

  const onClick = () => {
    const {
      sifra,
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
        sifra,
        naziv_artikla,
        magacin_id,
        kolicina,
        prodajna_cena,
        porez
      }
    ]);
    setFieldValue('naziv_artikla', '');
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
          name="magacin_id"
          label="Select Magacin"
          data={user.magacini.map((x) => ({
            label: x.naziv,
            value: x.id
          }))}
          disabled={zauzet}
        />
      </Grid>
      {selected_mag && (
        <Grid item xs={12}>
          <SelectField
            name="selected_article"
            label="Select Article"
            data={articles
              .filter((x) => !values['stavke'].find((y) => y.sifra === x.sifra))
              .map((x) => ({
                label: x.naziv,
                value: x.sifra
              }))}
          />
        </Grid>
      )}

      {selected_article && (
        <>
          <Grid item xs={12}>
            <InputTextField name="sifra" label="sifra" disabled />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              name="naziv_artikla"
              label="naziv_artikla"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextField name="kolicina" label="kolicina" />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              name="prodajna_cena"
              label="prodajna_cena"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextField name="porez" label="porez" disabled />
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
                {single_price(x).toLocaleString()} din
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
          Total Price: {get_price(values).toLocaleString()} din
        </Typography>
      </Grid>
    </>
  );
};

export default Items;
