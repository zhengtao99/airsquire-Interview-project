import React from 'react';
import './App.css';
import PanoramaListing from './components/PanoramaListing'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';


import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Box from '@mui/material/Box';
import { ReactComponent as MyLogo } from './images/static/mylogo.svg'

import AnalyticsButton from './components/buttons/AnalyticsButton';
import UploadButton from './components/buttons/UploadButton';
import BarChartIcon from '@mui/icons-material/BarChart';

function App() {


  return (
    <>
     
    
      <Container maxWidth="md" sx={{mt:2}}>
        <MyLogo />
        <Divider sx={{mt:2, mb:2}}/>
        <Box sx={{mb:2}}>
          <UploadButton sx={{mr:2}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload
          </UploadButton>
          <AnalyticsButton component="label" variant="contained" startIcon={<BarChartIcon />}>
              Analytics
          </AnalyticsButton>
        </Box>
        <PanoramaListing/>
      </Container>
    </>
  );
}

export default App;
