import MaterialTable from '@material-table/core';
import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getArticles } from '../api/articles';
import { get_corps } from '../api/user';
import { IArtikal } from '../types/Article';
import { CompanyDataExternal } from '../types/User';

const UserArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<IArtikal[]>([]);
  const [corps, setCoprs] = useState<CompanyDataExternal[]>([]);
  const [loading, setLoading] = useState(false);

  const data = articles.map((x) => {
    const myCorp = corps.find((y) => y._id === x.user);
    return {
      ...x,
      min_cena: Math.min.apply(
        null,
        x.cene_stanje.map((y) => parseFloat(y.prodajna_cena))
      ),
      cene_stanje: x.cene_stanje.map((y) => ({
        ...y,
        magacin_name: myCorp?.magacini.find((z) => z.id === y.magacin_id)?.naziv
      })),
      firma: myCorp?.naziv
    };
  });

  const Refresh = async () => {
    setLoading(true);
    setArticles(await getArticles());
    setCoprs(await get_corps());
    setLoading(false);
  };

  useEffect(() => {
    Refresh();
  }, []);

  return (
    <Container maxWidth="lg">
      <MaterialTable
        isLoading={loading}
        title="Firme"
        data={corps}
        columns={[
          {
            title: 'GRB',
            render: (rowData) => (
              <img width="50" height="50" src={rowData.grb} />
            )
          },
          { title: 'Naziv', field: 'naziv' },
          { title: 'PIB', field: 'pib' }
        ]}
        detailPanel={(rowData) => {
          return (
            <Box paddingLeft={2}>
              <MaterialTable
                title={`Artikli firme ${rowData.rowData.naziv}`}
                data={data.filter((x) => x.user === rowData.rowData._id)}
                columns={[
                  { title: 'Naziv', field: 'naziv' },
                  { title: 'Proizvodjac', field: 'proizvodjac' },
                  { title: 'Min Cena', field: 'min_cena' },
                  { title: 'Firma', field: 'firma' }
                ]}
                detailPanel={(rowData) => {
                  return (
                    <Box m={1}>
                      <Typography>Gde naci:</Typography>
                      {rowData.rowData.cene_stanje
                        .filter((x) => parseFloat(x.stanje) > 0)
                        .map((x, i) => (
                          <Typography key={i}>• {x.magacin_name}</Typography>
                        ))}
                    </Box>
                  );
                }}
              />
            </Box>
          );
        }}
      />
    </Container>
  );
};

export default UserArticlesPage;
