import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { IArtikal } from '../../types/Article';

interface ViewArticlesProps {
  article: IArtikal;
}

const ViewArticles: React.FC<ViewArticlesProps> = ({ article }) => {
  return (
    <Container maxWidth="md">
      <Box py={5}>
        <Typography variant="h4">Informacije</Typography>
        {article.slicica && <img src={article.slicica} />}
        <Typography>Sifra: {article.sifra}</Typography>
        <Typography>Naziv: {article.naziv}</Typography>
        <Typography>Jedinica mere: {article.jedinica}</Typography>
        <Typography>Stopa poreza: {article.stopa}</Typography>
        {article.tip && <Typography>Tip: {article.tip}</Typography>}
        {article.poreklo && <Typography>Poreklo: {article.poreklo}</Typography>}
        {article.strani_naziv && (
          <Typography>Strani Naziv: {article.strani_naziv}</Typography>
        )}
        {article.barkod && <Typography>Barkod: {article.barkod}</Typography>}
        {article.proizvodjac && (
          <Typography>Proizvodjac: {article.proizvodjac}</Typography>
        )}
        {article.tarifa && <Typography>Tarifa: {article.tarifa}</Typography>}
        {article.eko_taksa && (
          <Typography>Eko taksa: {article.eko_taksa ? 'Da' : 'Ne'}</Typography>
        )}
        {article.akcize && (
          <Typography>Akcize: {article.akcize ? 'Da' : 'Ne'}</Typography>
        )}
        {article.min_zalihe && (
          <Typography>Minimalne zalihe: {article.min_zalihe}</Typography>
        )}
        {article.max_zalihe && (
          <Typography>Maksimalne zalihe: {article.max_zalihe}</Typography>
        )}
        {article.opis && <Typography>Opis: {article.opis}</Typography>}
        {article.deklaracija && (
          <Typography>Deklaracija: {article.deklaracija}</Typography>
        )}
        {article.cene_stanje.map((x, i) => (
          <Box key={i} border={'1px solid'} p={1} m={1}>
            <Typography variant="h6">Magacin: {x.magacin_id}</Typography>
            <Typography>Nabavna Cena: {x.nabavna_cena}</Typography>
            <Typography>Prodajna Cena: {x.prodajna_cena}</Typography>
            <Typography>Stanje: {x.stanje}</Typography>
            <Typography>Minimalne Zalihe: {x.min_zalihe}</Typography>
            <Typography>Maksimalne Zalihe: {x.max_zalihe}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ViewArticles;
