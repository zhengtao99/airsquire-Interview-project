import React from 'react';
import logo from './logo.svg';
import './App.css';
import PanoramaListing from './components/PanoramaListing'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { orange } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { ReactComponent as MyLogo } from './images/static/mylogo.svg'

function App() {


  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  }));

  return (
    <>
     
    
      <Container maxWidth="md" sx={{mt:2}}>
        <MyLogo />
        <Divider sx={{mt:2, mb:2}}/>
        <Box sx={{mb:2}}>
          <ColorButton component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload
          </ColorButton>
        </Box>
        <PanoramaListing/>
      </Container>
    </>
  );
}

export default App;
