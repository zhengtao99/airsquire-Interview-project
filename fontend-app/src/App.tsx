import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import { ReactComponent as MyLogo } from './images/static/mylogo.svg'

import Home  from './pages/Home';

function App() {


  return (
    <>
      <Container maxWidth="md" sx={{mt:2}}>
        <MyLogo />
        <Divider sx={{mt:2, mb:2}}/>
        
        <Home/>
      </Container>
    </>
  );
}

export default App;
