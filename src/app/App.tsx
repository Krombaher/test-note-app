import React from 'react';
import { Container } from '@mui/material';
import { initDB } from "react-indexed-db-hook";
import { DBConfig } from '../DBConfig';
import { Pages } from './componets/Pages';

function App() {
  initDB(DBConfig);

  return (
    <Container maxWidth="lg">
      <Pages />
    </Container>
  );
}

export default App;
